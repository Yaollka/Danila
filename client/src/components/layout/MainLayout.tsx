import TopMenu from '@/components/TopMenu';
import MainHeader from '@/components/MainHeader';
import SubMenu from '@/components/SubMenu';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  onCategoryFilter?: (category: string) => void;
  activeCategory?: string;
}

export default function MainLayout({ 
  children, 
  onSearch = () => {}, 
  onCategoryFilter = () => {},
  activeCategory = 'all'
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopMenu />
      <MainHeader onSearch={onSearch} />
      <SubMenu onCategoryFilter={onCategoryFilter} activeCategory={activeCategory} />
      
      <main>
        {children}
      </main>
      
      <Footer />
      <CartSidebar />
    </div>
  );
}
