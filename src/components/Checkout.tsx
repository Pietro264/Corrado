import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, Check, Banknote } from 'lucide-react';
import { CartState, ShippingInfo, PaymentInfo } from '../types';
import { sendOrderEmail } from '../utils/emailService';

interface CheckoutProps {
  cart: CartState;
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cart,
  isOpen,
  onClose,
  onOrderComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    province: ''
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    cashOnDeliveryAccepted: false
  });

  const shippingCost = 5.90;
  const cashOnDeliveryFee = paymentInfo.paymentMethod === 'cash_on_delivery' ? 5.00 : 0;
  const totalWithShipping = cart.total + shippingCost + cashOnDeliveryFee;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate cash on delivery acceptance
    if (paymentInfo.paymentMethod === 'cash_on_delivery' && !paymentInfo.cashOnDeliveryAccepted) {
      alert('Devi accettare la responsabilità per il pagamento alla consegna');
      return;
    }
    
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const orderId = `CR${Date.now().toString().slice(-6)}`;
    
    // Send order email
    const emailData = {
      orderId,
      items: cart.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        total: item.product.price * item.quantity
      })),
      shipping: shippingInfo,
      payment: paymentInfo,
      subtotal: cart.total,
      shippingCost,
      cashOnDeliveryFee: cashOnDeliveryFee > 0 ? cashOnDeliveryFee : undefined,
      total: totalWithShipping,
      createdAt: new Date()
    };
    
    await sendOrderEmail(emailData);

    setIsProcessing(false);
    setOrderCompleted(true);
    setCurrentStep(3);

    // Clear cart after successful order
    setTimeout(() => {
      onOrderComplete();
      onClose();
      setOrderCompleted(false);
      setCurrentStep(1);
      setPaymentInfo({
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
        cashOnDeliveryAccepted: false
      });
    }, 3000);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Format card number
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (value.length > 19) value = value.substring(0, 19);
    }
    
    // Format expiry date
    if (e.target.name === 'expiryDate') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (value.length > 5) value = value.substring(0, 5);
    }
    
    // Format CVV
    if (e.target.name === 'cvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) value = value.substring(0, 3);
    }

    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
        <div className="min-h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-4">
              <button
                onClick={currentStep > 1 ? () => setCurrentStep(currentStep - 1) : onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-light">
                {currentStep === 1 && 'Spedizione'}
                {currentStep === 2 && 'Pagamento'}
                {currentStep === 3 && 'Conferma'}
              </h2>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step <= currentStep
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep || orderCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cognome</label>
                    <input
                      type="text"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Indirizzo</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Città</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CAP</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Provincia</label>
                    <input
                      type="text"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleShippingChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Truck className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">Spedizione standard</span>
                  </div>
                  <p className="text-sm text-gray-600">Consegna in 2-3 giorni lavorativi</p>
                  <p className="text-sm font-medium mt-1">€{shippingCost.toFixed(2)}</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors"
                >
                  Continua al pagamento
                </button>
              </form>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h3 className="font-medium">Modalità di pagamento</h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentInfo.paymentMethod === 'card'}
                        onChange={(e) => setPaymentInfo({...paymentInfo, paymentMethod: e.target.value as 'card' | 'cash_on_delivery'})}
                        className="text-black focus:ring-black"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="font-medium">Carta di credito/debito</span>
                        <p className="text-sm text-gray-600">Pagamento sicuro online</p>
                      </div>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={paymentInfo.paymentMethod === 'cash_on_delivery'}
                        onChange={(e) => setPaymentInfo({...paymentInfo, paymentMethod: e.target.value as 'card' | 'cash_on_delivery'})}
                        className="text-black focus:ring-black"
                      />
                      <Banknote className="w-5 h-5 text-gray-600" />
                      <div>
                        <span className="font-medium">Pagamento alla consegna</span>
                        <p className="text-sm text-gray-600">Paga in contanti al corriere (+€5.00)</p>
                      </div>
                    </label>
                  </div>
                </div>
                {/* Card Payment Fields */}
                {paymentInfo.paymentMethod === 'card' && (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-3 mb-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="font-medium">Pagamento sicuro</span>
                      </div>
                      <p className="text-sm text-gray-600">I tuoi dati sono protetti con crittografia SSL</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Numero carta</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-4 py-3 pl-12 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                        />
                        <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Intestatario carta</label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={paymentInfo.cardHolder}
                        onChange={handlePaymentChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Scadenza</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/AA"
                          required
                          className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Cash on Delivery Terms */}
                {paymentInfo.paymentMethod === 'cash_on_delivery' && (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Banknote className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-amber-800">Pagamento alla consegna</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Potrai pagare in contanti direttamente al corriere al momento della consegna. 
                            Verrà applicato un supplemento di €5.00 per questo servizio.
                          </p>
                        </div>
                      </div>
                      
                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentInfo.cashOnDeliveryAccepted || false}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cashOnDeliveryAccepted: e.target.checked})}
                          className="mt-1 text-black focus:ring-black"
                          required
                        />
                        <span className="text-sm text-amber-800">
                          Accetto la responsabilità per il pagamento alla consegna e comprendo che 
                          in caso di mancata consegna per mia responsabilità (assenza, rifiuto del pacco, ecc.) 
                          potrebbero essere applicati costi aggiuntivi.
                        </span>
                      </label>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-4 font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Elaborazione...' : 
                    paymentInfo.paymentMethod === 'cash_on_delivery' 
                      ? `Conferma ordine €${totalWithShipping.toFixed(2)}`
                      : `Paga €${totalWithShipping.toFixed(2)}`
                  }
                </button>
              </form>
            )}

            {/* Step 3: Order Confirmation */}
            {currentStep === 3 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-light mb-4">Ordine confermato</h3>
                <p className="text-gray-600 mb-6">
                  Grazie per il tuo acquisto. Riceverai una email di conferma a breve.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <p className="text-sm text-gray-600 mb-2">Numero ordine:</p>
                  <p className="font-mono text-lg">#CR{Date.now().toString().slice(-6)}</p>
                  <p className="text-sm text-gray-600 mt-4">
                    {paymentInfo.paymentMethod === 'cash_on_delivery' 
                      ? 'Pagamento alla consegna confermato. Prepareremo il tuo ordine per la spedizione.'
                      : 'Pagamento elaborato con successo. Riceverai una email di conferma a breve.'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="border-t bg-gray-50 p-6">
            <h3 className="font-medium mb-4">Riepilogo ordine</h3>
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span>€{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm border-t pt-3">
                <span>Subtotale</span>
                <span>€{cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Spedizione</span>
                <span>€{shippingCost.toFixed(2)}</span>
              </div>
              {cashOnDeliveryFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Supplemento pagamento alla consegna</span>
                  <span>€{cashOnDeliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-medium text-lg border-t pt-3">
                <span>Totale</span>
                <span>€{totalWithShipping.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};