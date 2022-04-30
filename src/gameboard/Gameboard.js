import Ship from '../ship/Ship';

const Gameboard = () => {
  const grid = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
  ]; // prettier-ignore

  // const flow = ['a', 'd'][Math.floor(Math.random() * 2)];

  const place = (size, direction, placeAt) => {
    const ship = Ship(size);
    const shipSize = ship.ship.length;

    // let placeAt = Math.floor(Math.random() * grid.length);

    if (direction === 'a') {
      if (
        (placeAt % 10 === 9 && size === 2) ||
        ((placeAt % 10 === 9 || placeAt % 10 === 8) && size === 3) ||
        ((placeAt % 10 === 9 || placeAt % 10 === 8 || placeAt % 10 === 7) &&
          size === 4) ||
        ((placeAt % 10 === 9 ||
          placeAt % 10 === 8 ||
          placeAt % 10 === 7 ||
          placeAt % 10 === 6) &&
          size === 5)
      ) {
        return false;
      }
      for (let i = placeAt; i < placeAt + shipSize; i += 1) {
        if (grid[i] === '') grid[i] = '-';
        else return false;
      }
    }

    if (direction === 'd') {
      if (
        placeAt >= 90 ||
        (placeAt >= 80 && size === 3) ||
        (placeAt >= 70 && size === 4) ||
        (placeAt >= 60 && size === 5)
      ) {
        return false;
      }
      for (let i = 0; i < shipSize; i += 1) {
        if (grid[i] !== '') return false;
        if (i === 0) grid[placeAt] = '|';
        else grid[placeAt] = '|';
        placeAt += 10;
      }
    }

    return grid;
  };

  return { grid, place };
};

export default Gameboard;
