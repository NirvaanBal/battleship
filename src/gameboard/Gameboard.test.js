import Gameboard from './Gameboard';
import Ship from '../ship/Ship';

const destroyer = Ship(3);

describe('GAMEBOARD', () => {
  test('invalid placement across', () => {
    expect(Gameboard().place(Ship(5), 'a', 17)).toBeFalsy();
  });
  test('invalid placemnet down', () => {
    expect(Gameboard().place(destroyer, 'd', 90)).toBeFalsy();
  });
  test.only('place a ship across', () => {
    expect(Gameboard().place(destroyer, 'a', 16)).toEqual([
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', `${destroyer.id}-${destroyer.ship[0]}`, `${destroyer.id}-${destroyer.ship[1]}`, `${destroyer.id}-${destroyer.ship[2]}`, '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]); // prettier-ignore
  });
  test('place a ship down', () => {
    expect(Gameboard().place(destroyer, 'd', 4)).toEqual([
      '', '', '', '', `${destroyer.id}-${destroyer.ship[0]}`, '', '', '', '', '',
      '', '', '', '', `${destroyer.id}-${destroyer.ship[1]}`, '', '', '', '', '',
      '', '', '', '', `${destroyer.id}-${destroyer.ship[2]}`, '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]); // prettier-ignore
  });
});
