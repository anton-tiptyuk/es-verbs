import { Person } from '../lib/person';
import { Tense } from '../lib/tense';

import { VerbDictionary } from './types';

export const modalsByInfinitive: VerbDictionary = {
  ser: {
    [Tense.present]: {
      [Person.yoMe]: 'soy',
      [Person.tuYou]: 'eres',
      [Person.elEllaHeShe]: 'es',
      [Person.nosotrosWe]: 'somos',
      [Person.vosotrosYou]: 'zcvzxvasdf??',
      [Person.ellosEllasThey]: 'son',
    },
    [Tense.past]: {
      [Person.yoMe]: 'fui',
      [Person.tuYou]: 'fuiste',
      [Person.elEllaHeShe]: 'zcvzxvasdf',
      [Person.nosotrosWe]: 'zcvzxvasdf',
      [Person.vosotrosYou]: 'zcvzxvasdf',
      [Person.ellosEllasThey]: 'zcvzxvasdf',
    },
  },
  estar: {
    [Tense.present]: {
      [Person.yoMe]: 'estoy',
      [Person.tuYou]: 'estas',
      [Person.elEllaHeShe]: 'esta',
      [Person.nosotrosWe]: 'estamos',
      [Person.vosotrosYou]: 'estais',
      [Person.ellosEllasThey]: 'estan',
    },
    [Tense.past]: {
      [Person.yoMe]: 'zcvzxvasdf',
      [Person.tuYou]: 'zcvzxvasdf',
      [Person.elEllaHeShe]: 'zcvzxvasdf',
      [Person.nosotrosWe]: 'zcvzxvasdf',
      [Person.vosotrosYou]: 'zcvzxvasdf',
      [Person.ellosEllasThey]: 'zcvzxvasdf',
    },
  },
  poder: {
    [Tense.present]: {
      [Person.yoMe]: 'puedo',
      [Person.tuYou]: 'puedes',
      [Person.elEllaHeShe]: 'puede',
      [Person.nosotrosWe]: 'podemos',
      [Person.vosotrosYou]: 'podeis???',
      [Person.ellosEllasThey]: 'pueden',
    },
    [Tense.past]: {
      [Person.yoMe]: 'zcvzxvasdf',
      [Person.tuYou]: 'zcvzxvasdf',
      [Person.elEllaHeShe]: 'zcvzxvasdf',
      [Person.nosotrosWe]: 'zcvzxvasdf',
      [Person.vosotrosYou]: 'zcvzxvasdf',
      [Person.ellosEllasThey]: 'zcvzxvasdf',
    },
  },
};
