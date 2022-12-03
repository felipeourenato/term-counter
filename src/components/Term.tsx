import { X } from 'phosphor-react';

import styles from './Term.module.css';

interface TermProps {
  term: string;
  isSelected?: boolean;
  quantity: number;
  onExclude: (v: string) => void;
  onClick: (v: string) => void;
}

export function Term({
  term,
  onExclude,
  onClick,
  quantity,
  isSelected,
}: TermProps) {
  function handleOnExclude() {
    onExclude(term);
  }

  function handleOnClick() {
    onClick(term);
  }
  return (
    <div className={isSelected ? styles.selectedTerm : styles.term}>
      <a className={styles.content} onClick={handleOnClick}>
        <a className={styles.exclude} onClick={handleOnExclude}>
          <X weight="bold" size={16} />
        </a>

        {term}

        <text>{quantity}</text>
      </a>
    </div>
  );
}
