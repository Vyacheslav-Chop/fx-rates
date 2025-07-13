import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// lib\stores\currencyStore.ts

interface ExchangeInfo {
  amount: number;
  from: string;
  rate: number;
  result: number;
  to: string;
}

type CurrencyState = {
  baseCurrency: string;
  hasRehydrate: boolean;
  exchangeInfo: ExchangeInfo | null;
  setBaseCurrency: (currency: string) => void;
  setHasRehydrate: (state: boolean) => void;
  setExchangeCurrency: (exchangeInfo: ExchangeInfo) => void;
};

export const useCurrencyState = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: '',
      hasRehydrate: false,
      exchangeInfo: null,
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasRehydrate: (state) => set({ hasRehydrate: state }),
      setExchangeCurrency: (exchangeInfo: ExchangeInfo) => set({ exchangeInfo }),
    }),
    {
      name: 'baseCurrency',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHasRehydrate(true);
      },
    }
  )
);
