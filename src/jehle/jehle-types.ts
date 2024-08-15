export interface ListItem {
  translation: string;
  verb?: string;

  // 'Future',
  // 'Imperfect',
  // 'Present',
  // 'Preterite',
  // 'Pastparticiple',
  // 'Present Perfect',
  // 'Future Perfect',
  // 'Past Perfect',
  // 'Preterite (Archaic)',
  // 'Conditional Perfect',
  // 'Gerund',
  // 'Conditional',
  // 'Infinitive'
  tense: 'Future' | 'Preterite' | 'Present';
  performer?: ListItemPerformer;
  mood?: ListItemMood;
  infinitive?: string;
  long?: string;
  performer_en?: ListItemPerformerEn;
  has_long?: boolean;
}

export enum ListItemMood {
  ImperativeNegative = 'Imperative Negative',
  Indicative = 'Indicative',
  Subjunctive = 'Subjunctive',
}

export enum ListItemPerformer {
  EllosEllasUstedes = 'ellos/ellas/ustedes',
  NosotrosNosotras = 'nosotros/nosotras',
  Tú = 'tú',
  VosotrosVosotras = 'vosotros/vosotras',
  Yo = 'yo',
  ÉlEllaUsted = 'él/ella/usted',
}

export enum ListItemPerformerEn {
  HeSheYouFormal = 'he/she/you (formal)',
  I = 'I',
  ThemYouAllFormal = 'them / you all (formal)',
  We = 'we',
  YouAllInformal = 'you all (informal)',
  YouInformal = 'you (informal)',
}

export const tenses = ['Present', 'Preterite', 'Future'];
export const performers = [
  ListItemPerformer.Yo,
  ListItemPerformer.Tú,
  ListItemPerformer.ÉlEllaUsted,
  ListItemPerformer.NosotrosNosotras,
  ListItemPerformer.VosotrosVosotras,
  ListItemPerformer.EllosEllasUstedes,
];

export const knownTenses = new Set(tenses);
