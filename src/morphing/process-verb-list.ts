import { morphVerb } from './morph-verb';
import { persons } from './person';
import { tenses } from './tense';
import { Verb } from './verb';

export const processVerbList = (verbs: string[]) =>
  verbs.reduce(
    (acc, val) => {
      const verb = new Verb(val);
      acc[val] = tenses.flatMap((tense) => [
        `--${tense}--`,
        ...persons.map(
          (person) => `${person}: ${morphVerb(tense, person, verb)}`,
        ),
      ]);

      return acc;
    },
    <Record<string, string[]>>{},
  );
