import { useState, ChangeEvent, useContext } from 'react';

import { SourceTextTitle } from './SourceTextTitle';

import styles from './SourceText.module.css';
import { ResultTable } from './ResultTable';
import { TermContext } from '../context';

export interface SourceText {
  title: string;
  text: string;
}

export function SourceText() {
  const { source, editSource } = useContext(TermContext);

  const [isEditing, setIsEditing] = useState(true);
  const [textTitle, setTextTitle] = useState('Text');

  function handleSourceTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    editSource(e.target.value);
  }

  function handleChangeTitle(t: string) {
    setTextTitle(t);
  }

  function handleSourceTextSubmit() {
    setIsEditing(false);
  }

  return (
    <div className={styles.sourceText}>
      <SourceTextTitle value={textTitle} onChange={handleChangeTitle} />
      {isEditing ? (
        <div className={styles.sourceContainer}>
          <form>
            <textarea
              value={source}
              onChange={handleSourceTextChange}
              placeholder="Adicione o texto fonte"
            />
          </form>
          <button onClick={handleSourceTextSubmit}>Show</button>
        </div>
      ) : (
        <div>
          <ResultTable />
          <button onClick={() => setIsEditing(true)}>Editar</button>
        </div>
      )}
    </div>
  );
}
