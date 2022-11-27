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

  function handleOnStart() {
    const { result, template, templateMap } = start(sourceText.text);
    setTempl(template);
    setTemplMap(templateMap);
    console.log({ result });
  }

  return (
    <div>
      <Header />

      <TermContextProvider>
        <div className={styles.wrapper}>
          <div className={styles.forms}>
            <TermsList initialTerms={terms} onChange={setTerms} />
            <SourceText
              initialSourceText={sourceText}
              onChange={setSourceText}
              onStart={handleOnStart}
              resultTemplate={templ}
              templateMap={templMap!}
            />
          </div>
          {/* <ResultTable template={templ} /> */}
        </div>
      </TermContextProvider>
    </div>
  );
}
