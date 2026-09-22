import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import {
  SlidersHorizontal,
  ChevronDown,
  X,
  Search,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Truck,
  Scissors
} from 'lucide-react';
import { ProductCategory, Gender, FilterState } from '../types';

export const CatalogView: React.FC = () => {
  const {
    filteredProducts,
    products,
    filters,
    setFilters,
    resetFilters,
    setActiveView
  } = useStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categoriesList: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'Все модели' },
    { id: 'suits', label: 'Костюмы и смокинги' },
    { id: 'blazers', label: 'Пиджаки и блейзеры' },
    { id: 'coats', label: 'Пальто и тренчи' },
    { id: 'shirts', label: 'Сорочки' },
    { id: 'trousers', label: 'Брюки' },
    { id: 'shoes', label: 'Обувь' },
    { id: 'accessories', label: 'Аксессуары' }
  ];

  return (
    <div id="catalog-view" className="space-y-10">
      {/* Editorial Hero Banner */}
      <HeroBanner />

      {/* Main Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls and Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE6DF] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Quick Category Filter Pills */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 rounded-xl border border-[#EAE6DF] self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setFilters((prev: FilterState) => ({ ...prev, category: 'all' }))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.category === 'all'
                    ? 'bg-[#1C2024] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Все позиции
              </button>
              <button
                onClick={() => setFilters((prev: FilterState) => ({ ...prev, category: 'suits' }))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.category === 'suits'
                    ? 'bg-[#1C2024] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Костюмы & Смокинги
              </button>
              <button
                onClick={() => setFilters((prev: FilterState) => ({ ...prev, category: 'blazers' }))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.category === 'blazers'
                    ? 'bg-[#1C2024] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Пиджаки
              </button>
              <button
                onClick={() => setFilters((prev: FilterState) => ({ ...prev, category: 'coats' }))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.category === 'coats'
                    ? 'bg-[#1C2024] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Пальто
              </button>
              <button
                onClick={() => setFilters((prev: FilterState) => ({ ...prev, category: 'shoes' }))}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filters.category === 'shoes'
                    ? 'bg-[#1C2024] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Обувь
              </button>
            </div>

            {/* Sorting Dropdown & Count */}
            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
              <span className="text-xs text-gray-500 font-medium">
                Найдено: <strong className="text-gray-900">{filteredProducts.length}</strong>
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Сортировка:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev: FilterState) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="text-xs font-medium py-1.5 px-3 rounded-lg border border-[#DDD8CF] bg-white text-gray-800 focus:outline-none focus:border-[#8C7B65]"
                >
                  <option value="featured">Рекомендованные (Бестселлеры)</option>
                  <option value="newest">Новинки сезона</option>
                  <option value="price-asc">Сначала доступные</option>
                  <option value="price-desc">Сначала премиальные</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Search & Tag indicators */}
          {(filters.category !== 'all' || filters.gender !== 'all' || filters.searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0ECE4] text-xs">
              <span className="text-gray-400">Активные фильтры:</span>

              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF9F6] border border-[#DDD8CF] text-gray-800">
                  {categoriesList.find((c) => c.id === filters.category)?.label}
                  <button
                    onClick={() => setFilters((prev: FilterState) => ({ ...prev, category: 'all' }))}
                    className="hover:text-black ml-0.5"
                  >
                    ×
                  </button>
                </span>
              )}

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900">
                  Поиск: «{filters.searchQuery}»
                  <button
                    onClick={() => setFilters((prev: FilterState) => ({ ...prev, searchQuery: '' }))}
                    className="hover:text-black ml-0.5"
                  >
                    ×
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-[#8C7B65] hover:underline font-medium text-xs ml-auto"
              >
                Сбросить все
              </button>
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EAE6DF] p-12 text-center my-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#EAE6DF] flex items-center justify-center mx-auto text-gray-400">
              <Search className="w-7 h-7 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1C2024]">По вашему запросу ничего не найдено</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Попробуйте изменить параметры фильтрации, выбрать другую категорию или сбросить поиск
              </p>
            </div>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-[#1C2024] text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              Показать все модели
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Tailoring & Salon Info Section */}
        <div className="my-16 bg-[#FAF9F6] border border-[#EAE6DF] rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1C2024] text-[#E5D5C0] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C2024]">
                Собственное ателье подгонки
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Любой купленный у нас костюм или пальто портной бесплатно подгонит по фигуре: укоротит рукава со шлицами, скорректирует посадку брюк со стрелками.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1C2024] text-[#E5D5C0] flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C2024]">
                Выездная примерка со стилистом
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Закажите до 4 костюмов или смежных размеров. Курьер подождет 20 минут, пока вы оцените посадку у зеркала. Оплата только подошедшего.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1C2024] text-[#E5D5C0] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1C2024]">
                Ткани первого эшелона
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Используем только аутентичные итальянские и английские мануфактуры: Loro Piana, Vitale Barberis Canonico, Fox Brothers и Thomas Mason.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14181B] text-slate-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <span className="font-serif text-lg font-bold text-[#FAF9F6] tracking-widest uppercase">
              МОСКВА
            </span>
            <p className="text-slate-400 text-xs leading-relaxed">
              Мужской дом классической одежды и премиального тейлоринга «МОСКВА» в Казахстане. Алматы, пр. Достык, 180.
            </p>
            <div className="text-[11px] text-[#C5A880]">
              Ежедневно с 10:00 до 21:00 • Бесплатная примерка в Алматы и Астане
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Мужской каталог</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setFilters((p: FilterState) => ({ ...p, category: 'suits' }))} className="hover:text-white">Мужские костюмы-тройки & смокинги</button></li>
              <li><button onClick={() => setFilters((p: FilterState) => ({ ...p, category: 'blazers' }))} className="hover:text-white">Неаполитанские блейзеры</button></li>
              <li><button onClick={() => setFilters((p: FilterState) => ({ ...p, category: 'coats' }))} className="hover:text-white">Кашемировые пальто и тренчи</button></li>
              <li><button onClick={() => setFilters((p: FilterState) => ({ ...p, category: 'shoes' }))} className="hover:text-white">Оксфорды и дерби Goodyear</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Сервис</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><button onClick={() => setActiveView('cabinet')} className="hover:text-white">Личный кабинет и заказы</button></li>
              <li><button onClick={() => setActiveView('admin')} className="hover:text-white">Мини-админка ателье</button></li>
              <li><span className="hover:text-white cursor-pointer">Правила примерки в Казахстане</span></li>
              <li><span className="hover:text-white cursor-pointer">Оплата через Kaspi QR / Red</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Контакты бутика</h4>
            <div className="text-slate-300 font-medium">+7 (727) 355-19-94</div>
            <div className="text-slate-400">concierge@moskva-couture.kz</div>
            <div className="pt-2 text-[11px] text-slate-500">
              © {new Date().getFullYear()} Мужской дом классической одежды «МОСКВА». Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
