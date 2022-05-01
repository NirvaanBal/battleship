import Gameboard from '../gameboard/Gameboard';
import Player from '../player/Player';
import Ship from '../ship/Ship';

const Game = () => {
  const computer = Player('computer');

  const gameboardC = Gameboard();
  gameboardC.place(Ship(2), 'd', 19); // submarine
  gameboardC.place(Ship(3), 'a', 81); // destroyer
  gameboardC.place(Ship(3), 'd', 32); // cruiser
  gameboardC.place(Ship(4), 'a', 65); // naval
  gameboardC.place(Ship(5), 'a', 12); // carrier

  const gameboardH = Gameboard();
  gameboardH.place(Ship(5), 'd', 17);
  gameboardH.place(Ship(4), 'a', 72);
  gameboardH.place(Ship(3), 'd', 2); // cruiser
  gameboardH.place(Ship(2), 'd', 88);
  gameboardH.place(Ship(3), 'a', 41); // destroyer

  return { gameboardC, gameboardH, computer };
};

export default Game;
