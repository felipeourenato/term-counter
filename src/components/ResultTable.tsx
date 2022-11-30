import Markdown from 'markdown-to-jsx';
import { useContext, useEffect, useState } from 'react';
import { TEMPLATE_REGEX } from '../constants';
import { TermContext } from '../context';

function SelectedTermRender({ value }: { value: string }) {
  return <strong>vasco</strong>;
}

export function ResultTable() {
  const { selectedTermsIds, template, templateDictionary } =
    useContext(TermContext);

  const [resultText, setResultText] = useState('');

  useEffect(() => {
    console.log({ templateDictionary, selectedTermsIds });
    if (!templateDictionary || !selectedTermsIds) return;

    let textValue = template ?? '';
    const matches = [...textValue.matchAll(TEMPLATE_REGEX)];
    console.log(matches.length);

    matches.forEach((match) => {
      const [key] = match;
      if (!selectedTermsIds.includes(key)) {
        textValue = textValue.replace(key, templateDictionary.get(key)!);
        setResultText(textValue);
        return;
      }
      const newTextValue = textValue.replace(
        key,
        `<SelectedTermRender value="${templateDictionary.get(key)}" />`
      );
      setResultText(newTextValue);
    });
  }, [selectedTermsIds]);

  return (
    <Markdown
      options={{
        overrides: {
          SelectedTermRender,
        },
      }}
    >
      {resultText}
    </Markdown>
  );
}
