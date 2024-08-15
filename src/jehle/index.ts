import * as fs from 'fs';

import { ListItem } from './jehle-types';
import { reParse } from './re-parse';

export const jehleIndex = async () => {
  const dictionary: Record<string, ListItem[]> = JSON.parse(
    fs.readFileSync('files/ignored/jehle_verb_lookup.json', {
      encoding: 'utf8',
    }),
  );

  const reGroupedDictionary = reParse.groupBy(dictionary);

  fs.writeFileSync(
    'files/ignored/jehle-re-grouped.json',
    // JSON.stringify(reGroupedDictionary, undefined, 2),
    JSON.stringify(reGroupedDictionary),
    { encoding: 'utf8' },
  );
};
