import { Verb } from './verb';
import { Person } from './person';
import { Tense } from './tense';
import { assertUnreachable } from './assert-unreachable';

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
    // } else if (Tense.future === tense) {
  } else assertUnreachable(tense);

  if (isBasicMorph) {
    result = `${base}${ending}`;
  }

  return result;
};
