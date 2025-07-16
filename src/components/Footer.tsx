import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Corrado</h3>
            <p className="text-gray-400">
              Forno artigianale dal 1985.<br />
              Tradizione, ogni giorno.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prodotti</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Metodo Corrado</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contatti</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contatti</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Via.le Emilio Guida, 105</li>
              <li>70024 Gravina in Puglia (BA)</li>
              <li>+39 3384392338</li>
              <li>info@fornocorrado.it</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <h4 className="font-semibold">Per rivenditori</h4>
            <p className="text-gray-400 text-sm">
              Vuoi rivendere i nostri prodotti? Scrivici per scoprire le nostre condizioni.
            </p>
            <button className="border border-white text-white px-6 py-2 hover:bg-white hover:text-black transition-all duration-300">
              Contattaci
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Forno Corrado. Tutti i diritti riservati.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm italic">
            "Scopri cosa c'è dietro." - Ogni prodotto ha la sua storia.
          </p>
        </div>
      </div>
    </footer>
  );
};