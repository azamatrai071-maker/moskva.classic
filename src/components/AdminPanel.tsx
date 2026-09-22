import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, OrderStatus, ProductBadge } from '../types';
import { formatTenge } from '../utils/formatters';
import {
  Plus,
  Trash2,
  Edit,
  Package,
  Layers,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Upload,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Search,
  Eye,
  Tag,
  Lock,
  LogOut,
  ExternalLink,
  Check,
  X,
  AlertCircle,
  Key
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Костюм тройка синий', url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Блейзер Неаполь', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Пальто кэмел', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Смокинг Black Tie', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Сорочка белая', url: 'https://images.unsplash.com/photo-1620012253295-c15c429fbb78?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Брюки фланель', url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Оксфорды кожа', url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Шелковый галстук', url: 'https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Твидовый пиджак', url: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Тренчкот бежевый', url: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=1000&q=80' }
];

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    orders,
    updateOrderStatus,
    setActiveView,
    resetToDefaults,
    viewProductOnMain,
    showToast,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin
  } = useStore();

  // Login form state
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin tabs: 'add' is prominent
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add'>('add');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adminSearch, setAdminSearch] = useState('');

  // Form State for Adding / Editing Clothing
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('suits');
  const [gender, setGender] = useState<'men' | 'unisex'>('men');
  const [price, setPrice] = useState<number>(280000);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('100% шерсть Super 150s (Loro Piana)');
  const [fit, setFit] = useState('Tailored Fit');
  const [care, setCare] = useState('Сухая чистка');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['48', '50', '52', '54']);
  const [badge, setBadge] = useState<ProductBadge | ''>('new');
  const [stockCount, setStockCount] = useState<number>(10);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [extraImageUrl, setExtraImageUrl] = useState('');
  const [colorName, setColorName] = useState('Глубокий синий');
  const [colorHex, setColorHex] = useState('#1C2833');

  // Success modal after creating clothing
  const [lastCreatedProductId, setLastCreatedProductId] = useState<string | null>(null);
  const [lastCreatedTitle, setLastCreatedTitle] = useState<string>('');

  const standardSizes = ['44', '46', '48', '50', '52', '54', '56', 'S', 'M', 'L', 'XL', 'One Size'];

  // Handle Admin Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(loginInput, passwordInput);
    if (!success) {
      setLoginError('Неверный логин или пароль. Используйте admin и admin123');
    }
  };

  const fillTestCredentials = () => {
    setLoginInput('admin');
    setPasswordInput('admin123');
    setLoginError('');
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setCategory(p.category);
    setGender(p.gender);
    setPrice(p.price);
    setOldPrice(p.oldPrice);
    setDescription(p.description);
    setFabric(p.fabric);
    setFit(p.fit);
    setCare(p.care);
    setSelectedSizes(p.sizes);
    setBadge(p.badge || '');
    setStockCount(p.stockCount);
    setImageUrl(p.image);
    setAdditionalImages(p.additionalImages || []);
    if (p.colors && p.colors.length > 0) {
      setColorName(p.colors[0].name);
      setColorHex(p.colors[0].hex);
    }
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setEditingProduct(null);
    setTitle('');
    setDescription('');
    setPrice(280000);
    setOldPrice(undefined);
    setFabric('100% шерсть Super 150s (Loro Piana)');
    setFit('Tailored Fit');
    setSelectedSizes(['48', '50', '52', '54']);
    setBadge('new');
    setStockCount(10);
    setImageUrl(PRESET_IMAGES[0].url);
    setAdditionalImages([]);
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== size));
      }
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // Image Upload handler (reads local file from user device and converts to base64 Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
          showToast('Фото одежды успешно загружено!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddExtraImage = () => {
    if (extraImageUrl.trim()) {
      setAdditionalImages([...additionalImages, extraImageUrl.trim()]);
      setExtraImageUrl('');
    }
  };

  const handleRemoveExtraImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (andRedirectToMain = false) => {
    if (!title.trim()) {
      showToast('Пожалуйста, введите название одежды', 'error');
      return;
    }

    if (isNaN(price) || price <= 0) {
      showToast('Укажите корректную цену в тенге', 'error');
      return;
    }

    const payload = {
      title: title.trim(),
      category,
      gender,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      description: description.trim() || 'Эксклюзивная модель классической одежды Atelier Classique.',
      fabric: fabric.trim() || 'Натуральная итальянская шерсть',
      fit: fit.trim() || 'Tailored Fit',
      care: care.trim() || 'Сухая химчистка',
      sizes: selectedSizes.length > 0 ? selectedSizes : ['48', '50', '52'],
      colors: [{ name: colorName, hex: colorHex }],
      image: imageUrl.trim() || PRESET_IMAGES[0].url,
      additionalImages: additionalImages.length > 0 ? additionalImages : undefined,
      inStock: stockCount > 0,
      stockCount: Number(stockCount),
      badge: badge ? (badge as ProductBadge) : undefined
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...payload
      });
      showToast(`Модель «${payload.title}» успешно обновлена!`, 'success');
      handleResetForm();
      if (andRedirectToMain) {
        viewProductOnMain(editingProduct.id);
      } else {
        setActiveTab('products');
      }
    } else {
      const created = addProduct(payload);
      setLastCreatedProductId(created.id);
      setLastCreatedTitle(created.title);
      showToast(`«${payload.title}» добавлена на главную витрину!`, 'success');
      handleResetForm();

      if (andRedirectToMain) {
        viewProductOnMain(created.id);
      }
    }
  };

  // IF NOT AUTHENTICATED: Show clean, secure Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 sm:py-24">
        <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xl p-8 sm:p-10 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-[#1C2024] text-[#C5A880] flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2024]">
              Панель управления ателье
            </h1>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
              Локальная мини-админка для добавления своей одежды и управления заказами в тенге (₸) без базы данных.
            </p>
          </div>

          {/* Quick 1-click test credential helper */}
          <div className="bg-[#FAF9F6] border border-[#EAE6DF] rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Key className="w-4 h-4 text-[#8C7B65] shrink-0" />
              <div className="text-xs">
                <div className="font-semibold text-gray-800">Тестовый доступ:</div>
                <div className="text-gray-500 font-mono text-[11px]">логин: <strong>admin</strong> / пароль: <strong>admin123</strong></div>
              </div>
            </div>
            <button
              type="button"
              onClick={fillTestCredentials}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#DDD8CF] hover:border-[#8C7B65] text-[#8C7B65] text-xs font-semibold shadow-2xs transition-colors shrink-0"
            >
              Заполнить в 1 клик
            </button>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Логин администратора</label>
              <input
                type="text"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm bg-white"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700">Пароль</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm bg-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1C2024] hover:bg-black text-white font-semibold text-sm shadow-md transition-colors"
            >
              Войти в админку
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={() => setActiveView('catalog')}
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1 font-medium"
            >
              ← Вернуться на главную витрину
            </button>
          </div>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: Full Admin Workspace
  const filteredAdminProducts = products.filter((p) => {
    if (!adminSearch.trim()) return true;
    const q = adminSearch.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.fabric && p.fabric.toLowerCase().includes(q))
    );
  });

  return (
    <div id="admin-panel-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EAE6DF]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => setActiveView('catalog')}
              className="text-xs text-[#8C7B65] hover:underline inline-flex items-center gap-1 font-semibold"
            >
              ← Перейти на главную (витрина)
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-xs text-gray-500">Локальный режим (без БД)</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2024]">
              Управление ателье
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              Вход выполнен (admin)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setActiveView('catalog')}
            className="px-4 py-2 rounded-xl bg-white border border-[#DDD8CF] hover:border-[#8C7B65] text-xs font-semibold text-[#1C2024] shadow-2xs inline-flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Посмотреть витрину
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Выйти
          </button>
        </div>
      </div>

      {/* Success Notification Banner after adding clothing */}
      {lastCreatedProductId && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900">
                Модель «{lastCreatedTitle}» успешно добавлена и доступна на главной!
              </div>
              <div className="text-[11px] text-emerald-700 mt-0.5">
                Она сразу отображается в каталоге с ценой в тенге (₸), описанием и фотографиями.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => viewProductOnMain(lastCreatedProductId)}
              className="px-4 py-2 rounded-xl bg-[#1C2024] hover:bg-black text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Посмотреть на главной
            </button>
            <button
              onClick={() => setLastCreatedProductId(null)}
              className="p-2 rounded-xl hover:bg-emerald-100 text-emerald-700 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#EAE6DF] pb-4">
        <button
          onClick={() => {
            setActiveTab('add');
            if (!editingProduct) handleResetForm();
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs ${
            activeTab === 'add'
              ? 'bg-[#1C2024] text-white shadow-sm'
              : 'bg-[#C5A880] text-[#1C2024] hover:bg-[#B3966E]'
          }`}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          {editingProduct ? 'Редактировать модель' : 'Добавить свою одежду'}
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-white text-[#1C2024] border border-[#DDD8CF] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Package className="w-4 h-4" />
          Каталог одежды ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-white text-[#1C2024] border border-[#DDD8CF] shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          Заказы клиентов ({orders.length})
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={resetToDefaults}
            className="px-3 py-1.5 rounded-lg border border-[#DDD8CF] text-gray-500 hover:text-gray-800 text-[11px] font-medium inline-flex items-center gap-1.5"
            title="Сбросить товары к заводским шаблонам"
          >
            <RotateCcw className="w-3 h-3" />
            Сбросить к образцам
          </button>
        </div>
      </div>

      {/* TAB 1: ADD / EDIT CLOTHING FORM */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs p-6 sm:p-10 space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0ECE4]">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C2024]">
                {editingProduct ? `Редактирование: ${editingProduct.title}` : 'Добавить новую одежду на главную витрину'}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Заполните название, описание, фотографии и цену в тенге (₸). Товар сразу станет доступен для заказа.
              </p>
            </div>

            {editingProduct && (
              <button
                onClick={handleResetForm}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
              >
                Отменить редактирование
              </button>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSaveProduct(false); }} className="space-y-8">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-[#8C7B65]" />
                1. Основная информация о модели
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">
                    Название одежды <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Например: Костюм-двойка из итальянской шерсти Super 150s"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Категория изделия</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm bg-white"
                  >
                    <option value="suits">Костюмы и смокинги</option>
                    <option value="blazers">Пиджаки и блейзеры</option>
                    <option value="coats">Пальто и тренчи</option>
                    <option value="shirts">Сорочки и рубашки</option>
                    <option value="trousers">Брюки со складками</option>
                    <option value="shoes">Классическая обувь</option>
                    <option value="accessories">Аксессуары (галстуки, платки)</option>
                  </select>
                </div>

                {/* Gender / Line */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Линия (Мужская классика «МОСКВА»)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('men')}
                      className={`py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                        gender === 'men'
                          ? 'bg-[#1C2024] text-white border-[#1C2024]'
                          : 'bg-white text-gray-700 border-[#DDD8CF] hover:border-gray-400'
                      }`}
                    >
                      Мужская классика
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('unisex')}
                      className={`py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                        gender === 'unisex'
                          ? 'bg-[#1C2024] text-white border-[#1C2024]'
                          : 'bg-white text-gray-700 border-[#DDD8CF] hover:border-gray-400'
                      }`}
                    >
                      Аксессуары (Универсально)
                    </button>
                  </div>
                </div>

                {/* Price in Tenge */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">
                    Цена в тенге (₸) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="280000"
                      min={100}
                      step={1000}
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm font-semibold"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">
                      ₸
                    </span>
                  </div>
                  <div className="text-[11px] text-[#8C7B65]">
                    Отобразится как: <strong>{formatTenge(price)}</strong>
                  </div>
                </div>

                {/* Old Price in Tenge (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">
                    Старая цена в тенге (до скидки, опционально)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={oldPrice || ''}
                      onChange={(e) => setOldPrice(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="340000"
                      min={100}
                      step={1000}
                      className="w-full pl-4 pr-12 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      ₸
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Бейдж на карточке</label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm bg-white"
                  >
                    <option value="">Без бейджа</option>
                    <option value="new">Новинка сезона (NEW)</option>
                    <option value="bestseller">Бестселлер ателье</option>
                    <option value="exclusive">Эксклюзивный лимитированный тираж</option>
                    <option value="sale">Специальное предложение (Скидка)</option>
                  </select>
                </div>

                {/* Stock Count */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Количество на складе</label>
                  <input
                    type="number"
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                    min={0}
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-gray-800">
                  Подробное описание модели
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Опишите особенности кроя, происхождение ткани, лацканы, силуэт, подкладку и для каких поводов подходит эта модель..."
                  className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-sm"
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4 pt-4 border-t border-[#F0ECE4]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-[#8C7B65]" />
                2. Фотографии одежды (Главное фото и галерея)
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Photo Preview Card */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-800">Предпросмотр главного фото</label>
                  <div className="aspect-3/4 rounded-2xl border border-[#DDD8CF] bg-[#FAF9F6] overflow-hidden relative shadow-xs">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PRESET_IMAGES[0].url;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                        <ImageIcon className="w-8 h-8 mb-2" />
                        <span className="text-xs">Фото не выбрано</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload and URL controls */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Option A: Upload file from device */}
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EAE6DF] space-y-2">
                    <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-[#8C7B65]" />
                      Способ 1: Загрузить фото с вашего устройства (ПК, планшет, телефон)
                    </label>
                    <p className="text-[11px] text-gray-500">
                      Файл мгновенно конвертируется и сохраняется локально в магазине без внешнего сервера.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#1C2024] file:text-white hover:file:bg-black file:cursor-pointer cursor-pointer"
                    />
                  </div>

                  {/* Option B: Enter Direct URL */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-800">
                      Способ 2: Вставить прямую интернет-ссылку (URL) на фото
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65] text-xs font-mono"
                    />
                  </div>

                  {/* Option C: Ready presets */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-semibold text-gray-800">
                      Способ 3: Выбрать из готовых стильных фото-образцов
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {PRESET_IMAGES.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageUrl(preset.url)}
                          className={`p-1.5 rounded-xl border text-left transition-all ${
                            imageUrl === preset.url
                              ? 'border-[#8C7B65] ring-2 ring-[#8C7B65]/20 bg-amber-50/50'
                              : 'border-[#EAE6DF] hover:border-gray-400 bg-white'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="w-full h-14 object-cover rounded-lg mb-1"
                          />
                          <div className="text-[10px] font-medium text-gray-700 truncate">
                            {preset.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Images (Gallery) */}
                  <div className="space-y-2 pt-2 border-t border-[#F0ECE4]">
                    <label className="text-xs font-semibold text-gray-800">
                      Дополнительные ракурсы (для галереи в карточке товара)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={extraImageUrl}
                        onChange={(e) => setExtraImageUrl(e.target.value)}
                        placeholder="Вставьте ссылку на дополнительное фото"
                        className="flex-1 px-4 py-2 rounded-xl border border-[#DDD8CF] text-xs focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddExtraImage}
                        className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800"
                      >
                        + Добавить фото
                      </button>
                    </div>

                    {additionalImages.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {additionalImages.map((img, i) => (
                          <div key={i} className="relative group w-16 h-16 rounded-xl border border-gray-200 overflow-hidden">
                            <img src={img} alt="Extra" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveExtraImage(i)}
                              className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Fabric, Fit, Care Section */}
            <div className="space-y-4 pt-4 border-t border-[#F0ECE4]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8C7B65]" />
                3. Ткань, посадка и детали тейлоринга
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Состав ткани и мануфактура</label>
                  <input
                    type="text"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    placeholder="Например: 100% шерсть Super 150s (Loro Piana)"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Силуэт и посадка</label>
                  <input
                    type="text"
                    value={fit}
                    onChange={(e) => setFit(e.target.value)}
                    placeholder="Например: Tailored Fit / Неаполитанский крой"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Рекомендации по уходу</label>
                  <input
                    type="text"
                    value={care}
                    onChange={(e) => setCare(e.target.value)}
                    placeholder="Например: Сухая химчистка, глажка с паром"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDD8CF] text-sm"
                  />
                </div>
              </div>

              {/* Sizes Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-gray-800">
                  Доступные размеры (выберите один или несколько)
                </label>
                <div className="flex flex-wrap gap-2">
                  {standardSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeToggle(size)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-[#1C2024] text-white border-[#1C2024] shadow-2xs'
                            : 'bg-white text-gray-700 border-[#DDD8CF] hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Название цвета</label>
                  <input
                    type="text"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    placeholder="Например: Глубокий синий / Шоколадный / Кэмел"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CF] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-800">Цветовой оттенок (Hex код)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value)}
                      className="w-10 h-10 rounded-xl border border-[#DDD8CF] cursor-pointer"
                    />
                    <input
                      type="text"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value)}
                      placeholder="#1C2833"
                      className="w-32 px-3 py-2 rounded-xl border border-[#DDD8CF] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-[#F0ECE4]">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#1C2024] hover:bg-black text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                {editingProduct ? 'Сохранить изменения' : 'Опубликовать на главной витрине'}
              </button>

              <button
                type="button"
                onClick={() => handleSaveProduct(true)}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#C5A880] hover:bg-[#B3966E] text-[#1C2024] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Опубликовать и сразу перейти на витрину
              </button>

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-5 py-4 rounded-xl border border-[#DDD8CF] hover:bg-gray-50 text-gray-700 font-semibold text-sm transition-all"
              >
                Сбросить
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG LIST */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1C2024]">
                Все модели каталога ({products.length})
              </h2>
              <p className="text-xs text-gray-500">
                Управление наличием, ценами в тенге (₸) и редактирование позиций
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Поиск по названию или ткани..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DDD8CF] text-xs focus:outline-none focus:border-[#8C7B65]"
                />
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={() => {
                  handleResetForm();
                  setActiveTab('add');
                }}
                className="px-4 py-2 rounded-xl bg-[#1C2024] hover:bg-black text-white text-xs font-semibold inline-flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Добавить модель
              </button>
            </div>
          </div>

          {filteredAdminProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs">
              Модели не найдены.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F0ECE4] text-gray-400 uppercase tracking-wider text-[10px]">
                    <th className="pb-3 pl-2">Модель</th>
                    <th className="pb-3">Категория / Пол</th>
                    <th className="pb-3">Цена (₸)</th>
                    <th className="pb-3">Размеры</th>
                    <th className="pb-3">Статус</th>
                    <th className="pb-3 text-right pr-2">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F6F4F0]">
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF9F6] transition-colors">
                      <td className="py-3.5 pl-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-14 object-cover rounded-lg border border-[#EAE6DF]"
                          />
                          <div>
                            <div className="font-semibold text-gray-900 text-sm max-w-xs truncate">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-gray-500 max-w-xs truncate">
                              {p.fabric}
                            </div>
                            {p.badge && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-semibold">
                                {p.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 text-gray-600">
                        <div className="capitalize">{p.category}</div>
                        <div className="text-[11px] text-gray-400">
                          {p.gender === 'men' ? 'Мужское' : 'Унисекс'}
                        </div>
                      </td>

                      <td className="py-3.5">
                        <div className="font-bold text-gray-900">
                          {formatTenge(p.price)}
                        </div>
                        {p.oldPrice && (
                          <div className="text-[11px] text-gray-400 line-through">
                            {formatTenge(p.oldPrice)}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 text-gray-600">
                        <div className="flex flex-wrap gap-1 max-w-[140px]">
                          {p.sizes.slice(0, 4).map((s) => (
                            <span key={s} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px]">
                              {s}
                            </span>
                          ))}
                          {p.sizes.length > 4 && (
                            <span className="text-[10px] text-gray-400">+{p.sizes.length - 4}</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            p.inStock
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {p.inStock ? 'В наличии' : 'Нет на складе'}
                        </button>
                      </td>

                      <td className="py-3.5 text-right pr-2">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => viewProductOnMain(p.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black"
                            title="Открыть на витрине"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-[#8C7B65] hover:text-black"
                            title="Редактировать"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Удалить «${p.title}»?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                            title="Удалить"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#EAE6DF] shadow-xs p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C2024]">
              Заказы клиентов по Казахстану ({orders.length})
            </h2>
            <p className="text-xs text-gray-500">
              Отслеживание статусов примерки, курьерской доставки в Алматы, Астане и регионах
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl border border-[#EAE6DF] bg-[#FAF9F6] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE6DF]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#1C2024]">
                        Заказ #{order.orderNumber}
                      </span>
                      <span className="text-xs text-gray-500">от {order.date}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      Клиент: <strong>{order.customerName}</strong> ({order.customerPhone})
                    </div>
                    <div className="text-xs text-gray-500">
                      Адрес: {order.deliveryAddress}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Статус:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="px-3 py-1.5 rounded-lg border border-[#DDD8CF] bg-white text-xs font-semibold text-gray-800"
                    >
                      <option value="created">Оформлен</option>
                      <option value="processing">В ателье / комплектуется</option>
                      <option value="shipping">Передан курьеру</option>
                      <option value="delivered">Доставлен и выкуплен</option>
                      <option value="cancelled">Отменен</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#EAE6DF]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-14 object-cover rounded-lg"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-gray-900 truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Размер: <strong>{item.size}</strong> • {item.quantity} шт.
                        </div>
                        <div className="text-xs font-bold text-gray-900">
                          {formatTenge(item.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs">
                  <div className="text-gray-500">
                    Оплата: {order.paymentMethod === 'kaspi' ? 'Kaspi QR' : order.paymentMethod === 'card_courier' ? 'Картой курьеру' : 'Онлайн'}
                    {order.trackingCode && ` • Трек-код: ${order.trackingCode}`}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    Итого к оплате: {formatTenge(order.total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
