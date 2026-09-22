import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Костюм-тройка из шерсти Super 150s',
    category: 'suits',
    gender: 'men',
    price: 420000,
    oldPrice: 490000,
    description: 'Безупречный английский крой с жилетом. Изготовлен из тончайшей камвольной шерсти Super 150s от итальянской мануфактуры. Ручная вспушка по лацкану и пуговицы из натурального рога.',
    fabric: '100% шерсть Super 150s (Loro Piana)',
    fit: 'Tailored Fit',
    care: 'Только профессиональная сухая чистка',
    sizes: ['48', '50', '52', '54', '56'],
    colors: [
      { name: 'Глубокий синий', hex: '#1C2833' },
      { name: 'Графитовый', hex: '#2C3E50' },
      { name: 'Угольный серый', hex: '#34495E' }
    ],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 7,
    badge: 'bestseller',
    rating: 4.9,
    reviewsCount: 38,
    createdAt: '2026-01-15'
  },
  {
    id: 'prod-2',
    title: 'Двубортный блейзер Club Napoli',
    category: 'blazers',
    gender: 'men',
    price: 245000,
    description: 'Неаполитанский силуэт с мягким плечом (spalla camicia). Латунные чеканные пуговицы, накладные карманы и благородная фактурная шерсть hopsack.',
    fabric: '100% шерсть Hopsack (Vitale Barberis Canonico)',
    fit: 'Classic Regular',
    care: 'Сухая чистка',
    sizes: ['46', '48', '50', '52', '54'],
    colors: [
      { name: 'Темно-синий', hex: '#162238' },
      { name: 'Шоколадный', hex: '#3E2723' }
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 12,
    badge: 'new',
    rating: 4.8,
    reviewsCount: 19,
    createdAt: '2026-02-01'
  },
  {
    id: 'prod-3',
    title: 'Пальто двубортное из кашемира Camel',
    category: 'coats',
    gender: 'men',
    price: 590000,
    oldPrice: 680000,
    description: 'Иконическое пальто прямого силуэта в оттенке викуньи. Плотный двухсторонний кашемир сохраняет тепло и подчеркивает статус владельца. Шелковый подклад и шлица сзади.',
    fabric: '90% кашемир, 10% шерсть альпака',
    fit: 'Classic Tailored',
    care: 'Премиальная химчистка',
    sizes: ['48', '50', '52', '54'],
    colors: [
      { name: 'Кэмел', hex: '#C19A6B' },
      { name: 'Темный графит', hex: '#212529' }
    ],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 4,
    badge: 'exclusive',
    rating: 5.0,
    reviewsCount: 14,
    createdAt: '2026-01-20'
  },
  {
    id: 'prod-4',
    title: 'Классический смокинг Black Tie с атласными лацканами',
    category: 'suits',
    gender: 'men',
    price: 480000,
    description: 'Исключительный вечерний смокинг для протокольных торжеств и дресс-кода Black Tie. Однобортный пиджак с шелковыми атласными лацканами, обтянутыми пуговицами и брюки с классическими шелковыми лампасами.',
    fabric: '100% шерсть Barathea (Holland & Sherry), отделка: натуральный шелк',
    fit: 'Evening Tailored Fit',
    care: 'Химчистка',
    sizes: ['46', '48', '50', '52', '54', '56'],
    colors: [
      { name: 'Глубокий черный оникс', hex: '#0A0A0B' },
      { name: 'Полночный синий (Midnight Navy)', hex: '#0E1726' }
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 7,
    badge: 'exclusive',
    rating: 4.96,
    reviewsCount: 28,
    createdAt: '2026-02-10'
  },
  {
    id: 'prod-5',
    title: 'Рубашка сорочечная Royal Oxford',
    category: 'shirts',
    gender: 'men',
    price: 95000,
    description: 'Классическая сорочка под запонки с воротником французский кент. Ткань двойного кручения из длинноволокнистого египетского хлопка Giza. Перламутровые пуговицы австралийского устричного промысла.',
    fabric: '100% египетский хлопок Giza (Thomas Mason)',
    fit: 'Slim / Contemporary',
    care: 'Деликатная стирка 30°C или химчистка',
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Белоснежный', hex: '#FFFFFF' },
      { name: 'Небесно-голубой', hex: '#D6EAF8' },
      { name: 'Французская полоска', hex: '#AED6F1' }
    ],
    image: 'https://images.unsplash.com/photo-1620012253295-c15c429fbb78?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 24,
    badge: 'bestseller',
    rating: 4.9,
    reviewsCount: 54,
    createdAt: '2026-01-05'
  },
  {
    id: 'prod-6',
    title: 'Брюки фланелевые со встречными складками',
    category: 'trousers',
    gender: 'men',
    price: 148000,
    description: 'Брюки высокой посадки в стиле Sartoria Italiana с боковыми регуляторами на пряжках (side adjusters) и отворотами 4.5 см. Мягкая шерстяная фланель премиум класса.',
    fabric: '100% шерсть фланель (Fox Brothers)',
    fit: 'High-Rise Relaxed Tapered',
    care: 'Химчистка',
    sizes: ['46', '48', '50', '52', '54'],
    colors: [
      { name: 'Серый меланж', hex: '#7F8C8D' },
      { name: 'Темный антрацит', hex: '#34495E' },
      { name: 'Песочный хаки', hex: '#C2B280' }
    ],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [],
    inStock: true,
    stockCount: 15,
    badge: 'new',
    rating: 4.85,
    reviewsCount: 16,
    createdAt: '2026-02-14'
  },
  {
    id: 'prod-7',
    title: 'Оксфорды цельнокроеные Wholecut Calfskin',
    category: 'shoes',
    gender: 'men',
    price: 270000,
    oldPrice: 310000,
    description: 'Вершина обувного искусства — туфли, скроенные из единого куска телячьей кожи первого сорта. Конструкция Goodyear Welted с закрытым канальным швом на кожаной подошве.',
    fabric: '100% телячья кожа растительного дубления, подкладка шевро',
    fit: 'Колодка классическая E-fit',
    care: 'Очистка щеткой из конского волоса, крем на основе пчелиного воска',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Коньячный Патина', hex: '#582C12' },
      { name: 'Черный Классик', hex: '#111111' }
    ],
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    inStock: true,
    stockCount: 8,
    badge: 'bestseller',
    rating: 4.98,
    reviewsCount: 31,
    createdAt: '2026-01-10'
  },
  {
    id: 'prod-8',
    title: 'Шелковый галстук Grenadine 7-fold',
    category: 'accessories',
    gender: 'unisex',
    price: 62000,
    description: 'Галстук сложного плетения гренадин без подкладки (7 сложений вручную). Ткань изготавливается на старинных деревянных станках в окрестностях озера Комо.',
    fabric: '100% шелк шелкопряд Комо',
    fit: 'Ширина 8.5 см, длина 150 см',
    care: 'Химчистка шелка',
    sizes: ['One Size'],
    colors: [
      { name: 'Бордовый Марсала', hex: '#6D1E2C' },
      { name: 'Морской Midnight Blue', hex: '#191970' },
      { name: 'Изумрудный хвойный', hex: '#1B4D3E' }
    ],
    image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [],
    inStock: true,
    stockCount: 20,
    rating: 4.9,
    reviewsCount: 27,
    createdAt: '2026-01-25'
  },
  {
    id: 'prod-9',
    title: 'Мужской клубный блейзер в клетку Prince of Wales',
    category: 'blazers',
    gender: 'men',
    price: 315000,
    description: 'Традиционный британский мужской пиджак из мягкой камвольной шерсти. Узор «Принц Уэльский» с деликатной голубой оверчековой линией. Роговые пуговицы и ручная вспушка лацканов.',
    fabric: '100% натуральная шерсть саксонских овец (Fox Brothers)',
    fit: 'Classic Tailored Cut',
    care: 'Химчистка',
    sizes: ['46', '48', '50', '52', '54', '56'],
    colors: [
      { name: 'Серо-синяя клетка', hex: '#525F6D' }
    ],
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [],
    inStock: true,
    stockCount: 9,
    badge: 'new',
    rating: 4.92,
    reviewsCount: 19,
    createdAt: '2026-02-18'
  },
  {
    id: 'prod-10',
    title: 'Мужской двубортный тренчкот Kensington из габардина',
    category: 'coats',
    gender: 'men',
    price: 365000,
    oldPrice: 420000,
    description: 'Культовый мужской тренчкот из водоотталкивающего хлопкового габардина тройной крутки. Пояс с кожаной пряжкой, ветрозащитный клапан, кокетка и шлица для свободы шага.',
    fabric: '100% хлопковый влагозащитный габардин',
    fit: 'Classic Regular Fit',
    care: 'Деликатная сухая чистка',
    sizes: ['46', '48', '50', '52', '54', '56'],
    colors: [
      { name: 'Песочно-бежевый кэмел', hex: '#C2A378' },
      { name: 'Темно-синий Navy', hex: '#1E293B' }
    ],
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
    additionalImages: [],
    inStock: true,
    stockCount: 11,
    badge: 'sale',
    rating: 4.94,
    reviewsCount: 36,
    createdAt: '2026-01-28'
  }
];

export const INITIAL_ORDERS: import('../types').Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'MSK-8492',
    date: '2026-09-18',
    customerName: 'Азамат Раимов',
    customerPhone: '+7 (701) 450-22-11',
    customerEmail: 'azamatrai071@gmail.com',
    deliveryAddress: 'г. Алматы, пр. Достык, д. 112, кв. 24',
    deliveryMethod: 'courier_fitting',
    paymentMethod: 'card_courier',
    items: [
      {
        productId: 'prod-1',
        title: 'Костюм-тройка из шерсти Super 150s',
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
        price: 420000,
        size: '50',
        colorName: 'Глубокий синий',
        quantity: 1
      },
      {
        productId: 'prod-5',
        title: 'Рубашка сорочечная Royal Oxford',
        image: 'https://images.unsplash.com/photo-1620012253295-c15c429fbb78?auto=format&fit=crop&w=1000&q=80',
        price: 95000,
        size: '41',
        colorName: 'Белоснежный',
        quantity: 2
      }
    ],
    subtotal: 610000,
    discount: 30500,
    deliveryFee: 0,
    total: 579500,
    status: 'shipping',
    trackingCode: 'KAZPOST-883019482KZ',
    comment: 'Пожалуйста, привезите с примеркой после 18:00.'
  },
  {
    id: 'ord-102',
    orderNumber: 'MSK-8314',
    date: '2026-09-02',
    customerName: 'Азамат Раимов',
    customerPhone: '+7 (701) 450-22-11',
    customerEmail: 'azamatrai071@gmail.com',
    deliveryAddress: 'г. Алматы, пр. Достык, 180 (Бутик мужской одежды «МОСКВА»)',
    deliveryMethod: 'boutique_pickup',
    paymentMethod: 'card_online',
    items: [
      {
        productId: 'prod-7',
        title: 'Оксфорды цельнокроеные Wholecut Calfskin',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
        price: 270000,
        size: '42',
        colorName: 'Коньячный Патина',
        quantity: 1
      },
      {
        productId: 'prod-8',
        title: 'Шелковый галстук Grenadine 7-fold',
        image: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=1000&q=80',
        price: 62000,
        size: 'One Size',
        colorName: 'Бордовый Марсала',
        quantity: 1
      }
    ],
    subtotal: 332000,
    discount: 16600,
    deliveryFee: 0,
    total: 315400,
    status: 'delivered',
    trackingCode: 'ALMATY-BTQ-01'
  }
];

export const INITIAL_USER: import('../types').UserProfile = {
  name: 'Азамат Раимов',
  email: 'azamatrai071@gmail.com',
  phone: '+7 (701) 450-22-11',
  city: 'Алматы',
  address: 'пр. Достык, д. 112, кв. 24',
  preferredSize: '50 (L)',
  memberTier: 'Privilège',
  discountPercent: 5
};
