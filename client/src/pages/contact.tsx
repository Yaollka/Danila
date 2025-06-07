import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import type { ContactForm } from '@/lib/types';

export default function Contact() {
  const { toast } = useToast();
  const [subject, setSubject] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const submitMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Сообщение отправлено",
        description: "Мы ответим в ближайшее время",
      });
      reset();
      setSubject('');
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    submitMutation.mutate({ ...data, subject });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Помощь и контакты</h2>
          <p className="text-gray-600">
            Нужна помощь? Мы готовы ответить на все ваши вопросы и помочь с выбором
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Как с нами связаться</h3>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="bg-gray-900 text-white p-3 rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Телефон поддержки</h4>
                    <p className="text-gray-600">+7 (495) 123-45-67</p>
                    <p className="text-sm text-gray-500">Бесплатно по России</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="bg-gray-900 text-white p-3 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-600">support@techempire.ru</p>
                    <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="bg-gray-900 text-white p-3 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Офис</h4>
                    <p className="text-gray-600">г. Москва, ул. Тверская, д. 15, стр. 1</p>
                    <p className="text-sm text-gray-500">БЦ "Технопарк", 5 этаж</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-start space-x-4 p-6">
                  <div className="bg-gray-900 text-white p-3 rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Время работы</h4>
                    <p className="text-gray-600">
                      Пн-Пт: 9:00 - 21:00<br />
                      Сб-Вс: 10:00 - 18:00
                    </p>
                    <p className="text-sm text-gray-500">Московское время</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map placeholder */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Как нас найти</h4>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500">Карта офиса</p>
              </div>
              <div className="mt-4 text-center">
                <p className="font-medium">Адрес: г. Москва, ул. Тверская, д. 15, стр. 1, БЦ "Технопарк", 5 этаж</p>
                <p className="text-sm text-gray-600 mt-1">Ближайшее метро: Тверская, Пушкинская (5 минут пешком)</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Написать нам</h3>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя *
                    </label>
                    <Input
                      {...register('name', { required: 'Имя обязательно' })}
                      placeholder="Ваше имя"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      {...register('email', { 
                        required: 'Email обязателен',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Неверный формат email'
                        }
                      })}
                      placeholder="ваш@email.ru"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Тема обращения
                    </label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тему" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Вопрос по товару</SelectItem>
                        <SelectItem value="order">Проблема с заказом</SelectItem>
                        <SelectItem value="warranty">Гарантийное обслуживание</SelectItem>
                        <SelectItem value="suggestion">Предложение</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение *
                    </label>
                    <Textarea
                      {...register('message', { required: 'Сообщение обязательно' })}
                      rows={5}
                      placeholder="Опишите ваш вопрос или проблему..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800"
                    disabled={submitMutation.isPending}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {submitMutation.isPending ? 'Отправка...' : 'Отправить сообщение'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
