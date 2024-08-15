import { Collection } from '@lib';

import {
  knownTenses,
  ListItem,
  ListItemMood,
  performers,
  tenses,
} from './jehle-types';

const groupBy = (dictionary: Record<string, ListItem[]>) => {
  const flat = Object.entries(dictionary).flatMap(([verb, items]) =>
    items
      .filter(
        (i) => ListItemMood.Indicative === i.mood && knownTenses.has(i.tense),
      )
      .map((i) => ({ ...i, verb })),
  );

  // const tenses = Collection.mapArrayUnique(flat, (x) => x.tense);
  // console.log(tenses);

  const grouped = Collection.groupBy(flat, 'infinitive');

  Object.entries(grouped).forEach(([verb, verbItems]) => {
    const itemIndex = Collection.dictionaryBy2Lvl(
      verbItems,
      'tense',
      'performer',
    );

    grouped[verb] = <any>(
      tenses.map((tense) =>
        performers.map(
          (performer) => (itemIndex[tense] || {})[performer]?.verb,
        ),
      )
    );
  });

  return grouped;
};

export const reParse = {
  groupBy,
};
