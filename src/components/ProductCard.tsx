import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatTenge } from '../utils/formatters';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, isInWishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [isAdded, setIsAdded] = useState(false);

  const inWish = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const getBadgeLabel = (badge?: string) => {
    switch (badge) {
      case 'bestseller':
        return { text: 'Бестселлер', bg: 'bg-[#1C2024] text-[#E5D5C0]' };
      case 'new':
        return { text: 'Новинка', bg: 'bg-[#2E4A3D] text-white' };
      case 'exclusive':
        return { text: 'Эксклюзив', bg: 'bg-[#6D1E2C] text-white' };
      case 'sale':
        return { text: 'Скидка', bg: 'bg-[#8C2D19] text-white' };
      default:
        return null;
    }
  };

  const badgeInfo = getBadgeLabel(product.badge);

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => setSelectedProduct(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-[#EAE6DF] hover:border-[#C5A880]/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F3EFE9]">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {badgeInfo && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm shadow-xs ${badgeInfo.bg}`}>
              {badgeInfo.text}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
            inWish
              ? 'bg-[#1C2024] text-red-400 shadow-md'
              : 'bg-white/80 hover:bg-white text-gray-700 hover:text-black shadow-xs'
          }`}
          title={inWish ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart className={`w-4 h-4 ${inWish ? 'fill-red-400 text-red-400' : ''}`} />
        </button>

        {/* Quick View overlay on desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-white/95 hover:bg-white text-[#1C2024] text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Подробнее</span>
          </button>
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`py-2 px-3.5 rounded-lg text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all ${
              !product.inStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#1C2024] hover:bg-[#2F3740] text-white'
            }`}
          >
            {isAdded ? <Check className="w-3.5 h-3.5 text-white" /> : <ShoppingBag className="w-3.5 h-3.5 text-[#E5D5C0]" />}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Fabric & Gender Info */}
          <div className="flex items-center justify-between text-[11px] text-[#8C7B65] font-medium tracking-wide mb-1">
            <span className="truncate max-w-[180px]">{product.fabric.split('(')[0].trim()}</span>
            <div className="flex items-center gap-1 text-amber-700">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base font-semibold text-[#1C2024] line-clamp-1 group-hover:text-[#8C7B65] transition-colors">
            {product.title}
          </h3>

          {/* Fit description */}
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">
            Крой: {product.fit}
          </p>

          {/* Sizes quick picker */}
          <div className="flex flex-wrap gap-1 mt-2.5" onClick={(e) => e.stopPropagation()}>
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] px-2 py-0.5 rounded border transition-colors ${
                  selectedSize === size
                    ? 'border-[#1C2024] bg-[#1C2024] text-white font-semibold'
                    : 'border-[#E0DBD1] text-gray-600 hover:border-[#1C2024]'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[10px] text-gray-400 self-center">+{product.sizes.length - 5}</span>
            )}
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#F0ECE4] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-[#1C2024]">
                {formatTenge(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatTenge(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 block -mt-0.5">
              {product.inStock ? 'В наличии в салоне' : 'Под заказ (3-5 дней)'}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`sm:hidden p-2 rounded-lg text-xs font-semibold ${
              !product.inStock
                ? 'bg-gray-200 text-gray-400'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1C2024] text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
