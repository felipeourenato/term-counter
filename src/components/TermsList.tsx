import { ChangeEvent, FormEvent, useState } from 'react';
import { Plus } from 'phosphor-react';

import { Term } from './Term';

import styles from './TermsList.module.css';

interface TermsListProps {
  initialTerms: string[];
  onChange: (l: string[]) => void;
}

export function TermsList({ initialTerms, onChange }: TermsListProps) {
  const [terms, setTerms] = useState(initialTerms);
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

    const newTerms = [...terms, inputValue];
    setTerms(newTerms);
    onChange(newTerms);
    setInputValue('');
  }

  function handleOnExclude(term: string) {
    const newTerms = terms.filter((t) => t !== term);
    setTerms(newTerms);
    onChange(newTerms);
  }

  return (
    <div className={styles.termsList}>
      <strong>Terms List</strong>

      <div className={styles.termsContainer}>
        <form onSubmit={handleTermSubmit}>
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
            <Term key={t} term={t} onExclude={handleOnExclude} />
          ))}
        </div>
      </div>
    </div>
  );
}
