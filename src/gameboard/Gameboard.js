// import Ship from '../ship/Ship';

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

  const place = (ship, direction, placeAt) => {
    const size = ship.ship.length;

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

      for (let i = 0; i < size; i += 1) {
        let placesCache = [];
        if (grid[i] !== '') {
          if (placesCache.length > 0) {
            placesCache.forEach((placeCache) => grid[placeCache] === '');
            placesCache = [];
          }
          // place(size, direction, Math.floor(Math.random() * grid.length));
          return false;
        }
        grid[placeAt] = `${ship.id}-${i}-${ship.ship[i]}`;
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
        let placesCache = [];
        if (grid[i] !== '') {
          if (placesCache.length > 0) {
            placesCache.forEach((placeCache) => grid[placeCache] === '');
            placesCache = [];
          }
          // place(size, direction, Math.floor(Math.random() * grid.length));
          return false;
        }
        if (i === 0) grid[placeAt] = `${ship.id}-${i}-${ship.ship[i]}`;
        else grid[placeAt] = `${ship.id}-${i}-${ship.ship[i]}`;
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

  const updateRowToNumeral = (numeral) => {
    switch (numeral) {
      case 'a':
        return 0;
      case 'b':
        return 1;
      case 'c':
        return 2;
      case 'd':
        return 3;
      case 'e':
        return 4;
      case 'f':
        return 5;
      case 'g':
        return 6;
      case 'h':
        return 7;
      case 'i':
        return 8;
      case 'j':
        return 9;
      default:
        return false;
    }
  };

  const receiveAttack = (row, col) => {
    if (updateRowToNumeral(row) === false || col > 10 || col < 1) return false;
    row = updateRowToNumeral(row);
    col -= 1;
    let shipId = null;
    let shipHitIndex = null;

    if (grid[+`${row}${col}`] !== '') {
      [shipId, shipHitIndex] = grid[+`${row}${col}`].split('-');
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
