import styles from './ResultTable.module.css';

export function ResultTable() {
  return (
    <div className={styles.wrapper}>
      <strong>Text 1</strong>

      <div className={styles.resultTable}>
        <div className={styles.tableHeader}>
          <div className={styles.headerItem}>Term</div>
          <div className={styles.headerItem}>Quantity</div>
        </div>
        <div className={styles.tableRows}>
          <div className={styles.tableRow}>
            <div className={styles.rowItem}>a</div>
            <div className={styles.rowItem}>1</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.rowItem}>b</div>
            <div className={styles.rowItem}>3</div>
          </div>
          <div className={styles.tableRow}>
            <div className={styles.rowItem}>c</div>
            <div className={styles.rowItem}>15</div>
          </div>
        </div>
      </div>
    </div>
  );
}
