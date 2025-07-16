import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6">
          Pane. Biscotti. Tradizione.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light">
          Dal forno ogni giorno, a mano.
        </p>
        <button
          onClick={onExploreClick}
          className="inline-flex items-center px-8 py-4 border border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
        >
          Scopri i nostri prodotti
        </button>
      </div>
    </section>
  );
};