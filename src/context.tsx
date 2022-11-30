import { createContext, useState, ComponentProps, useEffect } from 'react';
import { DEFAULT_TERMS, DEFAULT_TEXT } from './constants';
import { CountingTermsResult, start, TermMap } from './logic';

interface ITermContext {
  source?: string;
  templateDictionary?: Map<string, string>;
  foundTermsMap?: TermMap;
  terms?: string[];
  selectedTermsIds?: string[];
  template?: string;
  highlightTerm: (value: string) => void;
  editSource: (value: string) => void;
  addTerm: (value: string) => void;
  excludeTerm: (value: string) => void;
}

export const TermContext = createContext<ITermContext>({
  highlightTerm: (value: string) => {},
  editSource: (value: string) => {},
  addTerm: (value: string) => {},
  excludeTerm: (value: string) => {},
});

export function TermContextProvider({ children }: { children: JSX.Element }) {
  const [selectedTermsIds, setSelectedTermsIds] = useState<string[]>([]);
  const [source, setSource] = useState<string>(DEFAULT_TEXT);
  const [terms, setTerms] = useState<string[]>(DEFAULT_TERMS);
  const [countingTermsResult, setCountingTermsResult] =
    useState<CountingTermsResult>();
  const [selectedTerm, setSelectedTerm] = useState<string>(DEFAULT_TERMS[0]);

  const highlightTerm = (value: string) => {
    if (!value || !countingTermsResult) return;
    const { foundTermsMap } = countingTermsResult;

    if (!foundTermsMap?.has(value)) return;
    setSelectedTerm(value);
    setSelectedTermsIds([...foundTermsMap.get(value)!.map((res) => res.id)]);
  };

  const editSource = (value: string) => {
    setSource(value);
  };

  const addTerm = (value: string) => {
    if (!value) return;

    const lowerCaseTerm = value.toLowerCase();
    setTerms([lowerCaseTerm, ...terms]);
  };

  const excludeTerm = (value: string) => {
    if (!value) return;
    const lowerCaseTerm = value.toLowerCase();

    if (!terms.includes(lowerCaseTerm)) return;
    const filteredList = terms.filter((t) => t !== lowerCaseTerm);
    setTerms([...filteredList]);
  };

  useEffect(() => {
    if (!source || !terms) {
      return;
    }
    const result = start(source, terms);
    setCountingTermsResult(result);
  }, [source, terms]);

  useEffect(() => {
    if (!countingTermsResult || !selectedTerm) return;
    highlightTerm(selectedTerm);
  }, [countingTermsResult]);

  return (
    <TermContext.Provider
      value={{
        source,
        terms,
        selectedTermsIds,
        template: countingTermsResult?.template,
        templateDictionary: countingTermsResult?.templateDictionary,
        foundTermsMap: countingTermsResult?.foundTermsMap,
        highlightTerm,
        editSource,
        addTerm,
        excludeTerm,
      }}
      children={children}
    />
  );
}
