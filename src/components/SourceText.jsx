import { useState } from 'react';

import { DEFAULT_TEXT } from '../constants';
import { SourceTextTitle } from './SourceTextTitle';

import styles from './SourceText.module.css';

export function SourceText({ initialSourceText, onChange, onStart }) {
  const { title: initialTitle, text: initialText } = initialSourceText;
  const [textTitle, setTextTitle] = useState(initialTitle);
  const [sourceText, setSourceText] = useState(initialText);

  function handleSourceTextChange(e) {
    setSourceText(e.target.value);
    onChange({ title: textTitle, text: e.target.value });
  }

  function handleStartClick(e) {
    e.preventDefault();
    onStart({ textTitle, sourceText });
  }

  function handleChangeTitle(t) {
    setTextTitle(t);
    onChange({ title: t, text: sourceText });
  }

  return (
    <div className={styles.sourceText}>
      <SourceTextTitle value={textTitle} onChange={handleChangeTitle} />

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
