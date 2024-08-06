import * as fs from 'fs';
import { processVerbList } from './lib/process-verb-list';

const doStuff = async () => {
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

(async () => {
  await doStuff();
})().catch((ex) => {
  console.error('Exception caught', ex);
});
