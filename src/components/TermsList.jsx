import { useState } from 'react';
import { Plus } from 'phosphor-react';

import { Term } from './Term';

import styles from './TermsList.module.css';

export function TermsList() {
  const [terms, setTerms] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function handleTermSubmit(e) {
    e.preventDefault();
    if (!inputValue) return;

    if (terms?.map((t) => t.toLowerCase).includes(inputValue.toLowerCase)) {
      alert('Termo já adicionado à lista');
      return;
    }

    setTerms([...terms, inputValue]);
    setInputValue('');
  }

  function handleOnExclude(term) {
    setTerms(terms.filter((t) => t !== term));
  }

  return (
    <div className={styles.termsList}>
      <strong>Terms List</strong>

      <div className={styles.termsContainer}>
        <form type="submit" onSubmit={handleTermSubmit}>
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Insira um termo aqui"
          />
          <button type="submit">
            <Plus size={20} weight="bold" />
          </button>
        </form>
        <div className={styles.termsView}>
          {terms?.map((t) => (
            <Term term={t} onExclude={handleOnExclude} />
          ))}
        </div>
      </div>
    </div>
  );
}
