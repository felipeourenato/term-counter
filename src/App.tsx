import { Header } from './components/Header';
import { TermsList } from './components/TermsList';
import { SourceText } from './components/SourceText';
import { ResultTable } from './components/ResultTable';
import { DEFAULT_TERMS, DEFAULT_TEXT, DEFAULT_TITLE } from './constants';

import styles from './App.module.css';

import './global.css';
import { useState } from 'react';
import { start } from './logic';

export function App() {
  const [terms, setTerms] = useState(DEFAULT_TERMS);
  const [templ, setTempl] = useState<string[]>([]);
  const [sourceText, setSourceText] = useState({
    title: DEFAULT_TITLE,
    text: DEFAULT_TEXT,
  });

  function handleOnStart() {
    const { result, template } = start(sourceText.text);
    setTempl(template);
    console.log({ result });
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.forms}>
          <TermsList initialTerms={terms} onChange={setTerms} />
          <SourceText
            initialSourceText={sourceText}
            onChange={setSourceText}
            onStart={handleOnStart}
          />
        </div>
        <ResultTable template={templ} />
      </div>
    </div>
  );
}
