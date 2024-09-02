import { ISeasonEntry } from './i-season-entry';

const firstMonthDayRegEx = /^(\d{1,2})-(\d{1,2})$/;

interface Item {
  id: number;

  /** included in range */
  startMonthDay: string;

  /** excluded; is the next range */
  nextMonthDay?: string;
}

const formatFromMonthAndDay = (month: number | string, day: number | string) =>
  String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');

export class SeasonResolver {
  private readonly lookupItems: Item[];

  constructor(entries: ISeasonEntry[]) {
    if (!entries?.length) throw new Error('Seasons are required');

    const invalidMonthDays: string[] = [];

    let items = entries
      .map(({ id, firstMonthDay }): Item => {
        const match = firstMonthDay.match(firstMonthDayRegEx);
        if (!match) {
          invalidMonthDays.push(firstMonthDay);
          return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, monthStr, dayStr] = match;
        if (Number(monthStr) > 12 || Number(dayStr) > 31) {
          invalidMonthDays.push(firstMonthDay);
          return;
        }

        return {
          id,
          startMonthDay: formatFromMonthAndDay(monthStr, dayStr),
        };
      })
      .filter(Boolean)
      .sort((a, b) =>
        a.startMonthDay > b.startMonthDay
          ? 1
          : a.startMonthDay < b.startMonthDay
            ? -1
            : 0,
      );

    if (invalidMonthDays.length)
      throw new Error(`Invalid entries: [${invalidMonthDays.join()}]`);

    let item: Item;
    items.forEach((i) => {
      if (item) {
        item.nextMonthDay = i.startMonthDay;
      }
      item = i;
    });

    const lastItem = item;
    lastItem.nextMonthDay = '12-32';

    const firstItem = items[0];
    if (items.length > 1 && '01-01' !== firstItem.startMonthDay) {
      items = [
        {
          id: lastItem.id,
          startMonthDay: '01-01',
          nextMonthDay: firstItem.startMonthDay,
        },
        ...items,
      ];
    }

    this.lookupItems = items;
  }

  resolve(dtm: Date) {
    const month = dtm.getMonth() + 1;
    const day = dtm.getDate();
    const str = formatFromMonthAndDay(month, day);
    const itemFound = this.lookupItems.find(
      (i) => i.startMonthDay <= str && i.nextMonthDay > str,
    );

    return itemFound?.id;
  }
}
