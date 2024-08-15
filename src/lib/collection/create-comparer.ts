const dictionarize = <T>(arr: T[], getIdx: (x: T) => string) =>
  arr.reduce(
    (acc, val) => {
      acc[getIdx(val)] = val;
      return acc;
    },
    <Record<string, T>>{},
  );

export interface ICompared<TSample = any, TValue = TSample> {
  sampleByValue: (value: TValue) => TSample;
  get equalSamples(): TSample[];
  get updatedSamples(): TSample[];
  get commonSamples(): TSample[];
  get addedSamples(): TSample[];
  sampleByIdx: (idx: string) => TSample;

  valueBySample: (sample: TSample) => TValue;
  get equalValues(): TValue[];
  get updatedValues(): TValue[];
  get commonValues(): TValue[];
  get deletedValues(): TValue[];
  valueByIdx: (idx: string) => TValue;

  hasDifferences: boolean;
}

export type Comparer<TSample, TValue> = (
  samples: TSample[],
  values: TValue[],
) => ICompared<TSample, TValue>;

export const createComparer =
  <TSample = any, TValue = TSample>(
    getSampleIdx: (sample: TSample) => string,
    getValueIdx?: (value: TValue) => string,
    isEqual: (sample: TSample, value: TValue) => boolean = () => false,
  ): Comparer<TSample, TValue> =>
  (samples: TSample[], values: TValue[]): ICompared<TSample, TValue> => {
    if (!getValueIdx) getValueIdx = <any>getSampleIdx;

    const samplesByIdx = dictionarize(samples, getSampleIdx);
    const sampleIdxes = Object.keys(samplesByIdx);
    const valuesByIdx = dictionarize(values, getValueIdx);
    const valueIdxes = Object.keys(valuesByIdx);

    const equalIdxes: string[] = [];
    const updatedIdxes: string[] = [];
    const addedIdxes: string[] = [];

    sampleIdxes.forEach((idx) => {
      const value = valuesByIdx[idx];
      if (value) {
        if (isEqual(samplesByIdx[idx], value)) {
          equalIdxes.push(idx);
        } else {
          updatedIdxes.push(idx);
        }
      } else {
        addedIdxes.push(idx);
      }
    });

    const deletedIdxes = valueIdxes.filter((idx) => !samplesByIdx[idx]);

    const hasDifferences = !!(
      addedIdxes.length +
      updatedIdxes.length +
      deletedIdxes.length
    );

    const mapSamples = (idxes: string[]) =>
      idxes.map((idx) => samplesByIdx[idx]);
    const mapValues = (idxes: string[]) => idxes.map((idx) => valuesByIdx[idx]);

    return {
      sampleByValue: (value: TValue) =>
        value && samplesByIdx[getValueIdx(value)],
      get equalSamples() {
        return mapSamples(equalIdxes);
      },
      get updatedSamples() {
        return mapSamples(updatedIdxes);
      },
      get commonSamples() {
        return mapSamples([...equalIdxes, ...updatedIdxes]);
      },
      get addedSamples() {
        return mapSamples(addedIdxes);
      },
      sampleByIdx: (idx: string) => samplesByIdx[idx],

      valueBySample: (sample: TSample) =>
        sample && valuesByIdx[getSampleIdx(sample)],
      get equalValues() {
        return mapValues(equalIdxes);
      },
      get updatedValues() {
        return mapValues(updatedIdxes);
      },
      get commonValues() {
        return mapValues([...equalIdxes, ...updatedIdxes]);
      },
      get deletedValues() {
        return mapValues(deletedIdxes);
      },
      valueByIdx: (idx: string) => valuesByIdx[idx],

      hasDifferences,
    };
  };
