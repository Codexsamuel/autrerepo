"use client";

import React from 'react';
import { useCart, CartItem } from '../cart-context';
import Link from 'next/link';

export default function PanierPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum: number, item: CartItem) => sum + item.sellingPrice * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Votre panier</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500">Votre panier est vide.</div>
      ) : (
        <div className="space-y-4">
          {cart.map((item: CartItem) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-500">{item.sellingPrice} €</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-2 py-1 border rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4">Supprimer</button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-bold">Total : {total.toFixed(2)} €</div>
            <Link href="/novacore/dl-style/checkout">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Passer au paiement</button>
            </Link>
          </div>
          <button onClick={clearCart} className="mt-4 text-sm text-gray-500 underline">Vider le panier</button>
        </div>
      )}
    </div>
  );
} 