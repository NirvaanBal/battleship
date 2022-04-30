import updateRowToNumeral from '../utils/updateRowToNumeral';

const Player = (player = 'human') => {
  const cachedLocations = [];

  const whoWillMove = player;

  const move = (row, col) => {
    if (player === 'computer') {
      if (cachedLocations.includes(`${row}${col}`)) return false;

      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);

      cachedLocations.push(`${row}${col}`);
      return `${row}${col}`;
    }

    row = updateRowToNumeral(row);
    col -= 1;

    return `${row}${col}`;
  };

  return { move, whoWillMove };
};

export default Player;
