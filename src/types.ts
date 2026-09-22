export type ProductCategory =
  | 'all'
  | 'suits'       // Костюмы
  | 'blazers'     // Пиджаки и блейзеры
  | 'coats'       // Пальто и тренчи
  | 'shirts'      // Рубашки и сорочки
  | 'trousers'    // Брюки
  | 'shoes'       // Обувь
  | 'accessories'; // Аксессуары

export type Gender = 'all' | 'men';

export type ProductBadge = 'new' | 'bestseller' | 'sale' | 'exclusive';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  gender: 'men' | 'unisex';
  price: number;
  oldPrice?: number;
  description: string;
  fabric: string; // e.g., "100% шерсть Super 150s (Loro Piana)", "Кашемир 100%"
  fit: string;    // "Slim Fit", "Classic Regular", "Tailored Cut"
  care: string;   // "Сухая чистка"
  sizes: string[]; // ["46", "48", "50", "52", "54"] or ["S", "M", "L", "XL"]
  colors: { name: string; hex: string }[];
  image: string;
  additionalImages?: string[];
  inStock: boolean;
  stockCount: number;
  badge?: ProductBadge;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + size + color)
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export type OrderStatus =
  | 'created'     // Оформлен
  | 'processing'  // В ателье / Сборка
  | 'shipping'    // Передан в доставку
  | 'delivered'   // Доставлен
  | 'cancelled';  // Отменен

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  size: string;
  colorName: string;
  quantity: number;
}

export type PaymentMethod = 'card_courier' | 'card_online' | 'kaspi' | 'cash_courier' | 'sbp';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  deliveryMethod: 'courier_fitting' | 'boutique_pickup' | 'express';
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  comment?: string;
  trackingCode?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  preferredSize: string;
  memberTier: 'Privilège' | 'Club' | 'VIP';
  discountPercent: number;
}

export type ActiveView = 'catalog' | 'cabinet' | 'admin';

export interface FilterState {
  category: ProductCategory;
  gender: Gender;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc';
  priceRange: [number, number];
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}
