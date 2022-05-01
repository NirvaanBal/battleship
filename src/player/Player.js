const Player = (player = 'human') => {
  const cachedLocations = [];

  const move = () => {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if (cachedLocations.includes(`${row}${col}`)) return false;

    cachedLocations.push(`${row}${col}`);
    return `${row}${col}`;
  };

  return { move, cachedLocations, player };
};

export default Player;
