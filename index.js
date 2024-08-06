const verbRegExp = /^(\w+)([aei]r)$/;

['trabajar', 'beber', 'comer', 'vivir', 'nadar', 'duplo']
  .map((w) => w.match(verbRegExp))
  .forEach((w) => console.log(w));
