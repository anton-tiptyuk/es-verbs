```
export enum Tense {
  present = 'present',
  past = 'past',
  future = 'future',
}

export enum Person {
  yoMe = 'yo',
  tuYou = 'tu',
  elEllaHeShe = 'el/ella',
  ellosEllasThey = 'ellos/ellas',
  nosotrosWe = 'nosotros',
  vosotrosYou = 'vosotros',
}

const verbRegExp = /^(\w+)([aei]r)$/;

export class Verb {
  readonly base: string;
  readonly ending: string;

  constructor(readonly gerund: string) {
    const match = gerund.match(verbRegExp);

    if (!match) throw new Error(`Failed to parse ${gerund}`);

    this.base = match[1];
    this.ending = match[2];
  }

  get isAr() {
    return 'ar' === this.ending;
  }

  get isEr() {
    return 'er' === this.ending;
  }

  get isIr() {
    return 'ir' === this.ending;
  }

  get isErIr() {
    return ['er', 'ir'].includes(this.ending);
  }
}



export const morphVerb = (tense: Tense, person: Person, verb: Verb) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { base, isAr, isEr, isIr, isErIr } = verb;
  let { ending, gerund: result } = verb;
  let isBasicMorph = true;

  const morphEnding = (val: string) => {
    ending = val;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const morphCustom = (handler: () => string) => {
    isBasicMorph = false;
    result = handler();
  };

  if (Tense.present === tense) {
    if (Person.yoMe === person) {
      morphEnding('o');
    } else if (Person.tuYou === person) {
      morphEnding(isAr ? 'as' : 'es');
    } else if (Person.elEllaHeShe === person) {
      morphEnding(isAr ? 'a' : 'e');
    } else if (Person.ellosEllasThey === person) {
      morphEnding(isAr ? 'an' : 'en');
    } else if (Person.nosotrosWe === person) {
      morphEnding(isAr ? 'amos' : isEr ? 'emos' : 'imos');
    } else if (Person.vosotrosYou === person) {
      morphEnding(isAr ? 'ais' : isEr ? 'eis' : 'iss??');
    } else assertUnreachable(person);
  } else if (Tense.past === tense) {
    if (Person.yoMe === person) {
      morphEnding('é');
    } else if (Person.tuYou === person) {
      morphEnding('ó');
    } else if (Person.elEllaHeShe === person) {
      morphEnding(isAr ? 'a' : 'e');
    } else if (Person.ellosEllasThey === person) {
      morphEnding(isAr ? 'an' : 'en');
    } else if (Person.nosotrosWe === person) {
      morphEnding(isAr ? 'amos' : isEr ? 'emos' : 'imos');
    } else if (Person.vosotrosYou === person) {
      morphEnding(isAr ? 'ais' : isEr ? 'eis' : 'iss??');
    } else assertUnreachable(person);
  } else if (Tense.future === tense) {
  } else assertUnreachable(tense);

  if (isBasicMorph) {
    result = `${base}${ending}`;
  }

  return result;
};


export const processVerbList = (verbs: string[]) =>
  verbs.reduce(
    (acc, val) => {
      const verb = new Verb(val);
      acc[val] = tenses.flatMap((tense) =>
        persons.map(
          (person) => `(${tense}) ${person}: ${morphVerb(tense, person, verb)}`,
        ),
      );

      return acc;
    },
    <Record<string, string[]>>{},
  );


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

```


