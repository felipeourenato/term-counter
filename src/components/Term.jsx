import { Trash } from 'phosphor-react';

import styles from './Term.module.css';

export function Term({ term, onExclude }) {
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
