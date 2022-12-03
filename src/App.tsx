import { Header } from './components/Header';
import { TermsList } from './components/TermsList';
import { SourceText } from './components/SourceText';

import styles from './App.module.css';

import './global.css';
import { TermContextProvider } from './context';

export function App() {
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
