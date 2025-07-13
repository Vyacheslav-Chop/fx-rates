'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';

import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import { useCurrencyState } from '@/lib/stores/currencyStore';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';

export default function Home() {
  const isError = false;
  const exchangeInfo = useCurrencyState((state) => state.exchangeInfo);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <ExchangeForm />
          {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
          {!exchangeInfo && !isError && (
            <Heading info title="What currencies do you want to exchange?🙂" />
          )}

          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
