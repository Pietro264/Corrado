export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
}

export interface PaymentInfo {
  paymentMethod: 'card' | 'cash_on_delivery';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolder: string;
  cashOnDeliveryAccepted?: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: ShippingInfo;
  payment: PaymentInfo;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}