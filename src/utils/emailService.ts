interface OrderEmailData {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
  };
  payment: {
    paymentMethod: 'card' | 'cash_on_delivery';
    cardHolder?: string;
  };
  subtotal: number;
  shippingCost: number;
  cashOnDeliveryFee?: number;
  total: number;
  createdAt: Date;
}

export const sendOrderEmail = async (orderData: OrderEmailData): Promise<boolean> => {
  try {
    const emailContent = generateEmailContent(orderData);
    
    // Simulate email sending - in a real app, you would use a service like EmailJS, SendGrid, or a backend API
    console.log('Sending email to: sornatalemikele@gmail.com');
    console.log('Email content:', emailContent);
    
    // For demonstration, we'll simulate a successful email send
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const generateEmailContent = (orderData: OrderEmailData): string => {
  const paymentMethodText = orderData.payment.paymentMethod === 'cash_on_delivery' 
    ? 'Pagamento alla consegna' 
    : `Carta di credito (${orderData.payment.cardHolder})`;

  return `
NUOVO ORDINE RICEVUTO - FORNO CORRADO
=====================================

NUMERO ORDINE: #${orderData.orderId}
DATA: ${orderData.createdAt.toLocaleDateString('it-IT')} alle ${orderData.createdAt.toLocaleTimeString('it-IT')}

DATI CLIENTE:
-------------
Nome: ${orderData.shipping.firstName} ${orderData.shipping.lastName}
Email: ${orderData.shipping.email}
Telefono: ${orderData.shipping.phone}

INDIRIZZO DI SPEDIZIONE:
------------------------
${orderData.shipping.address}
${orderData.shipping.postalCode} ${orderData.shipping.city} (${orderData.shipping.province})

PRODOTTI ORDINATI:
------------------
${orderData.items.map(item => 
  `• ${item.name} x${item.quantity} - €${item.price.toFixed(2)} cad. = €${item.total.toFixed(2)}`
).join('\n')}

RIEPILOGO COSTI:
----------------
Subtotale: €${orderData.subtotal.toFixed(2)}
Spedizione: €${orderData.shippingCost.toFixed(2)}
${orderData.cashOnDeliveryFee ? `Supplemento pagamento alla consegna: €${orderData.cashOnDeliveryFee.toFixed(2)}` : ''}
TOTALE: €${orderData.total.toFixed(2)}

MODALITÀ DI PAGAMENTO:
----------------------
${paymentMethodText}

${orderData.payment.paymentMethod === 'cash_on_delivery' ? 
`⚠️ PAGAMENTO ALLA CONSEGNA - Il cliente ha accettato la responsabilità per la mancata consegna` : ''}

=====================================
Forno Corrado - Via.le Emilio Guida, 105 - 70024 Gravina in Puglia (BA)
Tel: +39 3384392338 | Email: info@fornocorrado.it
  `;
};