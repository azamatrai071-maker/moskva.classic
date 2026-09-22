import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatTenge } from '../utils/formatters';
import {
  X,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
  Ruler,
  Sparkles,
  ChevronRight,
  Star
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    isInWishlist,
    toggleWishlist
  } = useStore();

  if (!selectedProduct) return null;

  const [activeImage, setActiveImage] = useState<string>(selectedProduct.image);
  const [selectedSize, setSelectedSize] = useState<string>(selectedProduct.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0] || { name: 'Базовый', hex: '#222' });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showSizeTable, setShowSizeTable] = useState(false);

  const inWish = isInWishlist(selectedProduct.id);

  const allImages = [selectedProduct.image, ...(selectedProduct.additionalImages || [])];

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        id="product-detail-modal-container"
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#E8E4DD]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-modal-btn"
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="p-4 sm:p-6 bg-[#FAF9F6] flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-[#E8E4DD]">
            <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-white shadow-inner relative">
              <img
                src={activeImage}
                alt={selectedProduct.title}
                className="w-full h-full object-cover object-top"
              />
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-[#1C2024] text-[#E5D5C0] text-[10px] uppercase font-semibold px-2.5 py-1 rounded">
                  {selectedProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto w-full pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img ? 'border-[#1C2024] scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees bar */}
            <div className="w-full mt-4 pt-4 border-t border-[#E8E4DD] grid grid-cols-2 gap-2 text-[11px] text-gray-600">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#8C7B65] shrink-0" />
                <span>Примерка до 4 размеров</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C7B65] shrink-0" />
                <span>Подгонка в нашем ателье</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Purchase Controls */}
          <div className="p-5 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#8C7B65]">
                <span className="uppercase tracking-widest font-semibold">
                  {selectedProduct.category === 'suits' && 'Костюмы и смокинги'}
                  {selectedProduct.category === 'blazers' && 'Пиджаки и блейзеры'}
                  {selectedProduct.category === 'coats' && 'Пальто и тренчи'}
                  {selectedProduct.category === 'shirts' && 'Сорочки'}
                  {selectedProduct.category === 'trousers' && 'Брюки'}
                  {selectedProduct.category === 'shoes' && 'Обувь'}
                  {selectedProduct.category === 'accessories' && 'Аксессуары'}
                </span>
                <div className="flex items-center gap-1 text-amber-700 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{selectedProduct.rating}</span>
                  <span className="text-gray-400">({selectedProduct.reviewsCount} отзывов)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2024] mt-2">
                {selectedProduct.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#1C2024]">
                  {formatTenge(selectedProduct.price)}
                </span>
                {selectedProduct.oldPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {formatTenge(selectedProduct.oldPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  В наличии ({selectedProduct.stockCount} шт.)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed font-light">
                {selectedProduct.description}
              </p>

              {/* Fabric & Fit Details Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#EFECE6] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Состав ткани:</span>
                  <span className="font-semibold text-gray-800 text-right">{selectedProduct.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Посадка / Силуэт:</span>
                  <span className="font-semibold text-gray-800">{selectedProduct.fit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Уход:</span>
                  <span className="text-gray-700">{selectedProduct.care}</span>
                </div>
              </div>

              {/* Color Selection */}
              {selectedProduct.colors.length > 0 && (
                <div className="mt-5">
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Цвет: <span className="font-normal text-gray-500">{selectedColor.name}</span>
                  </label>
                  <div className="flex gap-2">
                    {selectedProduct.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                          selectedColor.name === color.name
                            ? 'border-[#1C2024] bg-white ring-2 ring-[#1C2024]/20 font-medium'
                            : 'border-[#DDD8CF] hover:border-gray-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-700">
                    Выберите размер:
                  </label>
                  <button
                    onClick={() => setShowSizeTable(!showSizeTable)}
                    className="text-xs text-[#8C7B65] hover:underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Таблица размеров
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                        selectedSize === size
                          ? 'border-[#1C2024] bg-[#1C2024] text-white shadow-sm'
                          : 'border-[#E0DBD1] text-gray-800 hover:border-black bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {showSizeTable && (
                  <div className="mt-3 p-3 bg-amber-50/60 rounded-lg border border-amber-200/60 text-[11px] text-amber-900 leading-tight">
                    <p className="font-semibold mb-1">Совет по выбору размера:</p>
                    <p>Для классических пиджаков и костюмов размер соответствует полуобхвату груди (например, 50 = обхват 100 см). Курьер может привезти два смежных размера для точной примерки.</p>
                  </div>
                )}
              </div>

              {/* Quantity selector */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-gray-700">Количество:</span>
                <div className="flex items-center border border-[#DDD8CF] rounded-lg bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(selectedProduct.stockCount, q + 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E8E4DD]">
              <div className="flex gap-3">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!selectedProduct.inStock}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
                    !selectedProduct.inStock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#1C2024] hover:bg-[#2C353D] text-[#FAF9F6] hover:scale-[1.01]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>Добавлено в корзину!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#E5D5C0]" />
                      <span>Добавить в корзину ({formatTenge(selectedProduct.price * quantity)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-3.5 rounded-xl border transition-all ${
                    inWish
                      ? 'border-red-200 bg-red-50 text-red-500'
                      : 'border-[#DDD8CF] hover:border-gray-400 text-gray-600'
                  }`}
                  title={inWish ? 'Удалить из избранного' : 'В избранное'}
                >
                  <Heart className={`w-5 h-5 ${inWish ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <p className="text-center text-[11px] text-gray-500">
                Оплата после примерки в присутствии персонального курьера
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
