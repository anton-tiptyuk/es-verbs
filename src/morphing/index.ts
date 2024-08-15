import * as fs from 'fs';
import { processVerbList } from './process-verb-list';

export const morphVerbList = async () => {
  const verbList: string[] = JSON.parse(
    fs.readFileSync('verbs.json', { encoding: 'utf8' }),
  );

  const processedList = processVerbList(verbList);

  fs.writeFileSync(
    'morphed-verbs.json',
    JSON.stringify(processedList, undefined, 2),
    { encoding: 'utf8' },
  );
};
