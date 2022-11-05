import React, { useEffect, useMemo, useState } from 'react';
import Bar from './Bar';
import raw from './data.json';

import styles from './styles.module.scss';

interface ExpenseData {
  expenses: { day: string; amount: number }[];
  balance: number;
  monthTotal: number;
  increment: number;
}

function App() {
  const [{ expenses, balance, monthTotal, increment }] = useState<ExpenseData>(raw);

  const max = useMemo(() => Math.max(...expenses.map((each) => each.amount)), [expenses]);

  useEffect(() => {
    const resize = () =>
      document.documentElement.style.setProperty('--height', window.innerHeight + 'px');

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className={styles.App}>
      <div className={styles.container}>
        <section className={styles.header}>
          <span>My balance</span>
          <h1>${balance}</h1>
        </section>

        <main>
          <section className={styles.top}>
            <h1>Spending - Last 7 days</h1>

            <div className={styles.chart}>
              {expenses.map((item, index) => (
                <Bar key={index} {...item} max={max} />
              ))}
            </div>
          </section>

          <div className={styles.divider}></div>
          <section className={styles.bottom}>
            <div className={styles.left}>
              <span>Total this month</span>
              <h1>${monthTotal}</h1>
            </div>
            <div className={styles.right}>
              <strong>{increment >= 0 ? `+${increment}%` : `${increment}%`}</strong>
              <span>from last month</span>
            </div>
          </section>
        </main>
      </div>

      <footer className={styles.footer}>
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a href="https://github.com/rylanzhou" target="_blank" rel="noreferrer">
          Rylan Zhou
        </a>
        .
      </footer>
    </div>
  );
}

export default App;
