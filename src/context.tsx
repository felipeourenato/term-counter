import { createContext, useState, ComponentProps } from 'react';

interface ITermContext {
  selectedTermsTemplates: string[];
  setSelectedTermsTemplates?: (values: string[]) => void;
}

export const TermContext = createContext<ITermContext>({
  selectedTermsTemplates: [],
});

export function TermContextProvider({ children }: { children: JSX.Element }) {
  const [selectedTermsTemplates, setSelectedTermsTemplates] = useState<
    string[]
  >([]);

  return (
    <TermContext.Provider
      value={{ selectedTermsTemplates, setSelectedTermsTemplates }}
      children={children}
    />
  );
}
