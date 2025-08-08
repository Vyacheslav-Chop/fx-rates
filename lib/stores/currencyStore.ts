import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { latestRates } from '../service/exchangeAPI';

// lib\stores\currencyStore.ts

interface ExchangeInfo {
  amount: number;
  from: string;
  rate: number;
  result: number;
  to: string;
}

type CurrencyState = {
  isLoading: boolean;
  isError: string | null;
  rates: [string, number][];
  baseCurrency: string;
  hasRehydrate: boolean;
  exchangeInfo: ExchangeInfo | null;
  setBaseCurrency: (currency: string) => void;
  setHasRehydrate: (state: boolean) => void;
  setExchangeCurrency: (exchangeInfo: ExchangeInfo) => void;
  fetchRates: () => Promise<void>;
};

export const useCurrencyState = create<CurrencyState>()(
  persist(
    (set, get) => ({
      baseCurrency: '',
      hasRehydrate: false,
      exchangeInfo: null,
      isLoading: false,
      isError: null,
      rates: [],
      setBaseCurrency: (currency) => set({ baseCurrency: currency }),
      setHasRehydrate: (state) => set({ hasRehydrate: state }),
      setExchangeCurrency: (exchangeInfo: ExchangeInfo) => set({ exchangeInfo }),
      fetchRates: async () => {
        const base = get().baseCurrency;
        if (!base) return;
        set({ isLoading: true, isError: null });
        try {
          const data = await latestRates(base);

          set({ rates: data, isLoading: false });
        } catch (error) {
          console.log(error);
          set({ isError: 'Failed to fetch rates', isLoading: false });
        }
      },
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
