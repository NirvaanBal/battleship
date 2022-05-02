import Gameboard from '../gameboard/Gameboard';
import Ship from '../ship/Ship';

const Game = () => {
  const placeRandomly = (board) => {
    let shipSizes = [1, 2, 3, 4, 5];
    let shipsUpto = 0;
    while (shipsUpto !== 5) {
      const shipSize = shipSizes[Math.floor(Math.random() * shipSizes.length)];
      const shipPos = ['a', 'd'][Math.floor(Math.random() * 2)];
      const shipLoc = Math.floor(Math.random() * 100);
      if (board.place(Ship(shipSize), shipPos, shipLoc)) {
        shipSizes = shipSizes.filter((size) => size !== shipSize);
        board.place(Ship(shipSize), shipPos, shipLoc);
        shipsUpto += 1;
      }
    }
  };

  const gameboardC = Gameboard();
  placeRandomly(gameboardC);
  // gameboardC.place(Ship(2), 'd', 19); // submarine
  // gameboardC.place(Ship(1), 'a', 81); // boat
  // gameboardC.place(Ship(3), 'd', 32); // cruiser
  // gameboardC.place(Ship(4), 'a', 65); // destroyer
  // gameboardC.place(Ship(5), 'a', 12); // carrier

  const gameboardH = Gameboard();
  placeRandomly(gameboardH);
  // gameboardH.place(Ship(5), 'd', 17);
  // gameboardH.place(Ship(4), 'a', 72);
  // gameboardH.place(Ship(3), 'd', 2);
  // gameboardH.place(Ship(2), 'd', 88);
  // gameboardH.place(Ship(1), 'a', 41);

  return { gameboardC, gameboardH };
};

export default Game;
