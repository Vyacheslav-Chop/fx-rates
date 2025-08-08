'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyState } from '@/lib/stores/currencyStore';
import { useState } from 'react';
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

export default function ExchangeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const setExchangeCurrency = useCurrencyState((state) => state.setExchangeCurrency);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const value = formData.get('currency') as string;
    const [amount, from, , to] = value.split(' ');
    try {
      const data = await exchangeCurrency({ amount, from, to });
      setExchangeCurrency(data);
    } catch {
      toast.error('Something went wrong. Please, try again.')
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form className={styles.form} action={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
