import { useState, SyntheticEvent, ChangeEvent, FormEvent } from 'react';

import { SourceTextTitle } from './SourceTextTitle';

import styles from './SourceText.module.css';

export interface SourceText {
  title: string;
  text: string;
}

interface SourceTextProps {
  initialSourceText: SourceText;
  onChange: (v: SourceText) => void;
  onStart: (v: SourceText) => void;
}

export function SourceText({
  initialSourceText,
  onChange,
  onStart,
}: SourceTextProps) {
  const { title: initialTitle, text: initialText } = initialSourceText;
  const [textTitle, setTextTitle] = useState(initialTitle);
  const [sourceText, setSourceText] = useState(initialText);

  function handleSourceTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setSourceText(e.target.value);
    onChange({ title: textTitle, text: e.target.value });
  }

  function handleStartClick(e: SyntheticEvent<HTMLButtonElement>) {
    e.preventDefault();
    onStart({ title: textTitle, text: sourceText });
  }

  function handleChangeTitle(t: string) {
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
