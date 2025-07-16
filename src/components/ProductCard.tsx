import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden mb-4">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-gray-600 italic">{product.subtitle}</p>
        <p className="text-xl font-light">€{product.price.toFixed(2)}</p>
        
        <div className={`transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-4 px-6 py-2 border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  );
};