import Gameboard from './Gameboard';
import Ship from '../ship/Ship';

const destroyer = Ship(3);

describe.skip('GAMEBOARD', () => {
  test('invalid placement across', () => {
    expect(Gameboard().place(Ship(5), 'a', 17)).toBeFalsy();
  });
  test('invalid placemnet down', () => {
    expect(Gameboard().place(destroyer, 'd', 90)).toBeFalsy();
  });
  test('place a ship across', () => {
    expect(Gameboard().place(destroyer, 'a', 16)).toEqual([
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', `${destroyer.id}_${0}_${destroyer.ship[0]}`, `${destroyer.id}_${1}_${destroyer.ship[1]}`, `${destroyer.id}_${2}_${destroyer.ship[2]}`, '',
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
      '', '', '', '', `${destroyer.id}_${0}_${destroyer.ship[0]}`, '', '', '', '', '',
      '', '', '', '', `${destroyer.id}_${1}_${destroyer.ship[1]}`, '', '', '', '', '',
      '', '', '', '', `${destroyer.id}_${2}_${destroyer.ship[2]}`, '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '',
    ]); // prettier-ignore
  });
  test('attack a ship: miss', () => {
    expect(Gameboard().receiveAttack('a', 4)).toEqual({
      coords: '03',
      shipId: null,
      shipHitIndex: null,
    });
  });
  // test.only('randomly place 5 ships', () => {
  //   expect(Gameboard().randomlyPlaceShips()).toBe(true);
  // });
});
