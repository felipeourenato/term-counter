import { Plus, Trash } from 'phosphor-react';

import styles from './TermsList.module.css';

export function TermsList() {
  return (
    <div className={styles.termsList}>
      <strong>Terms List</strong>

      <div className={styles.termsContainer}>
        <form>
          <input type="text" placeholder="Insira um termo aqui" />
          <button>
            <Plus size={20} weight="bold" />
          </button>
        </form>
        <div className={styles.termsView}>
          <div className={styles.term}>
            c
            <a href="#">
              <Trash size={24} />
            </a>
          </div>
          <div className={styles.term}>
            a
            <a href="#">
              <Trash size={24} />
            </a>
          </div>
          <div className={styles.term}>
            b
            <a href="#">
              <Trash size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
