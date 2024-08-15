import { createComparer, Comparer, ICompared } from './create-comparer';

export class AggregatedDbComparer<T> {
  private readonly comparer: Comparer<Partial<T>, T>;
  compared: ICompared<Partial<T>, T>;

  constructor(
    getIdx: (sample: T) => string,
    isEqual: (sample: Partial<T>, value: T) => boolean = () => false,
  ) {
    this.comparer = createComparer(getIdx, getIdx, isEqual);
  }

  setData(samples: Partial<T>[], values: T[]) {
    this.compared = this.comparer(samples, values);
  }

  get updated() {
    const { updatedSamples, valueBySample } = this.compared;

    return updatedSamples.map((sample) => ({
      sample,
      value: valueBySample(sample),
    }));
  }
}
