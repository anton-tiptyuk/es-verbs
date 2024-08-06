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
