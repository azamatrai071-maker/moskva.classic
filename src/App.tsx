import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { CatalogView } from './components/CatalogView';
import { PersonalCabinet } from './components/PersonalCabinet';
import { AdminPanel } from './components/AdminPanel';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';

const AppContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1C2024]">
      {/* Global Header & Nav */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeView === 'catalog' && <CatalogView />}
        {activeView === 'cabinet' && <PersonalCabinet />}
        {activeView === 'admin' && <AdminPanel />}
      </main>

      {/* Modals & Overlays */}
      <CartDrawer />
      <ProductDetailModal />
      <CheckoutModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
