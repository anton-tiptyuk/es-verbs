const fs = require('fs');

const conjugateVerb = require('conjugator/lib/conjugateVerb.js');

// const comerConjugation = conjugateVerb('comer');

// console.log(
//   'The first person plural future subjunctive is: ' +
//     comerConjugation.subjunctive.future.plural.first,
// );

const packItem = (item) => [
  item.singular.first,
  item.singular.second,
  item.singular.third,
  item.plural.first,
  item.plural.second,
  item.plural.third,
];

const jehleVerbs = Object.keys(
  JSON.parse(
    fs.readFileSync('files/ignored/jehle-re-grouped.json', {
      encoding: 'utf8',
    }),
  ),
);
// .splice(0, 30);

const mappedStuff = jehleVerbs.reduce((acc, verb) => {
  const { present, preterite, future } = conjugateVerb(verb).indicative;
  acc[verb] = [packItem(present), packItem(preterite), packItem(future)];
  return acc;
}, {});

fs.writeFileSync(
  'files/ignored/conjugator.json',
  JSON.stringify(mappedStuff, undefined, 2),
  {
    encoding: 'utf8',
  },
);
