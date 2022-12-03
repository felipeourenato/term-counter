import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { Term } from './Term';

import styles from './TermsList.module.css';
import { TermContext } from '../context';

export function TermsList() {
  const {
    terms,
    addTerm,
    excludeTerm,
    highlightTerm,
    foundTermsMap,
    selectedTerm,
  } = useContext(TermContext);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleTermSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputValue) return;

    if (terms?.map((t) => t.toLowerCase()).includes(inputValue.toLowerCase())) {
      alert('Termo já adicionado à lista');
      return;
    }

    addTerm(inputValue);
    setInputValue('');
  }

  function handleOnExclude(term: string) {
    excludeTerm(term);
  }

  function handleTermClick(term: string) {
    highlightTerm(term);
  }

  function renderTerms() {
    if (!foundTermsMap) return;
    const foundTerms = [...foundTermsMap.keys()];

    return (
      <>
        {foundTerms.map((ft) => (
          <Term
            key={ft}
            term={ft}
            quantity={foundTermsMap.get(ft)!.length}
            onClick={handleTermClick}
            onExclude={handleOnExclude}
            isSelected={ft === selectedTerm}
          />
        ))}
      </>
    );
  }

  return (
    <div className={styles.termsList}>
      <form onSubmit={handleTermSubmit}>
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Insira um termo aqui"
        />
      </form>

      <div className={styles.termsView}>{renderTerms()}</div>
    </div>
  );
}
