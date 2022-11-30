export type TermResult = {
  value: string;
  id: string;
};

export type TermMap = Map<string, TermResult[]>;

export type CountingTermsResult = {
  foundTermsMap: TermMap;
  template: string;
  templateDictionary: Map<string, string>;
};

function hasAtLeatOneSearchedTerm(text: string, terms: TermMap): boolean {
  const textWithoutSpecials = text.replace(/[^a-zA-Z0-9 ]/g, '');
  const words = textWithoutSpecials.split(' ');

  return words.some((w) => terms.has(w.toLowerCase()));
}

export function start(
  sourceText: string,
  termsList: string[]
): CountingTermsResult {
  const foundTermsMap: TermMap = new Map<string, TermResult[]>(
    termsList.map((t) => [t, []])
  );

  const templateDictionary = new Map<string, string>();

  const paragraphBatches: string[] = [];

  const paragraphs = sourceText.split('\n');

  paragraphs
    .filter((para) => !!para)
    .forEach((paragraph, paIdx) => {
      const phrases = paragraph.split('.');

      if (!hasAtLeatOneSearchedTerm(paragraph, foundTermsMap)) {
        paragraphBatches.push(paragraph);
        return;
      }

      const phraseBatches: string[] = [];
      phrases
        .filter((phra) => !!phra)
        .forEach((phrase, phIdx) => {
          if (!hasAtLeatOneSearchedTerm(phrase, foundTermsMap)) {
            phraseBatches.push(phrase);
            return;
          }

          const words = phrase.split(' ');
          let newPhrase = phrase;

          const foundWords = words.filter((w) =>
            foundTermsMap.has(w.toLowerCase())
          );

          foundWords.forEach((fw, id) => {
            const lCaseWord = fw.toLowerCase();
            const results = foundTermsMap.get(lCaseWord)!;
            const wId = `{{${paIdx}-${phIdx}-${id}}}`;

            foundTermsMap.set(lCaseWord, [...results, { value: fw, id: wId }]);

            newPhrase = newPhrase.replace(fw, wId);
            templateDictionary.set(wId, fw);
            phraseBatches.push(newPhrase);
          });
        });

      const newParagraph = phraseBatches.join('.');
      paragraphBatches.push(newParagraph);
    });

  const template = paragraphBatches.join('\n');

  return {
    foundTermsMap,
    template,
    templateDictionary,
  };
}
