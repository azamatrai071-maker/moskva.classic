import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatTenge } from '../utils/formatters';
import {
  X,
  CheckCircle2,
  Truck,
  Building,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  QrCode,
  Banknote
} from 'lucide-react';
import { OrderItem, PaymentMethod } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    handlePlaceOrder,
    userProfile,
    setActiveView
  } = useStore();

  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [city, setCity] = useState(userProfile.city || 'Алматы');
  const [address, setAddress] = useState(userProfile.address || '');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier_fitting' | 'boutique_pickup' | 'express'>('courier_fitting');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kaspi');
  const [comment, setComment] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const orderItems: OrderItem[] = cart.map((item) => ({
      productId: item.productId,
      title: item.product.title,
      image: item.product.image,
      price: item.product.price,
      size: item.selectedSize,
      colorName: item.selectedColor.name,
      quantity: item.quantity
    }));

    const newOrder = handlePlaceOrder({
      customerName: name,
      customerPhone: phone,
      customerEmail: email,
      deliveryAddress: deliveryMethod === 'boutique_pickup' ? 'Флагманский салон: Алматы, пр. Достык, 180' : `${city}, ${address}`,
      deliveryMethod,
      paymentMethod,
      items: orderItems,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryFee: deliveryMethod === 'boutique_pickup' ? 0 : cartDeliveryFee,
      total: deliveryMethod === 'boutique_pickup' ? cartSubtotal - cartDiscount : cartTotal,
      comment
    });

    setSubmittedOrder(newOrder);
  };

  const handleFinish = () => {
    setSubmittedOrder(null);
    setIsCheckoutOpen(false);
    setActiveView('cabinet');
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div
        id="checkout-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-[#E8E4DD]"
      >
        {/* Header */}
        <div className="p-5 bg-[#FAF9F6] border-b border-[#EAE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8C7B65]" />
            <h2 className="font-serif text-xl font-bold text-[#1C2024]">
              {submittedOrder ? 'Заказ успешно принят' : 'Оформление заказа с примеркой'}
            </h2>
          </div>
          {!submittedOrder && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {submittedOrder ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#8C7B65]">
                  Номер заказа
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#1C2024] mt-1">
                  {submittedOrder.orderNumber}
                </h3>
              </div>

              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Благодарим вас, <strong>{submittedOrder.customerName}</strong>! Ваш заказ передан стилистам нашего ателье. Менеджер свяжется с вами по WhatsApp или звонку для уточнения деталей выездной примерки.
              </p>

              {/* Order quick summary box */}
              <div className="bg-[#FAF9F6] rounded-xl p-4 border border-[#EAE6DF] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Сумма к оплате:</span>
                  <span className="font-bold text-gray-900">{formatTenge(submittedOrder.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Способ доставки:</span>
                  <span className="font-medium text-gray-900">
                    {submittedOrder.deliveryMethod === 'courier_fitting' ? 'Курьер с примеркой' : 'Самовывоз из бутика'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Адрес:</span>
                  <span className="font-medium text-gray-900 text-right truncate max-w-[240px]">
                    {submittedOrder.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Трек-номер:</span>
                  <span className="font-mono font-semibold text-[#8C7B65]">{submittedOrder.trackingCode}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  id="checkout-go-to-cabinet-btn"
                  onClick={handleFinish}
                  className="px-8 py-3 rounded-xl bg-[#1C2024] hover:bg-black text-white text-sm font-semibold tracking-wide shadow-md transition-all"
                >
                  Перейти в личный кабинет к заказам
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Info */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C7B65]">
                  1. Контактные данные получателя (Казахстан)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">ФИО *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Арман Ибраев"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Номер телефона (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (777) 123-45-67"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-600 block mb-1">Электронная почта *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@atelier.kz"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Choice */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C7B65]">
                  2. Способ доставки и примерки
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setDeliveryMethod('courier_fitting')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === 'courier_fitting'
                        ? 'border-[#1C2024] bg-[#FAF9F6] ring-2 ring-[#1C2024]/10'
                        : 'border-[#DDD8CF] hover:border-gray-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#8C7B65]" />
                      <span className="text-xs font-semibold text-gray-900">Выездной курьер с примеркой</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Примерка 20 мин. Оплачиваете только те вещи, которые подошли идеально.
                    </p>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('boutique_pickup')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      deliveryMethod === 'boutique_pickup'
                        ? 'border-[#1C2024] bg-[#FAF9F6] ring-2 ring-[#1C2024]/10'
                        : 'border-[#DDD8CF] hover:border-gray-400 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[#8C7B65]" />
                      <span className="text-xs font-semibold text-gray-900">Флагманский салон в Алматы</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      пр. Достык, 180. Индивидуальный салонный визит и мастер-портной.
                    </p>
                  </div>
                </div>

                {deliveryMethod !== 'boutique_pickup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div>
                      <label className="text-xs text-gray-600 block mb-1">Город</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-[#DDD8CF] bg-white focus:outline-none focus:border-[#8C7B65]"
                      >
                        <option value="Алматы">Алматы</option>
                        <option value="Астана">Астана</option>
                        <option value="Шымкент">Шымкент</option>
                        <option value="Караганда">Караганда</option>
                        <option value="Актобе">Актобе</option>
                        <option value="Атырау">Атырау</option>
                        <option value="Другой город РК">Другой город РК</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs text-gray-600 block mb-1">Адрес доставки</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="микрорайон Самал-2, д. 25, кв. 14"
                        className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#8C7B65]">
                  3. Способ оплаты в тенге (₸)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kaspi')}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      paymentMethod === 'kaspi'
                        ? 'border-[#E01E2E] bg-red-50/40 ring-1 ring-[#E01E2E] font-semibold text-[#1C2024]'
                        : 'border-[#DDD8CF] text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1 text-[#E01E2E]" />
                    <span className="text-[#E01E2E] font-bold">Kaspi QR / Red</span>
                    <span className="block text-[10px] text-gray-500 font-normal">При получении или онлайн</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card_courier')}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      paymentMethod === 'card_courier'
                        ? 'border-[#1C2024] bg-[#FAF9F6] font-semibold text-[#1C2024]'
                        : 'border-[#DDD8CF] text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1 text-[#8C7B65]" />
                    <span>Картой курьеру</span>
                    <span className="block text-[10px] text-gray-400 font-normal">POS-терминал на месте</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash_courier')}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      paymentMethod === 'cash_courier'
                        ? 'border-[#1C2024] bg-[#FAF9F6] font-semibold text-[#1C2024]'
                        : 'border-[#DDD8CF] text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mb-1 text-[#8C7B65]" />
                    <span>Наличными курьеру</span>
                    <span className="block text-[10px] text-gray-400 font-normal">Оплата после примерки</span>
                  </button>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="text-xs text-gray-600 block mb-1">
                  Пожелания стилисту или курьеру (размеры для примерки, удобное время)
                </label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: Пожалуйста, привезите также 52 размер для сравнения посадки."
                  className="w-full text-xs px-3.5 py-2 rounded-lg border border-[#DDD8CF] focus:outline-none focus:border-[#8C7B65]"
                />
              </div>

              {/* Summary and Submit */}
              <div className="pt-4 border-t border-[#EAE6DF] space-y-3">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-gray-600">Итоговая сумма к оплате ({cart.length} поз.):</span>
                  <span className="font-serif text-xl font-bold text-[#1C2024]">
                    {formatTenge(cartTotal)}
                  </span>
                </div>

                <button
                  id="submit-order-btn"
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1C2024] hover:bg-black text-white text-sm font-semibold tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Подтвердить заказ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
