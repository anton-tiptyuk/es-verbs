export enum Person {
  yoMe = 'yo',
  tuYou = 'tu',
  elEllaHeShe = 'el/ella',
  nosotrosWe = 'nosotros',
  vosotrosYou = 'vosotros',
  ellosEllasThey = 'ellos/ellas',
}

export const persons = <Person[]>Object.values(Person);
