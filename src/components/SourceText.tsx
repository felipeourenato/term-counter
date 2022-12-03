import { useState, ChangeEvent, useContext } from 'react';

import styles from './SourceText.module.css';
import { ResultTable } from './ResultTable';
import { TermContext } from '../context';
import { DEFAULT_TITLE } from '../constants';

export interface SourceText {
  title: string;
  text: string;
}

export function SourceText() {
  const { source, editSource } = useContext(TermContext);

  const [isEditing, setIsEditing] = useState(false);
  const [textTitle, setTextTitle] = useState(DEFAULT_TITLE);

  function handleSourceTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    editSource(e.target.value);
  }

  function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTextTitle(e.target.value);
  }

  function handleSourceTextSubmit() {
    setIsEditing(false);
  }

  return (
    <div className={styles.sourceText}>
      {isEditing ? (
        <form>
          <input value={textTitle} onChange={handleChangeTitle} />
          <textarea
            value={source}
            onChange={handleSourceTextChange}
            placeholder="Adicione o texto fonte"
          />
          <button
            className={styles.submitButton}
            onClick={handleSourceTextSubmit}
          >
            Salvar e calcular
          </button>
        </form>
      ) : (
        <div className={styles.result}>
          <div className={styles.resultContent}>
            <div className={styles.resultTitle}>{textTitle}</div>
            <ResultTable />
          </div>
          <button
            className={styles.editButton}
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
}
