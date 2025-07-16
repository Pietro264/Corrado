import React from 'react';

export const ChiSiamo: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-8">
            Una storia impastata ogni giorno.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Nel nostro forno, ogni giorno inizia prima dell'alba. Corrado e la sua famiglia 
              continuano una tradizione che si tramanda da generazioni, rispettando i tempi 
              naturali della lievitazione e la genuinità degli ingredienti.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Niente fretta. Niente compromessi. Solo la pazienza di chi sa che il tempo 
              è l'ingrediente più importante per creare prodotti autentici che raccontano 
              la vera essenza dell'artigianalità italiana.
            </p>

            <div className="border-l-2 border-gray-200 pl-6">
              <blockquote className="text-2xl font-light italic">
                "Niente fretta. Solo forno."
              </blockquote>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Forno Corrado"
              className="w-full h-96 object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};