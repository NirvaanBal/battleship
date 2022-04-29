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

  // const canPlaceHere = (location) => (location !== '' ? false : true);

  const place = (size, direction, placeAt) => {
    const ship = Ship(size);
    const shipSize = ship.ship.length;

    // let placeAt = Math.floor(Math.random() * grid.length);

    if (direction === 'a') {
      // if (placeAt % 10 === 9) placeAt -= shipSize - 1;
      for (let i = placeAt; i < placeAt + shipSize; i += 1) {
        grid[i] = '-';
      }
    }

    if (direction === 'd') {
      // if (placeAt >= 90) placeAt -= shipSize - 1;
      for (let i = 0; i < shipSize; i += 1) {
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
