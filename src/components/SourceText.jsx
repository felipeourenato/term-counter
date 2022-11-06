import { PencilLine } from 'phosphor-react';
import styles from './SourceText.module.css';

export function SourceText() {
  return (
    <div className={styles.sourceText}>
      <a className={styles.sourceTitle} href="">
        <PencilLine size={20} />
        <strong>Text 1</strong>
      </a>

      <div className={styles.sourceContainer}>
        <form>
          <textarea placeholder="Adicione o texto fonte" />

          <button>Buscar termos</button>
        </form>
      </div>
    </div>
  );
}
