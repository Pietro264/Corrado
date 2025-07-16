import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Contatti: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-light mb-8">
            Passa a trovarci.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vieni nel nostro forno o contattaci per scoprire come portare 
            i nostri prodotti nel tuo negozio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 mt-1 text-gray-600" />
              <div>
                <h3 className="font-medium mb-2">Indirizzo</h3>
                <p className="text-gray-600">
                  Via.le Emilio Guida, 105<br />
                  70024 Gravina in Puglia (BA), Italia
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 mt-1 text-gray-600" />
              <div>
                <h3 className="font-medium mb-2">Telefono</h3>
                <p className="text-gray-600">+39 3384392338</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 mt-1 text-gray-600" />
              <div>
                <h3 className="font-medium mb-2">Email</h3>
                <p className="text-gray-600">info@fornocorrado.it</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 mt-1 text-gray-600" />
              <div>
                <h3 className="font-medium mb-2">Orari</h3>
                <div className="text-gray-600 space-y-1">
                  <p>Lun-Ven: 06:00 - 19:00</p>
                  <p>Sabato: 06:00 - 18:00</p>
                  <p>Domenica: Chiuso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8">
            <h3 className="text-2xl font-light mb-6">Scrivici</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Messaggio"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors"
              >
                Invia messaggio
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};