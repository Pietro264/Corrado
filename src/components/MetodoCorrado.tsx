import React from 'react';
import { Clock, Heart, Wheat, Users } from 'lucide-react';

export const MetodoCorrado: React.FC = () => {
  const methods = [
    {
      icon: <Wheat className="w-8 h-8" />,
      title: "Semplicità",
      description: "Impastiamo ogni giorno con gesti lenti."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tradizione",
      description: "Lasciamo al tempo il suo tempo."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Attesa",
      description: "Non acceleriamo. Non industrializziamo."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Cura",
      description: "Ogni morso racconta una scelta."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-8">
            Metodo Corrado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quattro principi che guidano ogni nostro gesto, 
            ogni impasto, ogni cottura.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {methods.map((method, index) => (
            <div key={index} className="text-center group">
              <div className="mb-6 flex justify-center">
                <div className="p-4 border border-gray-200 group-hover:border-black transition-colors duration-300">
                  {method.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium mb-4">{method.title}</h3>
              <p className="text-gray-600 leading-relaxed">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="border-t border-gray-200 pt-8">
            <blockquote className="text-2xl font-light italic text-gray-700 max-w-3xl mx-auto">
              "L'essenziale ha un profumo. Artigianale, ogni giorno. 
              Tradizione senza compromessi."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};