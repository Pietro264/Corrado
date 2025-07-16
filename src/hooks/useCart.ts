import { useState } from 'react';
import { CartItem, Product, CartState } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity: 1 }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      const newTotal = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    });
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
};