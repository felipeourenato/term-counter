import { Header } from './components/Header';
import styles from './App.module.css';
import './global.css';
import { TermsList } from './components/TermsList';
import { SourceText } from './components/SourceText';
import { ResultTable } from './components/ResultTable';

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <div className={styles.forms}>
          <TermsList />
          <SourceText />
        </div>
        <ResultTable />
      </div>
    </div>
  );
}
