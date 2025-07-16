import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProdottiProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Prodotti: React.FC<ProdottiProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tutti');

  const categories = ['Tutti', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'Tutti' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-8">
            I nostri prodotti
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ogni prodotto nasce dalle nostre mani e dal nostro forno, 
            seguendo ricette tramandate nel tempo.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};