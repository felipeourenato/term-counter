import { Trash } from 'phosphor-react';

import styles from './Term.module.css';

interface TermProps {
  term: string;
  onExclude: (v: string) => void;
}

export function Term({ term, onExclude }: TermProps) {
  function handleOnExclude() {
    onExclude(term);
  }
  return (
    <div className={styles.term}>
      {term}

      <a onClick={handleOnExclude}>
        <Trash size={24} />
      </a>
    </div>
  );
}
