import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  UserProfile,
  ActiveView,
  FilterState,
  OrderStatus,
  ToastNotification
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_USER } from '../data/initialProducts';

interface StoreContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // Catalog & Products
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: { code: string; percent: number } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryFee: number;
  cartTotal: number;

  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  handlePlaceOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => Order;

  // Orders & Cabinet
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Admin Actions & Auth (Without external DB)
  isAdminAuthenticated: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'createdAt'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  toggleStock: (productId: string) => void;
  resetToDefaults: () => void;

  // Quick navigation to view item on main catalog
  viewProductOnMain: (productId: string) => void;

  // Toast notifications
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'moskva_classic_mens_v1',
  CART: 'moskva_cart_v1',
  ORDERS: 'moskva_orders_v1',
  USER: 'moskva_user_v1',
  WISHLIST: 'moskva_wishlist_v1',
  ADMIN_AUTH: 'moskva_admin_auth_v1'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products state (persisted locally in browser localStorage without external DB)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Strictly filter out any female clothing if old cache exists
          return parsed.filter((p: any) => p.gender !== 'women');
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // 2. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  // 3. Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // 4. User profile state
  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_USER;
  });

  // 5. Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['prod-1', 'prod-3'];
  });

  // 6. Navigation and UI modals
  const [activeView, setActiveView] = useState<ActiveView>('catalog');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 7. Admin Authentication state (no DB, login: admin / password: admin123)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === 'admin' && pass.trim() === 'admin123') {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {
        // ignore
      }
      showToast('Авторизация успешна. Добро пожаловать в админку!', 'success');
      return true;
    }
    showToast('Неверный логин или пароль. Попробуйте admin / admin123', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {
      // ignore
    }
    showToast('Вы вышли из режима администратора', 'info');
  };

  // 8. Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);

  // 9. Filters state (price range up to 5,000,000 ₸)
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    gender: 'all',
    searchQuery: '',
    sortBy: 'featured',
    priceRange: [0, 5000000]
  });

  // 10. Toast system
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Товар удален из списка желаний', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Товар добавлен в избранное', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart operations
  const addToCart = (
    product: Product,
    size?: string,
    color?: { name: string; hex: string },
    qty = 1
  ) => {
    const selectedSize = size || product.sizes[0] || 'M';
    const selectedColor = color || product.colors[0] || { name: 'Классический', hex: '#222' };
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize,
          selectedColor,
          quantity: qty
        }
      ];
    });

    showToast(`«${product.title}» добавлен в корзину (${selectedSize})`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Позиция удалена из корзины', 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MOSKVA10' || clean === 'МОСКВА10' || clean === 'CLASSIC10' || clean === 'КЛАССИКА10') {
      setAppliedPromo({ code: clean, percent: 10 });
      showToast('Промокод применен: скидка 10%', 'success');
      return true;
    }
    if (clean === 'MOSKVA' || clean === 'МОСКВА' || clean === 'ATELIER' || clean === 'KASPI15' || clean === 'АТЕЛЬЕ15') {
      setAppliedPromo({ code: clean, percent: 15 });
      showToast('Клубный промокод применен: скидка 15%', 'success');
      return true;
    }
    showToast('Неверный промокод (попробуйте MOSKVA10 или MOSKVA)', 'error');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    showToast('Промокод отменен', 'info');
  };

  // Cart calculations in Kazakhstan Tenge (₸)
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount from user loyalty + promo code
  const promoPercent = appliedPromo ? appliedPromo.percent : 0;
  const userLoyaltyPercent = userProfile.discountPercent || 0;
  const totalDiscountPercent = Math.min(promoPercent + userLoyaltyPercent, 25);
  const cartDiscount = Math.round((cartSubtotal * totalDiscountPercent) / 100);

  // Free delivery threshold in Kazakhstan: over 100,000 ₸ is free, otherwise 3,500 ₸
  const cartDeliveryFee = cartSubtotal >= 100000 || cartSubtotal === 0 ? 0 : 3500;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryFee);

  // Orders in Kazakhstan
  const handlePlaceOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `MSK-${randomNum}`,
      date: new Date().toISOString().split('T')[0],
      status: 'created',
      trackingCode: `MSKPOST-${randomNum}KZ`
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Заказ ${newOrder.orderNumber} успешно оформлен!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Статус заказа обновлен: ${status}`, 'info');
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'cancelled' } : ord))
    );
    showToast('Заказ успешно отменен', 'info');
  };

  // User Profile
  const updateUserProfile = (patch: Partial<UserProfile>) => {
    setUserProfileState((prev) => ({ ...prev, ...patch }));
    showToast('Данные личного кабинета сохранены', 'success');
  };

  // Admin Actions (Products management without database)
  const addProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'createdAt'>
  ): Product => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    // Prepend so it appears right at the top of the store
    setProducts((prev) => [newProduct, ...prev]);

    // Reset filters so the new product is visible immediately
    setFilters({
      category: 'all',
      gender: 'all',
      searchQuery: '',
      sortBy: 'newest',
      priceRange: [0, 5000000]
    });

    return newProduct;
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`Модель «${updated.title}» обновлена`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
    showToast('Модель удалена из каталога', 'info');
  };

  const toggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setUserProfileState(INITIAL_USER);
    resetFilters();
    showToast('Каталог сброшен к эталонным моделям', 'info');
  };

  const resetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      searchQuery: '',
      sortBy: 'featured',
      priceRange: [0, 5000000]
    });
  };

  const viewProductOnMain = (productId: string) => {
    resetFilters();
    setActiveView('catalog');
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setSelectedProduct(prod);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Products computation
  const filteredProducts = products.filter((item) => {
    // category
    if (filters.category !== 'all' && item.category !== filters.category) {
      return false;
    }
    // gender
    if (filters.gender !== 'all' && item.gender !== filters.gender && item.gender !== 'unisex') {
      return false;
    }
    // search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchFabric = (item.fabric || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      if (!matchTitle && !matchFabric && !matchDesc) return false;
    }
    // price range
    if (item.price < filters.priceRange[0] || item.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price-asc') return a.price - b.price;
    if (filters.sortBy === 'price-desc') return b.price - a.price;
    if (filters.sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // featured: bestseller badge + rating
    const scoreA = (a.badge === 'bestseller' ? 2 : 0) + (a.rating || 5);
    const scoreB = (b.badge === 'bestseller' ? 2 : 0) + (b.rating || 5);
    return scoreB - scoreA;
  });

  return (
    <StoreContext.Provider
      value={{
        activeView,
        setActiveView,
        products,
        filteredProducts,
        selectedProduct,
        setSelectedProduct,
        filters,
        setFilters,
        resetFilters,
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        promoCode,
        setPromoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartDeliveryFee,
        cartTotal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        handlePlaceOrder,
        orders,
        updateOrderStatus,
        cancelOrder,
        userProfile,
        updateUserProfile,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        resetToDefaults,
        viewProductOnMain,
        toasts,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
