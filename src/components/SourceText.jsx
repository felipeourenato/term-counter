import { useState } from 'react';
import styles from './SourceText.module.css';
import { SourceTextTitle } from './SourceTextTitle';

export function SourceText({ onStart }) {
  const [textTitle, setTextTitle] = useState('');
  const [sourceText, setSourceText] = useState();

  function handleSourceTextChange(e) {
    setSourceText(e.target.value);
  }

  function handleStartClick() {
    onStart({ textTitle, sourceText });
  }

  return (
    <div className={styles.sourceText}>
      <SourceTextTitle value={textTitle} onChange={setTextTitle} />

      <div className={styles.sourceContainer}>
        <form>
          <textarea
            value={sourceText}
            onChange={handleSourceTextChange}
            placeholder="Adicione o texto fonte"
          />

          <button onClick={handleStartClick}>Buscar termos</button>
        </form>
      </div>
    </div>
  );
}
