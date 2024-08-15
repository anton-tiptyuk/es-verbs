import { Person } from '../lib/person';
import { Tense } from '../lib/tense';

export type VerbDescriptor = Partial<
  Record<Tense, Partial<Record<Person, string>>>
>;

export type VerbDictionary = Record<string, VerbDescriptor>;
