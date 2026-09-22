import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatTenge } from '../utils/formatters';
import {
  ShoppingBag,
  User,
  Heart,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  X,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ProductCategory, Gender, FilterState } from '../types';

export const Header: React.FC = () => {
  const {
    activeView,
    setActiveView,
    cartCount,
    cartTotal,
    setIsCartOpen,
    wishlist,
    orders,
    filters,
    setFilters
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const activeOrdersCount = orders.filter(
    (o) => o.status === 'created' || o.status === 'processing' || o.status === 'shipping'
  ).length;

  const handleCategoryClick = (cat: ProductCategory, gender: Gender = 'all') => {
    setActiveView('catalog');
    setFilters((prev: FilterState) => ({
      ...prev,
      category: cat,
      gender: gender
    }));
  };

  return (
    <header id="site-header" className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E4DD] transition-all">
      {/* Top Announcement Bar */}
      <div id="top-announcement" className="bg-[#1C2024] text-[#E5D5C0] text-xs py-2 px-4 tracking-wider text-center flex items-center justify-center gap-4">
        <span className="text-[#C5A880] font-semibold tracking-wider">МОСКВА</span>
        <span>• Мужской дом классической одежды</span>
        <span className="hidden sm:inline-block text-[#C5A880]">•</span>
        <span className="hidden sm:inline-block">Бесплатная примерка перед покупкой</span>
        <span className="hidden md:inline-block text-[#C5A880]">•</span>
        <span className="hidden md:inline-block">Скидка 10% по промокоду <strong className="text-[#C5A880] tracking-widest font-semibold">MOSKVA10</strong></span>
        <span className="hidden lg:inline-block text-[#C5A880]">•</span>
        <span className="hidden lg:inline-block text-slate-300">Флагманский бутик: Алматы, пр. Достык, 180</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Quick Links for Men's Classic Clothing */}
          <div className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide">
            <button
              id="nav-catalog-btn"
              onClick={() => {
                setActiveView('catalog');
                setFilters((prev: FilterState) => ({ ...prev, category: 'all', gender: 'all' }));
              }}
              className={`transition-colors py-1 ${
                activeView === 'catalog' && filters.category === 'all'
                  ? 'text-[#1C2024] border-b-2 border-[#1C2024]'
                  : 'text-[#666] hover:text-[#1C2024]'
              }`}
            >
              Весь гардероб
            </button>
            <button
              id="nav-suits-btn"
              onClick={() => handleCategoryClick('suits')}
              className={`transition-colors py-1 ${
                activeView === 'catalog' && filters.category === 'suits'
                  ? 'text-[#1C2024] border-b-2 border-[#1C2024]'
                  : 'text-[#666] hover:text-[#1C2024]'
              }`}
            >
              Костюмы & Смокинги
            </button>
            <button
              id="nav-blazers-btn"
              onClick={() => handleCategoryClick('blazers')}
              className={`transition-colors py-1 ${
                activeView === 'catalog' && filters.category === 'blazers'
                  ? 'text-[#1C2024] border-b-2 border-[#1C2024]'
                  : 'text-[#666] hover:text-[#1C2024]'
              }`}
            >
              Пиджаки & Блейзеры
            </button>
            <button
              id="nav-coats-btn"
              onClick={() => handleCategoryClick('coats')}
              className={`transition-colors py-1 ${
                activeView === 'catalog' && filters.category === 'coats'
                  ? 'text-[#1C2024] border-b-2 border-[#1C2024]'
                  : 'text-[#666] hover:text-[#1C2024]'
              }`}
            >
              Пальто & Тренчи
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="text-center flex flex-col items-center cursor-pointer select-none" onClick={() => setActiveView('catalog')}>
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-[#1C2024] uppercase">
              МОСКВА
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] text-[#8C7B65] uppercase font-medium -mt-0.5">
              Мужской дом классической одежды
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Input / Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-white border border-[#DDD8CF] rounded-full px-3 py-1.5 shadow-sm">
                  <Search className="w-4 h-4 text-[#8C7B65] mr-2 shrink-0" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Шерсть, смокинг, оксфорды..."
                    value={filters.searchQuery}
                    onChange={(e) => {
                      setFilters((prev: FilterState) => ({ ...prev, searchQuery: e.target.value }));
                      if (activeView !== 'catalog') setActiveView('catalog');
                    }}
                    autoFocus
                    className="w-36 sm:w-56 text-xs sm:text-sm bg-transparent outline-none text-[#1C2024]"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setFilters((prev: FilterState) => ({ ...prev, searchQuery: '' }));
                    }}
                    className="text-gray-400 hover:text-gray-600 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  id="search-toggle-btn"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-[#4A4A4A] hover:text-[#1C2024] transition-colors rounded-full hover:bg-[#EFECE6]"
                  title="Поиск одежды"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-btn"
              onClick={() => {
                setActiveView('cabinet');
              }}
              className="p-2 text-[#4A4A4A] hover:text-[#1C2024] transition-colors rounded-full hover:bg-[#EFECE6] relative"
              title="Избранное"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C7B65] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Personal Cabinet (Личный кабинет) */}
            <button
              id="cabinet-nav-btn"
              onClick={() => setActiveView('cabinet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium tracking-wide transition-all relative ${
                activeView === 'cabinet'
                  ? 'bg-[#1C2024] text-[#E5D5C0] border-[#1C2024] shadow-sm'
                  : 'bg-white/80 text-[#2C2C2C] border-[#DDD8CF] hover:border-[#8C7B65] hover:bg-white'
              }`}
              title="Личный кабинет и заказы"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Кабинет</span>
              {activeOrdersCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Есть активные заказы" />
              )}
            </button>

            {/* Mini Admin Panel (Мини-админка) */}
            <button
              id="admin-nav-btn"
              onClick={() => setActiveView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all ${
                activeView === 'admin'
                  ? 'bg-[#8C7B65] text-white border-[#8C7B65] shadow-md'
                  : 'bg-[#F2EFE9] text-[#554B3E] border-[#D9D3C7] hover:border-[#8C7B65] hover:bg-[#EAE5DC]'
              }`}
              title="Мини-админка для добавления своей одежды"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#8C7B65]" />
              <span className="hidden sm:inline">Админка</span>
              <span className="bg-[#8C7B65] text-white text-[9px] px-1.5 py-0.2 rounded font-mono uppercase">
                PRO
              </span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#1C2024] hover:bg-[#2C343D] text-[#FAF9F6] px-3.5 py-2 rounded-full shadow-sm transition-all hover:scale-[1.02]"
              title="Открыть корзину"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#E5D5C0]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#C5A880] text-[#1C2024] font-bold text-[11px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-medium tracking-wider">
                {cartTotal > 0 ? formatTenge(cartTotal) : 'Корзина'}
              </span>
            </button>
          </div>
        </div>

        {/* Sub-navigation for categories (Horizontal scrollable bar) */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2.5 border-t border-[#EAE6DF] scrollbar-none text-xs sm:text-sm font-medium">
          <button
            onClick={() => handleCategoryClick('all')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'all'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Все категории
          </button>
          <button
            onClick={() => handleCategoryClick('suits')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'suits'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Костюмы и смокинги
          </button>
          <button
            onClick={() => handleCategoryClick('blazers')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'blazers'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Пиджаки и блейзеры
          </button>
          <button
            onClick={() => handleCategoryClick('coats')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'coats'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Пальто и тренчкоты
          </button>
          <button
            onClick={() => handleCategoryClick('shirts')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'shirts'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Сорочки и рубашки
          </button>
          <button
            onClick={() => handleCategoryClick('trousers')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'trousers'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Брюки со складками
          </button>
          <button
            onClick={() => handleCategoryClick('shoes')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'shoes'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Обувь ручной работы
          </button>
          <button
            onClick={() => handleCategoryClick('accessories')}
            className={`whitespace-nowrap px-3 py-1 rounded-full transition-colors ${
              activeView === 'catalog' && filters.category === 'accessories'
                ? 'bg-[#1C2024] text-white'
                : 'text-[#555] hover:text-[#1C2024] hover:bg-[#EFECE6]'
            }`}
          >
            Шелковые галстуки & Аксессуары
          </button>
        </div>
      </div>
    </header>
  );
};
