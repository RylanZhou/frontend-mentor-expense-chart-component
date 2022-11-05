import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export default function Bar(props: { day: string; amount: number; max: number }) {
  const [height, setHeight] = useState('0');

  useEffect(() => {
    setTimeout(() => {
      setHeight(9 * (props.amount / props.max) + 'rem');
    }, 300);
  }, [props.amount, props.max]);

  return (
    <div className={styles.Bar}>
      <div className={styles.placeholder}></div>
      <div
        className={`${styles.bar} ${props.max === props.amount ? styles.max : ''}`}
        style={{ height }}
      >
        <div className={styles.label}>${props.amount}</div>
      </div>
      <span>{props.day}</span>
    </div>
  );
}
