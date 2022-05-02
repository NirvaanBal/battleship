import updateRowToNumeral from '../utils/updateRowToNumeral';

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

  const ships = [];

  const place = (ship, direction, placeAt) => {
    const size = ship.ship.length;
    let placesCache = [];

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

      for (let i = 0; i < size; i += 1) {
        if (grid[placeAt] !== '') {
          if (placesCache.length > 0) {
            placesCache.forEach((placeCache) => {
              grid[placeCache] = '';
            });
            placesCache = [];
          }
          return false;
        }
        grid[placeAt] = `${ship.id}_${i}_${ship.ship[i]}`;
        placesCache.push(placeAt);
        placeAt += 1;
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
      for (let i = 0; i < size; i += 1) {
        if (grid[placeAt] !== '') {
          if (placesCache.length > 0) {
            placesCache.forEach((placeCache) => {
              grid[placeCache] = '';
            });
            placesCache = [];
          }

          return false;
        }
        if (i === 0) grid[placeAt] = `${ship.id}_${i}_${ship.ship[i]}`;
        else grid[placeAt] = `${ship.id}_${i}_${ship.ship[i]}`;
        placesCache.push(placeAt);
        placeAt += 10;
      }
    }

    ships.push(ship);
    return grid;
  };

  const receiveAttack = (row, col) => {
    if (updateRowToNumeral(row) === false || col > 10 || col < 1) return false;
    row = updateRowToNumeral(row);
    col -= 1;

    if (grid[+`${row}${col}`] === 'o' || grid[+`${row}${col}`] === 'x') {
      return false;
    }

    let shipId = null;
    let shipHitIndex = null;

    if (grid[+`${row}${col}`] !== '') {
      [shipId, shipHitIndex] = grid[+`${row}${col}`].split('_');
      grid[+`${row}${col}`] = 'x';
    } else {
      grid[+`${row}${col}`] = 'o';
    }

    return {
      coords: `${row}${col}`,
      shipId,
      shipHitIndex: shipHitIndex ? +shipHitIndex + 1 : null,
    };
  };

  const allSunk = (allShips) => {
    const totalShips = ships.length;
    let counter = 0;
    allShips.forEach((ship) => {
      if (ship.isSunk(ship.id)) counter += 1;
    });
    if (counter === totalShips) return true;

    return false;
  };

  return {
    grid,
    place,
    receiveAttack,
    allSunk,
    ships,
  };
};

export default Gameboard;
