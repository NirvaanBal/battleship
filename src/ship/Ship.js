const Ship = (length = 2) => {
  let hitCounter = 0;

  const id = Math.random();

  const ship = new Array(length).fill('');

  const hit = (pos, shipId) => {
    if (+shipId !== id) return false;
    hitCounter += 1;
    ship[pos - 1] = 'x';
    return ship;
  };

  const isSunk = (shipId) => {
    if (+shipId === id && hitCounter === length) return true;
    return false;
  };

  return {
    id,
    ship,
    hit,
    isSunk,
  };
};

export default Ship;
