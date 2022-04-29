import Ship from './Ship';

const carrier = Ship();

describe('SHIP', () => {
  test('hit the ship', () => {
    expect(carrier.hit(1)).toEqual(['x', '']);
  });

  test('ship not sunken', () => {
    expect(carrier.isSunk()).toBe(false);
  });

  test('destroy the ship', () => {
    expect(carrier.hit(2)).toEqual(['x', 'x']);
  });

  test('ship sunken', () => {
    expect(carrier.isSunk()).toBe(true);
  });
});
