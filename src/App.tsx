import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ChiSiamo } from './components/ChiSiamo';
import { Prodotti } from './components/Prodotti';
import { MetodoCorrado } from './components/MetodoCorrado';
import { Contatti } from './components/Contatti';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Footer } from './components/Footer';
import { useCart } from './hooks/useCart';
import { products } from './data/products';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    handleSectionChange('prodotti');
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };
  return (
    <div className="min-h-screen bg-white">
      <Header
        cart={cart}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main>
        <section id="home">
          <Hero onExploreClick={handleExploreClick} />
        </section>

        <section id="chi-siamo">
          <ChiSiamo />
        </section>

        <section id="prodotti">
          <Prodotti products={products} onAddToCart={addToCart} />
        </section>

        <section id="metodo">
          <MetodoCorrado />
        </section>

        <section id="contatti">
          <Contatti />
        </section>
      </main>

      <Footer />

      <Cart
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      <Checkout
        cart={cart}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

export default App;