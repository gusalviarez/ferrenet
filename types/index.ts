export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: CategoryId;
  stock: number;
  brand?: string;
  sku: string;
  unit?: string;
  featured?: boolean;
}

export type CategoryId =
  | "mallas"
  | "varillas"
  | "aditivos"
  | "cementos"
  | "pinturas"
  | "molduras"
  | "plasticos"
  | "bloques"
  | "arena"
  | "herramientas"
  | "tuberias"
  | "otros";

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes: string;
}

export interface PaymentData {
  bank: string;
  phoneNumber: string;
  referenceNumber: string;
  amount: number;
  screenshot: string | null;
}

export type OrderStatus = "pending" | "confirmed" | "delivered";

export interface Order {
  id: string;
  items: CartItem[];
  checkout: CheckoutData;
  payment: PaymentData;
  status: OrderStatus;
  deliveryCost: number;
  subtotal: number;
  total: number;
  createdAt: string;
}
