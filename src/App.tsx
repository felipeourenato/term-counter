import { Header } from './components/Header';
import { TermsList } from './components/TermsList';
import { SourceText } from './components/SourceText';
import { ResultTable } from './components/ResultTable';
import { DEFAULT_TERMS, DEFAULT_TEXT, DEFAULT_TITLE } from './constants';

import styles from './App.module.css';

import './global.css';
import { useState } from 'react';
import { start } from './logic';
import { TermContextProvider } from './context';

export function App() {
  const [terms, setTerms] = useState(DEFAULT_TERMS);
  const [templ, setTempl] = useState<string[]>([]);
  const [templMap, setTemplMap] = useState<Map<string, string>>();
  const [sourceText, setSourceText] = useState({
    title: DEFAULT_TITLE,
    text: DEFAULT_TEXT,
  });

  return (
    <div>
      <Header />

      <TermContextProvider>
        <div className={styles.wrapper}>
          <div className={styles.forms}>
            <TermsList />
            <SourceText />
          </div>
        </div>
      </TermContextProvider>
    </div>
  );
}
