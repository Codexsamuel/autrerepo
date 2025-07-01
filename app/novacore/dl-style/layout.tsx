import { ReactNode } from 'react';
import { CartProvider } from './cart-context';

interface DLStyleLayoutProps {
  children: ReactNode;
}

export default function DLStyleLayout({ children }: DLStyleLayoutProps) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </CartProvider>
  );
} 