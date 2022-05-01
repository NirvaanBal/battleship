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

  // const flow = ['a', 'd'][Math.floor(Math.random() * 2)];
  // let placeAt = Math.floor(Math.random() * grid.length);

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

    return grid;
  };

  // const randomlyPlaceShips = () => {
  //   [2, 3, 3, 4, 5].forEach((size) => {
  //     let flow = ['a', 'd'][Math.floor(Math.random() * 2)];
  //     let location = Math.floor(Math.random() * grid.length);

  //     let placed = false;
  //     while (placed === false) {
  //       placed = place(Ship(size), flow, location);
  //       flow = ['a', 'd'][Math.floor(Math.random() * 2)];
  //       location = Math.floor(Math.random() * grid.length);
  //     }
  //   });

  //   return true;
  // };

  const receiveAttack = (row, col) => {
    if (updateRowToNumeral(row) === false || col > 10 || col < 1) return false;
    row = updateRowToNumeral(row);
    col -= 1;
    let shipId = null;
    let shipHitIndex = null;

    if (grid[+`${row}${col}`] !== '') {
      [shipId, shipHitIndex] = grid[+`${row}${col}`].split('_');
    }

    return {
      coords: `${row}${col}`,
      shipId,
      shipHitIndex: shipHitIndex ? +shipHitIndex + 1 : null,
    };
  };

  const allSunk = () => {
    let counter = 0;
    grid.forEach((location) => {
      if (location.split('-')[2] === 'x') counter += 1;
    });

    if (counter === 17) return true;
    return false;
  };

  return {
    grid,
    place,
    // randomlyPlaceShips,
    receiveAttack,
    allSunk,
  };
};

export default Gameboard;
