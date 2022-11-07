import { useState } from 'react';
import { PencilLine } from 'phosphor-react';

import styles from './SourceTextTitle.module.css';

export function SourceTextTitle({ value, onChange }) {
  const [title, setTitle] = useState(value);

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  function handleOnChangeTextTitle(e) {
    setTitle(e.target.value);
  }

  function handleSubmitTextTitle() {
    !title && setTitle(value);
    onChange(title);
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
