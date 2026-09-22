import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Scissors, ShieldCheck, Truck, ArrowUpRight } from 'lucide-react';
import { FilterState } from '../types';

export const HeroBanner: React.FC = () => {
  const { setFilters, setActiveView } = useStore();

  const handleQuickFilter = (category: any, gender: any) => {
    setActiveView('catalog');
    setFilters((prev: FilterState) => ({
      ...prev,
      category,
      gender
    }));
  };

  return (
    <div id="hero-banner" className="relative overflow-hidden bg-[#1E2328] text-white">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-radial from-[#2C353D] via-[#1E2328] to-[#14181B] opacity-90" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#C5A880]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#D8C4A7] text-xs uppercase tracking-[0.2em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
              Мужской дом «МОСКВА» • Коллекция 2026
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-[#FAF9F6]">
              Искусство мужского классического кроя и безупречного вкуса
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-light">
              Традиции неаполитанских и савил-роу ателье. Мужские костюмы-тройки, смокинги Black Tie, блейзеры из шерсти Loro Piana и кашемировые пальто с бесплатной примеркой перед покупкой.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-men-suits-btn"
                onClick={() => handleQuickFilter('suits', 'all')}
                className="px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#B39368] text-[#14181B] font-semibold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Костюмы & Смокинги</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button
                id="hero-blazers-btn"
                onClick={() => handleQuickFilter('blazers', 'all')}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition-all"
              >
                Блейзеры & Пиджаки
              </button>
              <button
                id="hero-coats-btn"
                onClick={() => handleQuickFilter('coats', 'all')}
                className="px-5 py-3 rounded-full text-slate-300 hover:text-white font-medium text-sm transition-all hover:bg-white/5"
              >
                Кашемировые пальто →
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Scissors className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Итальянские ткани Super 130s–150s</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Курьер с примеркой перед оплатой</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Гарантия идеальной посадки</span>
              </div>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl border border-white/10 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80"
                  alt="Классический мужской костюм"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#C5A880]">Выбор стилиста</span>
                  <h3 className="font-serif text-xl font-medium mt-1">Тройка из шерсти Super 150s</h3>
                  <p className="text-xs text-slate-300 mt-1">Ручная вспушка и неаполитанское плечо</p>
                </div>
              </div>

              {/* Floating detail tag */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white/95 text-[#1C2024] p-4 rounded-xl shadow-xl border border-[#E0DBD1] backdrop-blur-md max-w-[210px]">
                <div className="text-[10px] text-[#8C7B65] font-semibold uppercase tracking-wider">Материал</div>
                <div className="text-xs font-semibold mt-0.5">100% шерсть Loro Piana</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Супер 150s камвольная</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
