'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyState } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setExchangeCurrency = useCurrencyState((state) => state.setExchangeCurrency);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const value = event.target.elements.currency.value;
    const [amount, from, , to] = value.split(' ');
    const data = await exchangeCurrency({ amount, from, to });
    setExchangeCurrency(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
