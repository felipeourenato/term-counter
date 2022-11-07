import { useState } from 'react';
import { PencilLine } from 'phosphor-react';

import styles from './SourceTextTitle.module.css';

const DEFAULT_TITLE = 'Text 1';

export function SourceTextTitle({ value, onChange }) {
  const [title, setTitle] = useState(value || DEFAULT_TITLE);

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  function handleOnChangeTextTitle(e) {
    setTitle(e.target.value);
  }

  function handleSubmitTextTitle() {
    const newTitle = title || DEFAULT_TITLE;
    setTitle(newTitle);
    onChange(newTitle);
    setIsEditingTitle(false);
  }

  return (
    <div className={styles.sourceTextTitle}>
      {isEditingTitle ? (
        <input
          autoFocus
          value={title}
          onChange={handleOnChangeTextTitle}
          onBlur={handleSubmitTextTitle}
        />
      ) : (
        <a onClick={(_) => setIsEditingTitle(true)}>
          <PencilLine size={20} />
          <strong>{title}</strong>
        </a>
      )}
    </div>
  );
}
