import Ship from './Ship';

describe.skip('SHIP', () => {
  test('hit the ship', () => {
    expect(Ship().hit(1)).toEqual(['x', '']);
  });

  test('ship not sunken', () => {
    expect(Ship().isSunk()).toBe(false);
  });

  test('destroy the ship', () => {
    expect(Ship().hit(2)).toEqual(['x', 'x']);
  });

  test('ship sunken', () => {
    expect(Ship().isSunk()).toBe(true);
  });
});
