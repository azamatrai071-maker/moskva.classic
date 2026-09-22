import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toasts } = useStore();

  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl text-sm border backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-[#1E1E1E]/95 text-red-300 border-red-900/50'
                : toast.type === 'info'
                ? 'bg-[#1E252B]/95 text-blue-200 border-blue-900/50'
                : 'bg-[#1A1F1D]/95 text-[#E6D5B8] border-[#C5A880]/30'
            }`}
          >
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-300 shrink-0" />}
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C5A880] shrink-0" />}
            <span className="font-medium text-slate-100">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
