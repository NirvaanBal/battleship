const Player = (player = 'human') => {
  let availableLocations = [];

  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].forEach((row) => {
    for (let i = 0; i < 10; i += 1) {
      availableLocations.push(`${row}${i + 1}`);
    }
  });

  const move = () => {
    const locsLen = availableLocations.length;
    const locationUsed =
      availableLocations[Math.floor(Math.random() * locsLen)];
    const row = locationUsed[0];
    let col = locationUsed[1];
    if (locationUsed.length === 3) col += locationUsed[2];

    availableLocations = [...availableLocations].filter(
      (loc) => loc !== locationUsed
    );

    return { row, col };
  };

  return { move, player };
};

export default Player;
