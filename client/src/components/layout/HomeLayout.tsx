import TopMenu from '@/components/TopMenu';
import MainHeader from '@/components/MainHeader';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

interface SimpleLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

export default function SimpleLayout({ 
  children, 
  onSearch = () => {}
}: SimpleLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenu />
      <MainHeader onSearch={onSearch} />
      
      <main>
        {children}
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
}