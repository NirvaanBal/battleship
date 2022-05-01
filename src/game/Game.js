import Gameboard from '../gameboard/Gameboard';
// import Player from '../player/Player';
import Ship from '../ship/Ship';

const Game = () => {
  // const human = Player();
  // const computer = Player('computer');

  const gameboardC = Gameboard();
  gameboardC.place(Ship(2), 'd', 4);
  gameboardC.place(Ship(2), 'a', 88);
  gameboardC.place(Ship(3), 'd', 23);
  gameboardC.place(Ship(4), 'a', 66);
  gameboardC.place(Ship(5), 'a', 33);

  const gameboardH = Gameboard();

  return { gameboardC, gameboardH };
};

export default Game;
