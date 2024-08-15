import { modalsByInfinitive } from './modal';
import { VerbDictionary } from './types';

export const hardcodedDictionary = [modalsByInfinitive].reduce(
  (acc: VerbDictionary, val) => {
    Object.assign(acc, val);
    return acc;
  },
  {},
);
