import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatTenge } from '../utils/formatters';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Tag,
  CheckCircle,
  Truck,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen,
    userProfile
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState(false);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 100000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const deliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyPromoCode(promoInput);
    if (!ok) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 2500);
    } else {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE6DF] flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#8C7B65]" />
            <h2 className="font-serif text-xl font-bold text-[#1C2024]">
              Корзина покупок
            </h2>
            <span className="text-xs bg-[#EAE6DF] text-gray-700 px-2 py-0.5 rounded-full font-semibold">
              {cartCount}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors p-1"
                title="Очистить корзину"
              >
                Очистить
              </button>
            )}
            <button
              id="close-cart-btn"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Free delivery progress bar */}
        {cart.length > 0 && (
          <div className="bg-[#F4F1EA] px-5 py-3 border-b border-[#EAE6DF]">
            <div className="flex items-center justify-between text-xs text-gray-700 mb-1.5">
              <div className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#8C7B65]" />
                {remainingForFreeDelivery === 0 ? (
                  <span className="text-emerald-700 font-semibold">Вам доступна бесплатная примерка!</span>
                ) : (
                  <span>
                    До бесплатной примерки: <strong>{formatTenge(remainingForFreeDelivery)}</strong>
                  </span>
                )}
              </div>
              <span className="text-[11px] text-gray-500">{Math.round(deliveryProgress)}%</span>
            </div>
            <div className="w-full bg-[#DDD7CB] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#8C7B65] h-full rounded-full transition-all duration-300"
                style={{ width: `${deliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#F0ECE4]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FAF9F6] border border-[#EAE6DF] flex items-center justify-center text-gray-400">
                <ShoppingBag className="w-9 h-9 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1C2024]">Ваша корзина пуста</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Выберите классический костюм, пальто или рубашку из нашей новой коллекции
                </p>
              </div>
              <button
                id="cart-empty-explore-btn"
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#1C2024] text-white text-xs font-semibold hover:bg-black transition-colors"
              >
                Перейти в каталог
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5">
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#F3EFE9] shrink-0 border border-[#E8E4DD]">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-xs sm:text-sm text-[#1C2024] line-clamp-1 pr-2">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Удалить"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Size and Color Badge */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] bg-[#FAF9F6] border border-[#EAE6DF] px-2 py-0.5 rounded text-gray-700">
                        Размер: <strong>{item.selectedSize}</strong>
                      </span>
                      <span className="text-[11px] text-gray-600 flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-[#DDD8CF] rounded-md bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Уменьшить"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Увеличить"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-[#1C2024]">
                        {formatTenge(item.product.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-gray-400">
                          {formatTenge(item.product.price)} / шт.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout & Summary Section */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FAF9F6] border-t border-[#EAE6DF] space-y-4">
            {/* Promo Code Input */}
            <div>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Промокод <strong>{appliedPromo.code}</strong> (-{appliedPromo.percent}%)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-gray-400 hover:text-red-500 font-semibold"
                  >
                    Отменить
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Промокод (напр. MOSKVA10 или MOSKVA)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 bg-white rounded-lg border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#1C2024] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Применить
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-red-500 mt-1">Промокод не найден. Попробуйте CLASSIC10</p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 border-t border-[#EAE6DF] pt-3">
              <div className="flex justify-between">
                <span>Стоимость товаров:</span>
                <span className="font-medium text-gray-900">{formatTenge(cartSubtotal)}</span>
              </div>

              {(cartDiscount > 0 || userProfile.discountPercent > 0) && (
                <div className="flex justify-between text-emerald-700">
                  <span>Скидка клиента ({userProfile.memberTier} + промо):</span>
                  <span>-{formatTenge(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Курьерская примерка:</span>
                <span>
                  {cartDeliveryFee === 0 ? (
                    <strong className="text-emerald-700">Бесплатно</strong>
                  ) : (
                    formatTenge(cartDeliveryFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-bold text-[#1C2024] pt-2 border-t border-[#EAE6DF]">
                <span>Итого к оплате:</span>
                <span className="font-serif">{formatTenge(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="cart-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-[#1C2024] hover:bg-black text-[#FAF9F6] text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all"
            >
              <span>Оформить заказ с примеркой</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[10px] text-gray-400">
              Вы оплачиваете только те вещи, которые подошли после примерки
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
