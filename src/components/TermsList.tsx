import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import { Term } from './Term';

import styles from './TermsList.module.css';
import { TermContext } from '../context';
import { TermMap } from '../logic';

function RenderTerms({
  terms,
  selectedTerm,
  handleTermClick,
  handleOnExclude,
}: {
  terms?: TermMap;
  selectedTerm: string;
  handleTermClick: (v: string) => void;
  handleOnExclude: (v: string) => void;
}) {
  const foundTerms = terms ? [...terms?.keys()] : [];

  return (
    <>
      {foundTerms.map((ft) => (
        <Term
          key={ft}
          term={ft}
          quantity={terms?.get(ft)!.length ?? 0}
          onClick={handleTermClick}
          onExclude={handleOnExclude}
          isSelected={ft === selectedTerm}
        />
      ))}
    </>
  );
}

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
  const [selected, setSelected] = useState<string>(selectedTerm || '');

  useEffect(() => {
    console.log(selectedTerm);
    selectedTerm && setSelected(selectedTerm);
  }, [selectedTerm]);

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
    console.log('selected?');
    highlightTerm(term);
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

      <div className={styles.termsView}>
        <RenderTerms
          terms={foundTermsMap}
          selectedTerm={selected}
          handleOnExclude={handleOnExclude}
          handleTermClick={handleTermClick}
        />
      </div>
    </div>
  );
}
