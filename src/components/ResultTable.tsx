import Markdown from 'markdown-to-jsx';
import { TEMPLATE_REGEX } from '../constants';
import styles from './ResultTable.module.css';

function SelectedTermRender({ value }: { value: string }) {
  return <strong>{value}</strong>;
}

export function ResultTable({
  template,
  templateMap,
  selecteds = [],
}: {
  template: string[];
  templateMap: Map<string, string>;
  selecteds: string[];
}) {
  let textValue = template.join('\n');
  const matches = [...textValue.matchAll(TEMPLATE_REGEX)];
  matches.forEach((match) => {
    const [key] = match;
    if (!selecteds.includes(key)) {
      textValue = textValue.replace(key, templateMap.get(key)!);
      return;
    }
    textValue = textValue.replace(
      key,
      `<SelectedTermRender value="${templateMap.get(key)}" />`
    );
  });

  return (
    <Markdown
      options={{
        overrides: {
          SelectedTermRender,
        },
      }}
    >
      {textValue}
    </Markdown>
  );
}
