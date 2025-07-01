import { ReactNode } from 'react';
import { CartProvider } from './cart-context';

interface DLStyleLayoutProps {
  children: ReactNode;
}

export default function DLStyleLayout({ children }: DLStyleLayoutProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
} 