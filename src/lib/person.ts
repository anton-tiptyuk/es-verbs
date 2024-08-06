export enum Person {
  yoMe = 'yo',
  tuYou = 'tu',
  elEllaHeShe = 'el/ella',
  ellosEllasThey = 'ellos/ellas',
  nosotrosWe = 'nosotros',
  vosotrosYou = 'vosotros',
}

export const persons = <Person[]>Object.values(Person);
