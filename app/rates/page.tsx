'use client';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useCurrencyState } from '@/lib/stores/currencyStore';
import RatesList from '@/components/RatesList/RatesList';
import { useEffect } from 'react';

export default function RatesPage() {
  const baseCurrency = useCurrencyState((state) => state.baseCurrency);
  const fetchRates = useCurrencyState((state) => state.fetchRates);
  const rates = useCurrencyState((state) => state.rates);
  const isError = false;

  useEffect(() => {
    fetchRates();
  }, [baseCurrency, fetchRates]);

  const filteredRates = rates
    .filter(([key]) => key !== baseCurrency)
    .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading info bottom title={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`} />

          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
