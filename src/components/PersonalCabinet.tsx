import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatTenge } from '../utils/formatters';
import {
  User,
  Package,
  Heart,
  Settings,
  Clock,
  CheckCircle2,
  Truck,
  RotateCcw,
  XCircle,
  FileText,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Shield,
  ShoppingBag,
  ExternalLink,
  Edit2
} from 'lucide-react';
import { OrderStatus } from '../types';

export const PersonalCabinet: React.FC = () => {
  const {
    orders,
    cancelOrder,
    userProfile,
    updateUserProfile,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    setActiveView,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<any>(null);

  // Profile edit form state
  const [editName, setEditName] = useState(userProfile.name);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editCity, setEditCity] = useState(userProfile.city);
  const [editAddress, setEditAddress] = useState(userProfile.address);
  const [editSize, setEditSize] = useState(userProfile.preferredSize);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      city: editCity,
      address: editAddress,
      preferredSize: editSize
    });
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'created':
        return {
          label: 'Оформлен / передан стилисту',
          color: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: Clock
        };
      case 'processing':
        return {
          label: 'В ателье / комплектуется',
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Clock
        };
      case 'shipping':
        return {
          label: 'Передан курьеру в доставку',
          color: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: Truck
        };
      case 'delivered':
        return {
          label: 'Доставлен и выкуплен',
          color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2
        };
      case 'cancelled':
        return {
          label: 'Заказ отменен',
          color: 'bg-gray-100 text-gray-600 border-gray-300',
          icon: XCircle
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700 border-gray-200',
          icon: Clock
        };
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'active') {
      return o.status === 'created' || o.status === 'processing' || o.status === 'shipping';
    }
    if (orderFilter === 'completed') {
      return o.status === 'delivered' || o.status === 'cancelled';
    }
    return true;
  });

  // Wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div id="personal-cabinet-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb & Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#EAE6DF]">
        <div>
          <button
            onClick={() => setActiveView('catalog')}
            className="text-xs text-[#8C7B65] hover:underline mb-1 inline-flex items-center gap-1"
          >
            ← Вернуться к покупкам
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C2024]">
            Личный кабинет клиента
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Управление текущими заказами, примерками в Казахстане, персональной скидкой и историей покупок
          </p>
        </div>

        {/* Loyalty badge */}
        <div className="flex items-center gap-3 bg-[#FAF9F6] border border-[#E0DBD1] p-3 rounded-2xl shadow-xs self-start md:self-auto">
          <div className="w-10 h-10 rounded-full bg-[#1C2024] text-[#E5D5C0] flex items-center justify-center font-serif text-lg font-bold">
            P
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#1C2024]">Статус: {userProfile.memberTier}</span>
              <span className="bg-[#C5A880]/20 text-[#8C7B65] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                -{userProfile.discountPercent}% на всё
              </span>
            </div>
            <span className="text-[11px] text-gray-500 block">Бесплатный выезд стилиста на примерку</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Client Profile & Navigation */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-[#EAE6DF] p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3EFE9] text-[#1C2024] flex items-center justify-center font-bold text-lg font-serif border border-[#DDD8CF]">
                  {userProfile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-[#1C2024]">{userProfile.name}</h3>
                  <p className="text-xs text-gray-500">{userProfile.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs text-[#8C7B65] hover:text-[#1C2024] p-1 rounded-md hover:bg-gray-100 flex items-center gap-1"
                title="Редактировать контакты"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Изменить</span>
              </button>
            </div>

            {/* Quick Contact & Address details */}
            <div className="space-y-2 pt-3 border-t border-[#F0ECE4] text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>{userProfile.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                <span>{userProfile.city}, {userProfile.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span>Предпочтительный размер: <strong>{userProfile.preferredSize}</strong></span>
              </div>
            </div>

            {/* Edit form */}
            {isEditingProfile && (
              <form onSubmit={handleSaveProfile} className="mt-4 pt-4 border-t border-[#F0ECE4] space-y-3">
                <div>
                  <label className="text-[11px] text-gray-500 block">ФИО</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-[#DDD8CF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block">Телефон</label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-[#DDD8CF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block">Город</label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-[#DDD8CF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block">Адрес доставки</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-[#DDD8CF]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 block">Размер одежды</label>
                  <input
                    type="text"
                    value={editSize}
                    onChange={(e) => setEditSize(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-[#DDD8CF]"
                  />
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#1C2024] text-white text-xs font-semibold rounded"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs rounded"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden shadow-xs divide-y divide-[#F0ECE4]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#FAF9F6] text-[#1C2024] font-semibold border-l-4 border-[#1C2024]'
                  : 'text-gray-600 hover:bg-[#FAF9F6]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#8C7B65]" />
                <span>Мои заказы и примерки</span>
              </div>
              <span className="bg-[#EFECE6] text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'wishlist'
                  ? 'bg-[#FAF9F6] text-[#1C2024] font-semibold border-l-4 border-[#1C2024]'
                  : 'text-gray-600 hover:bg-[#FAF9F6]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className="w-4 h-4 text-[#8C7B65]" />
                <span>Список желаний (Избранное)</span>
              </div>
              <span className="bg-[#EFECE6] text-gray-700 text-xs px-2 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            </button>
          </div>

          {/* Boutique Service Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#1E2328] to-[#2E363E] text-white space-y-2">
            <span className="text-[10px] text-[#C5A880] uppercase tracking-widest font-mono">Консьерж-сервис Алматы</span>
            <h4 className="font-serif text-sm font-semibold">Индивидуальный пошив Bespoke</h4>
            <p className="text-xs text-slate-300 font-light">
              Хотите костюм по индивидуальным меркам? Мастер снимет 32 мерки в нашем бутике на пр. Достык или в вашем офисе.
            </p>
            <button
              onClick={() => showToast('Заявка на Bespoke визит передана старшему портному в Алматы', 'success')}
              className="mt-2 text-xs text-[#E5D5C0] font-semibold underline underline-offset-4 hover:text-white"
            >
              Записаться к портному →
            </button>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-8">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Order status filters */}
              <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      orderFilter === 'all'
                        ? 'bg-[#1C2024] text-white'
                        : 'bg-[#FAF9F6] text-gray-600 hover:bg-[#EFECE6]'
                    }`}
                  >
                    Все ({orders.length})
                  </button>
                  <button
                    onClick={() => setOrderFilter('active')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      orderFilter === 'active'
                        ? 'bg-[#1C2024] text-white'
                        : 'bg-[#FAF9F6] text-gray-600 hover:bg-[#EFECE6]'
                    }`}
                  >
                    Активные ({orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled').length})
                  </button>
                  <button
                    onClick={() => setOrderFilter('completed')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      orderFilter === 'completed'
                        ? 'bg-[#1C2024] text-white'
                        : 'bg-[#FAF9F6] text-gray-600 hover:bg-[#EFECE6]'
                    }`}
                  >
                    Завершенные ({orders.filter((o) => o.status === 'delivered' || o.status === 'cancelled').length})
                  </button>
                </div>
              </div>

              {/* Orders List */}
              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#EAE6DF] p-12 text-center space-y-3">
                  <Package className="w-10 h-10 text-gray-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-serif text-lg font-semibold text-gray-800">Заказы не найдены</h3>
                  <p className="text-xs text-gray-500">В этой категории пока нет заказов</p>
                  <button
                    onClick={() => setActiveView('catalog')}
                    className="px-5 py-2 rounded-full bg-[#1C2024] text-white text-xs font-semibold"
                  >
                    В каталог
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    const StatusIcon = statusInfo.icon;
                    const canCancel = order.status === 'created' || order.status === 'processing';

                    return (
                      <div
                        key={order.id}
                        id={`order-card-${order.id}`}
                        className="bg-white rounded-2xl border border-[#EAE6DF] overflow-hidden shadow-xs hover:border-[#8C7B65]/40 transition-all"
                      >
                        {/* Order Header */}
                        <div className="p-4 sm:p-5 bg-[#FAF9F6] border-b border-[#EAE6DF] flex flex-wrap items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif text-base sm:text-lg font-bold text-[#1C2024]">
                                Заказ #{order.orderNumber}
                              </span>
                              <span className="text-xs text-gray-500">от {order.date}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Трек-код: <strong className="font-mono text-gray-700">{order.trackingCode}</strong>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}
                            >
                              <StatusIcon className="w-3.5 h-3.5" />
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="p-4 sm:p-5 divide-y divide-[#F0ECE4]">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-16 rounded-lg overflow-hidden bg-[#F3EFE9] shrink-0 border border-[#E8E4DD]">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover object-top"
                                  />
                                </div>
                                <div>
                                  <h4 className="text-xs sm:text-sm font-semibold text-[#1C2024] line-clamp-1">
                                    {item.title}
                                  </h4>
                                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                    <span>Размер: <strong>{item.size}</strong></span>
                                    <span>Цвет: <strong>{item.colorName}</strong></span>
                                    <span>{item.quantity} шт.</span>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="text-sm font-bold text-[#1C2024]">
                                  {formatTenge(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer & Actions */}
                        <div className="p-4 sm:p-5 bg-[#FAF9F6]/50 border-t border-[#EAE6DF] flex flex-wrap items-center justify-between gap-4 text-xs">
                          <div className="space-y-1">
                            <div className="text-gray-500">
                              Доставка: <strong>{order.deliveryAddress}</strong>
                            </div>
                            <div className="text-gray-500">
                              Итого с примеркой: <strong className="text-sm text-[#1C2024] font-serif">{formatTenge(order.total)}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Electronic receipt button */}
                            <button
                              onClick={() => setSelectedReceiptOrder(order)}
                              className="px-3 py-1.5 rounded-lg border border-[#DDD8CF] bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors flex items-center gap-1.5"
                            >
                              <FileText className="w-3.5 h-3.5 text-gray-500" />
                              Чек и квитанция
                            </button>

                            {/* Cancel Order Action */}
                            {canCancel && (
                              <button
                                onClick={() => {
                                  if (confirm(`Вы уверены, что хотите отменить заказ #${order.orderNumber}?`)) {
                                    cancelOrder(order.id);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium transition-colors"
                              >
                                Отменить заказ
                              </button>
                            )}

                            {/* Fit or return request */}
                            {order.status === 'delivered' && (
                              <button
                                onClick={() => showToast('Запрос на вызов портного для подгонки принят. Менеджер свяжется с вами.', 'success')}
                                className="px-3 py-1.5 rounded-lg bg-[#1C2024] text-white hover:bg-black font-medium transition-colors"
                              >
                                Заказать подгонку
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#1C2024]">
                  Избранные модели ({wishlistProducts.length})
                </h3>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#EAE6DF] p-12 text-center space-y-3">
                  <Heart className="w-10 h-10 text-gray-400 mx-auto stroke-[1.5]" />
                  <h3 className="font-serif text-lg font-semibold text-gray-800">Список желаний пуст</h3>
                  <p className="text-xs text-gray-500">Нажимайте на сердечко у понравившихся моделей в каталоге</p>
                  <button
                    onClick={() => setActiveView('catalog')}
                    className="px-5 py-2 rounded-full bg-[#1C2024] text-white text-xs font-semibold"
                  >
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl border border-[#EAE6DF] p-4 flex gap-3 shadow-xs">
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-[#F3EFE9] shrink-0 border border-[#E8E4DD]">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-xs sm:text-sm text-[#1C2024] line-clamp-1">{p.title}</h4>
                          <span className="text-[11px] text-gray-500 block mt-0.5">{p.fabric.split('(')[0]}</span>
                          <span className="text-sm font-bold text-[#1C2024] block mt-1">{formatTenge(p.price)}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => addToCart(p)}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-[#1C2024] text-white text-xs font-semibold hover:bg-black transition-colors flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            В корзину
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-red-500"
                            title="Удалить"
                          >
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Electronic Receipt / Invoice Modal */}
      {selectedReceiptOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedReceiptOrder(null)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#EAE6DF] space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-gray-200 pb-4">
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-[#1C2024]">
                  МУЖСКОЙ ДОМ «МОСКВА»
                </span>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">
                  Электронная квитанция бутика • {selectedReceiptOrder.orderNumber}
                </p>
              </div>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 text-gray-600">
                <div>
                  <span className="text-gray-400 block">Заказчик:</span>
                  <span className="font-semibold text-gray-900">{selectedReceiptOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Дата оформления:</span>
                  <span className="font-semibold text-gray-900">{selectedReceiptOrder.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Телефон:</span>
                  <span>{selectedReceiptOrder.customerPhone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Оплата:</span>
                  <span>{selectedReceiptOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF9F6] text-[11px] text-gray-500 uppercase">
                    <tr>
                      <th className="p-2.5">Наименование</th>
                      <th className="p-2.5">Размер</th>
                      <th className="p-2.5 text-right">Сумма</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {selectedReceiptOrder.items.map((it: any, i: number) => (
                      <tr key={i}>
                        <td className="p-2.5 font-medium">{it.title}</td>
                        <td className="p-2.5 text-gray-500">{it.size}</td>
                        <td className="p-2.5 text-right font-semibold">{formatTenge(it.price * it.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-1 pt-2 text-right">
                <div className="flex justify-between text-gray-500">
                  <span>Сумма без скидки:</span>
                  <span>{formatTenge(selectedReceiptOrder.subtotal)}</span>
                </div>
                {selectedReceiptOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Скидка по программе лояльности:</span>
                    <span>-{formatTenge(selectedReceiptOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t">
                  <span>Итого к оплате:</span>
                  <span className="font-serif">{formatTenge(selectedReceiptOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 rounded-lg bg-[#1C2024] text-white text-xs font-semibold hover:bg-black"
              >
                Распечатать квитанцию
              </button>
              <button
                onClick={() => setSelectedReceiptOrder(null)}
                className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-xs font-semibold"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
