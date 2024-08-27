// Note: use NFKD if you want things like \uFB01(ﬁ) normalized (to fi).
export const removeAccents = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
