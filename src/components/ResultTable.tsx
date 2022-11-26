import { TEMPLATE_REGEX } from '../constants';
import styles from './ResultTable.module.css';

export function ResultTable({ template }: { template: string[] }) {
  return (
    <div className={styles.wrapper}>
      {template.map((tpl) => {
        const matches = [...tpl.matchAll(TEMPLATE_REGEX)];
        if (matches) {
          let arr = [];

          matches.forEach((mat) => {
            const [um, dois, tres] = mat;
            const { input, index } = mat;
            console.log({ um, dois, tres, input, index });
            const prefix = input!.substring(0, index!);
            const sufix = input!.substring(index! + um.length);
            arr = [...arr, prefix, <text>{um}</text>, sufix];
          });

          return <>{arr.map((item) => item)}</>;
        }
        return tpl;
      })}
    </div>
  );
}
