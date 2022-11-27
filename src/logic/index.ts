/**

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum dui in libero elementum, venenatis pretium quam aliquet. Cras ut semper dui. Maecenas scelerisque auctor nibh. In vel mollis odio, vitae lobortis nibh. Nunc vulputate felis quis tincidunt sollicitudin. Aenean lobortis pharetra sodales. Sed consequat lacinia lectus. Praesent sit amet leo augue. Proin vulputate mauris id lacinia pretium. Aenean vitae lectus vitae libero varius blandit. 

"Lorem", "ipsum dolor sit", "amet", ", consectetur adipiscing elit. Suspendisse bibendum","dui","in libero elementum, venenatis pretium quam aliquet. Cras ut semper","dui",". Maecenas scelerisque auctor nibh. In vel mollis odio, vitae lobortis nibh. Nunc vulputate felis quis tincidunt sollicitudin. Aenean lobortis pharetra sodales. Sed consequat lacinia lectus. Praesent sit","amet"," leo augue. Proin vulputate mauris id lacinia pretium. Aenean vitae lectus vitae libero varius blandit."

"lorem": {"Lorem", 5, [{"Lorem", 0}]}

string: "Lorem impsum dolor sit amet"

string.algumaPalavraDaMatch ? busca a palavra e posição e adiciona no map
*/

type TermResult = {
  value: string;
  paragraphIndex: number;
  phraseIndex: number;
  posInPhrase: number;
};

type TermData = {
  value: string;
  len: number;
  results: TermResult[];
};

type TermMap = Map<string, TermData>;

function hasAtLeatOneSearchedTerm(text: string, terms: TermMap): boolean {
  const textWithoutSpecials = text.replace(/[^a-zA-Z0-9 ]/g, '');
  const words = textWithoutSpecials.split(' ');

  return words.some((w) => terms.has(w.toLocaleLowerCase()));
}

export function start(text: string) {
  const TERMS = new Map<string, TermData>([
    ['lorem', { value: 'Lorem', len: 5, results: [] }],
    ['amet', { value: 'amet', len: 4, results: [] }],
    ['dui', { value: 'dui', len: 3, results: [] }],
  ]);

  const TEMPLATE_MAP = new Map<string, string>();

  const TEXTBLOCK: string[] = [];

  const paragraphs = text.split('\n');

  paragraphs
    .filter((para) => !!para)
    .forEach((paragraph, paIdx) => {
      const phrases = paragraph.split('.');

      if (!hasAtLeatOneSearchedTerm(paragraph, TERMS)) {
        TEXTBLOCK.push(paragraph);
        return;
      }

      phrases
        .filter((phra) => !!phra)
        .forEach((phrase, phIdx) => {
          if (!hasAtLeatOneSearchedTerm(phrase, TERMS)) {
            TEXTBLOCK.push(phrase);
            return;
          }

          const words = phrase.split(' ');
          let newPhrase = phrase;

          const foundWords = words.filter((w) =>
            TERMS.has(w.toLocaleLowerCase())
          );

          foundWords.forEach((fw, id) => {
            const lCaseWord = fw.toLocaleLowerCase();
            const { results: curTermDataResults, ...curTermData } =
              TERMS.get(lCaseWord)!;
            TERMS.set(lCaseWord, {
              ...curTermData,
              results: [
                ...curTermDataResults,
                {
                  value: fw,
                  paragraphIndex: paIdx,
                  phraseIndex: phIdx,
                  posInPhrase: id,
                },
              ],
            });
            console.log({ fw });

            newPhrase = newPhrase.replace(fw, `{{${paIdx}-${phIdx}-${id}}}`);
            TEMPLATE_MAP.set(`{{${paIdx}-${phIdx}-${id}}}`, fw);
            TEXTBLOCK.push(newPhrase);
          });
        });
    });

  console.log(TEXTBLOCK.join());

  return {
    result: TERMS,
    template: TEXTBLOCK,
    templateMap: TEMPLATE_MAP,
  };
}
