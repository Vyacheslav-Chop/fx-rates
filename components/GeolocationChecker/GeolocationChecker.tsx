'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';
import { useCurrencyState } from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const setBaseCurrency = useCurrencyState((state) => state.setBaseCurrency);
  const baseCurrency = useCurrencyState((state) => state.baseCurrency);
  const hasRehydrate = useCurrencyState((state) => state.hasRehydrate);

  useEffect(() => {
    if (!hasRehydrate || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);
      setBaseCurrency(data.results[0].annotations.currency.iso_code);
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [baseCurrency, setBaseCurrency, hasRehydrate]);

  return null;
}
