import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CartProvider } from '@/contexts/CartContext';

import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import PCBuilder from '@/pages/pc-builder';
import NotFound from '@/pages/not-found';

import { queryClient } from '@/lib/queryClient';

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/pc-builder" component={PCBuilder} />
      <Route component={NotFound} />
    </Switch>);
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;