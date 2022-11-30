import { Trash } from 'phosphor-react';

import styles from './Term.module.css';

interface TermProps {
  term: string;
  quantity: number;
  onExclude: (v: string) => void;
  onClick: (v: string) => void;
}

export function Term({ term, onExclude, onClick, quantity }: TermProps) {
  function handleOnExclude() {
    onExclude(term);
  }

  function handleOnClick() {
    onClick(term);
  }
  return (
    <a className={styles.term} onClick={handleOnClick}>
      <a onClick={handleOnExclude}>
        <Trash size={24} />
      </a>

      {term}

      <text>{quantity}</text>
    </a>
  );
}
