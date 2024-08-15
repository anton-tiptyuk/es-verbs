import { Person } from '../morphing/person';
import { Tense } from '../morphing/tense';

export type VerbDescriptor = Partial<
  Record<Tense, Partial<Record<Person, string>>>
>;

export type VerbDictionary = Record<string, VerbDescriptor>;
