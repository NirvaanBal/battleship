const Ship = (length = 2) => {
  let hitCounter = 0;
  const ship = new Array(length).fill('');

  const hit = (pos) => {
    hitCounter += 1;
    ship[pos - 1] = 'x';
    return ship;
  };

  const isSunk = () => (hitCounter === length ? true : false);

  return { ship, hit, isSunk };
};

export default Ship;
