import { X } from 'phosphor-react';
import { MouseEvent } from 'react';

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
      <div className={styles.excludeButton} onClick={handleOnExclude}>
        <X weight="bold" size={16} />
      </div>
      <div className={styles.content} onClick={handleOnClick}>
        <div className={styles.termValue}>{term}</div>
        <div className={styles.termQuantity}>{quantity}</div>
      </div>
    </div>
  );
}
