import Ship from './Ship';

const destroyer = Ship();
const destroyerId = destroyer.id;

describe.skip('SHIP', () => {
  test('hit the ship', () => {
    expect(destroyer.hit(1, destroyerId)).toEqual(['x', '']);
  });

  test('ship not sunken', () => {
    expect(destroyer.isSunk()).toBe(false);
  });

  test('destroy the ship', () => {
    expect(destroyer.hit(2, destroyerId)).toEqual(['x', 'x']);
  });

  test('ship sunken', () => {
    expect(destroyer.isSunk()).toBe(true);
  });
});
