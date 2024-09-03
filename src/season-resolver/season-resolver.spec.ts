import { ISeasonEntry } from './i-season-entry';
import { SeasonResolver } from './season-resolver';

const entries: ISeasonEntry[] = [
  { id: 6, firstMonthDay: '3-3' },
  { id: 10, firstMonthDay: '02-11' },
  { id: 7, firstMonthDay: '08-01' },
  { id: 17, firstMonthDay: '05-01' },
  { id: 19, firstMonthDay: '11-25' },
];

describe('season resolver', () => {
  describe('ctor: validation, initialization', () => {
    const subject = (entries: ISeasonEntry[]) => {
      const resolver = new SeasonResolver(entries);
      return resolver['lookupItems'];
    };

    it('works for undefined entities', () => {
      expect(subject(undefined)).toBeUndefined();
    });

    it('works for blank entities', () => {
      expect(subject([])).toBeUndefined();
    });

    it('should filter wrong months and days', () => {
      expect(() =>
        subject([
          { id: 4, firstMonthDay: '03-wrong-str' },
          { id: 5, firstMonthDay: '03-34' },
          { id: 6, firstMonthDay: '3-3' },
          { id: 7, firstMonthDay: '20-3' },
          { id: 9, firstMonthDay: '20-44' },
          { id: 10, firstMonthDay: '20-04' },
          { id: 11, firstMonthDay: '02-11' },
          { id: 12, firstMonthDay: '02-44' },
        ]),
      ).toThrow('Invalid entries: [03-wrong-str,03-34,20-3,20-44,20-04,02-44]');
    });

    it('should sort items right and set start/end of year', () => {
      expect(subject(entries)).toMatchObject([
        {
          id: 19,
          nextMonthDay: '02-11',
          startMonthDay: '01-01',
        },
        {
          id: 10,
          nextMonthDay: '03-03',
          startMonthDay: '02-11',
        },
        {
          id: 6,
          nextMonthDay: '05-01',
          startMonthDay: '03-03',
        },
        {
          id: 17,
          nextMonthDay: '08-01',
          startMonthDay: '05-01',
        },
        {
          id: 7,
          nextMonthDay: '11-25',
          startMonthDay: '08-01',
        },
        {
          id: 19,
          nextMonthDay: '12-32',
          startMonthDay: '11-25',
        },
      ]);
    });
  });

  describe('resolving dates', () => {
    const subject = (() => {
      const resolver = new SeasonResolver(entries);
      return (val: string) => resolver.resolve(new Date(val));
    })();

    it('resolves 09-01 into 7', () => {
      expect(subject('2024-09-01T20:33:24.482Z')).toBe(7);
    });

    it('resolves 01-01 into 19', () => {
      expect(subject('2024-01-01T20:33:24.482Z')).toBe(19);
    });

    it('resolves 02-29 into 10', () => {
      expect(subject('2024-02-29T20:33:24.482Z')).toBe(10);
    });

    it('resolves 05-01 into 17', () => {
      expect(subject('2024-05-01T20:33:24.482Z')).toBe(17);
    });

    it('resolves 12-31 into 19', () => {
      expect(subject('2024-12-31T20:33:24.482Z')).toBe(19);
    });
  });
});
