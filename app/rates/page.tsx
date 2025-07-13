'use client';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';

export default function RatesPage() {
  const isError = false;

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading info bottom title={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`} />

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
        </Container>
      </Section>
    </main>
  );
}
