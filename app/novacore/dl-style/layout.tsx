"use client";

import { ReactNode } from 'react';
import { CartProvider } from './cart-context';

export default function DLStyleLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
} 