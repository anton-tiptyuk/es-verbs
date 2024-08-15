export const getArrayUnique = <T>(vals: T[]) => Array.from(new Set(vals));

export const mapArrayUnique = <T, K>(
  vals: T[],
  mapper: (value: T, index: number, array: readonly T[]) => K,
) => {
  const resultSet = new Set<K>();
  vals.forEach((v, idx) => resultSet.add(mapper(v, idx, vals)));
  return Array.from(resultSet);
};

export const flatMapArrayUnique = <T, K>(
  vals: T[],
  mapper: (value: T, index: number, array: readonly T[]) => K[],
) => {
  const resultSet = new Set<K>();
  vals.forEach((v, idx) =>
    mapper(v, idx, vals).forEach((x) => resultSet.add(x)),
  );
  return Array.from(resultSet);
};

export const filterArrayFirstUniquesBy = <T, K extends keyof T>(
  vals: T[],
  key: K,
) => {
  const knownKeys = new Set<T[K]>();

  return vals.filter((val) => {
    const keyVal = val[key];
    const result = !knownKeys.has(keyVal);
    if (result) knownKeys.add(keyVal);
    return result;
  });
};

export const pick = <T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> => {
  const response: any = {};
  if (obj) {
    keys.forEach((key) => {
      if (undefined !== obj[key]) response[key] = obj[key];
    });
  }
  return response;
};

export const mapPick = <T, K extends keyof T>(arr: T[], ...keys: K[]) =>
  arr.map((val) => pick(val, ...keys));

export const mapPluck = <T, K extends keyof T>(
  arr: readonly T[],
  key: K,
): T[K][] => arr.map((val) => val[key]);

export const groupBy = <T, K extends keyof T>(arr: T[], key: K) =>
  arr.reduce(
    (acc, val) => {
      const idx = <string>(<unknown>val[key]);

      if (!acc[idx]) acc[idx] = [];

      acc[idx].push(val);

      return acc;
    },
    <Record<string, T[]>>{},
  );

export const groupBy2Lvl = <T, K extends keyof T, P extends keyof T>(
  arr: T[],
  key1: K,
  key2: P,
) => {
  const result = groupBy(arr, key1);

  Object.keys(result).forEach((key) => {
    result[key] = <any>groupBy(result[key], key2);
  });

  return <Record<string, Record<string, T[]>>>(<any>result);
};

export const groupFieldBy = <T, K extends keyof T, V extends keyof T>(
  arr: T[],
  key: K,
  valKey: V,
) =>
  arr.reduce(
    (acc, val) => {
      const idx = <string>(<unknown>val[key]);

      if (!acc[idx]) acc[idx] = [];

      acc[idx].push(val[valKey]);

      return acc;
    },
    <Record<string, T[V][]>>{},
  );

export const groupFieldBy2Lvl = <
  T,
  K extends keyof T,
  P extends keyof T,
  V extends keyof T,
>(
  arr: T[],
  key1: K,
  key2: P,
  valKey: V,
) => {
  const result = groupBy(arr, key1);

  Object.keys(result).forEach((key) => {
    result[key] = <any>groupFieldBy(result[key], key2, valKey);
  });

  return <Record<string, Record<string, T[V][]>>>(<any>result);
};

export const dictionaryBy = <T, K extends keyof T>(arr: T[], key: K) =>
  arr.reduce(
    (acc, val) => {
      acc[<string>(<unknown>val[key])] = val;
      return acc;
    },
    <Record<string, T>>{},
  );

export const dictionaryBy2Lvl = <T, K extends keyof T, P extends keyof T>(
  arr: T[],
  key1: K,
  key2: P,
) => {
  const result = groupBy(arr, key1);

  Object.keys(result).forEach((k) => {
    result[k] = <any>dictionaryBy(result[k], key2);
  });

  return <Record<string, Record<string, T>>>(<unknown>result);
};

export const dictionarizeFieldBy = <T, K extends keyof T, V extends keyof T>(
  arr: T[],
  key: K,
  valKey: V,
) =>
  arr.reduce(
    (acc, val) => {
      acc[<string>(<unknown>val[key])] = val[valKey];
      return acc;
    },
    <Record<string, T[V]>>{},
  );

export const dictionarizeField2LvlBy = <
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  V extends keyof T,
>(
  arr: T[],
  key1: K1,
  key2: K2,
  valKey: V,
) => {
  const result = groupBy(arr, key1);

  Object.keys(result).forEach((k) => {
    result[k] = <any>dictionarizeFieldBy(result[k], key2, valKey);
  });

  return <Record<string, Record<string, T[V]>>>(<unknown>result);
};

export const splitChunksMutating = <T>(arr: T[], len: number) => {
  const result: T[][] = [];
  while (arr.length) {
    result.push(arr.splice(0, len));
  }

  return result;
};

export const splitChunks = <T>(arr: T[], len: number) =>
  splitChunksMutating(arr.slice(), len);
