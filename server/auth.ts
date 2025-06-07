import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { query } from './database';
import { User, AuthCode } from '@shared/schema';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const EMAIL_USER = process.env.EMAIL_USER || 'noreply@techempire.ru';
const EMAIL_PASS = process.env.EMAIL_PASS || '';

// Email transporter (in production, use real SMTP settings)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export function generateAuthCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendAuthCode(email: string): Promise<boolean> {
  try {
    const code = generateAuthCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save code to database
    await query(
      'INSERT INTO auth_codes (email, code, expires_at) VALUES ($1, $2, $3)',
      [email, code, expiresAt]
    );

    // In development, just log the code instead of sending email
    if (process.env.NODE_ENV === 'development') {
      console.log(`Auth code for ${email}: ${code}`);
      return true;
    }

    // Send email with auth code
    await transporter.sendMail({
      from: EMAIL_USER,
      to: email,
      subject: 'Код авторизации TechEmpire',
      html: `
        <h2>Код авторизации</h2>
        <p>Ваш код для входа в TechEmpire:</p>
        <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 4px;">${code}</h1>
        <p>Код действителен в течение 10 минут.</p>
        <p>Если вы не запрашивали этот код, проигнорируйте это письмо.</p>
      `,
    });

    return true;
  } catch (error) {
    console.error('Error sending auth code:', error);
    return false;
  }
}

export async function verifyAuthCode(email: string, code: string): Promise<User | null> {
  try {
    // Check if code is valid and not expired
    const codeResult = await query(
      'SELECT * FROM auth_codes WHERE email = $1 AND code = $2 AND expires_at > NOW() AND used = FALSE ORDER BY created_at DESC LIMIT 1',
      [email, code]
    );

    if (codeResult.rows.length === 0) {
      return null;
    }

    // Mark code as used
    await query(
      'UPDATE auth_codes SET used = TRUE WHERE id = $1',
      [codeResult.rows[0].id]
    );

    // Get or create user
    let userResult = await query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (userResult.rows.length === 0) {
      // Create new user
      const name = email.split('@')[0]; // Use email prefix as default name
      userResult = await query(
        'INSERT INTO users (email, name, role) VALUES ($1, $2, $3) RETURNING *',
        [email, name, 'user']
      );
    }

    // Update last login
    await query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [userResult.rows[0].id]
    );

    const user = userResult.rows[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.created_at,
      lastLogin: new Date(),
    };
  } catch (error) {
    console.error('Error verifying auth code:', error);
    return null;
  }
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const result = await query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    
    const user = result.rows[0];
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.created_at,
      lastLogin: user.last_login,
    };
  } catch (error) {
    console.error('Error getting user by ID:', error);
    return null;
  }
}