/**
 * Formatting utilities for Kazakhstan Tenge (₸) currency and numbers
 */

export const formatTenge = (amount: number): string => {
  if (isNaN(amount)) return '0 ₸';
  return `${Math.round(amount).toLocaleString('ru-RU')} ₸`;
};
