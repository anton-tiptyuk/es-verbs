import { splitChunks } from './collection';

type blankCallback = () => void;

export async function forEach<T = any>(
  items: T[],
  callback: (
    item: T,
    idx: number,
    items: T[],
    breakCb: blankCallback,
  ) => Promise<any>,
) {
  let shouldBreak = false;
  const breakCb = () => {
    shouldBreak = true;
  };

  for (let index = 0; index < items.length; index += 1) {
    await callback(items[index], index, items, breakCb);
    if (shouldBreak) break;
  }
}

export async function forEachInChunks<T = any>(
  items: T[],
  chunkSize: number,
  callback: (
    item: T[],
    idx: number,
    items: T[][],
    breakCb: blankCallback,
  ) => Promise<any>,
) {
  const chunks = splitChunks(items, chunkSize);

  return forEach(chunks, callback);
}

export async function forEachMap<T = any, R = any>(
  items: T[],
  callback: (
    item: T,
    idx: number,
    items: T[],
    breakCb: blankCallback,
  ) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  let shouldBreak = false;
  const breakCb = () => {
    shouldBreak = true;
  };

  for (let index = 0; index < items.length; index += 1) {
    results.push(await callback(items[index], index, items, breakCb));
    if (shouldBreak) break;
  }

  return results;
}

export async function forEachTryCatch<T = any>(
  items: T[],
  callback: (item: T, idx: number, items: T[]) => Promise<any>,
  catcher?: (
    err: Error,
    item: T,
  ) => boolean | undefined | Promise<boolean | undefined>,
): Promise<void> {
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    try {
      await callback(item, index, items);
    } catch (ex) {
      const noBreak = await (catcher && catcher(ex, item));
      if (!noBreak) break;
    }
  }
}
