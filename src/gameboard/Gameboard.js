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
      // for (let i = placeAt; i < placeAt + size; i += 1) {
      //   if (grid[i] === '') {
      //     grid[i] = `${ship.id} ${ship.ship[0]}`;
      //   } else return false;
      // }
      for (let i = 0; i < size; i += 1) {
        if (grid[i] !== '') return false;
        grid[placeAt] = `${ship.id}-${i}-${ship.ship[i]}`;
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
        if (grid[i] !== '') return false;
        if (i === 0) grid[placeAt] = `${ship.id}-${i}-${ship.ship[i]}`;
        else grid[placeAt] = `${ship.id}-${i}-${ship.ship[i]}`;
        placeAt += 10;
      }
    }

    return grid;
  };

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

  return { grid, place, receiveAttack };
};

export default Gameboard;
