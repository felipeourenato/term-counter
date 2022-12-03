import Markdown from 'markdown-to-jsx';
import { useContext, useEffect, useState } from 'react';
import { TEMPLATE_REGEX } from '../constants';
import { TermContext } from '../context';

import styles from './ResultTable.module.css';

function FoundTermRender({
  value,
  isSelected,
}: {
  value: string;
  isSelected: boolean;
}) {
  return isSelected ? (
    <strong className={styles.selectedTerm}>{value}</strong>
  ) : (
    <text>{value}</text>
  );
}

function Paragraph() {
  return (
    <>
      <br />
      <br />
    </>
  );
}

function buildText(
  template: string,
  selectedTermsIds: string[],
  templateDictionary: Map<string, string>
): string {
  let textValue = template;
  const matches = [...textValue.matchAll(TEMPLATE_REGEX)];

  if (!matches) {
    return textValue;
  }

  matches.forEach((match) => {
    const [key] = match;
    const isSelected = selectedTermsIds.includes(key);

    const newTextValue = textValue.replace(
      key,
      `<FoundTermRender value="${templateDictionary.get(
        key
      )}" isSelected={${isSelected}} />`
    );
    textValue = newTextValue;
  });
  return textValue;
}

export function ResultTable() {
  const { selectedTermsIds, template, templateDictionary } =
    useContext(TermContext);

  const [resultText, setResultText] = useState('');

  useEffect(() => {
    if (!templateDictionary || !selectedTermsIds || !template) return;

    const newTextValue = buildText(
      template,
      selectedTermsIds,
      templateDictionary
    );
    setResultText(newTextValue);
  }, [selectedTermsIds, templateDictionary, template]);

  return (
    <Markdown
      options={{
        overrides: {
          FoundTermRender,
          Paragraph,
        },
      }}
    >
      {resultText}
    </Markdown>
  );
}
