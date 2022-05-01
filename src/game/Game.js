import Gameboard from '../gameboard/Gameboard';
// import Player from '../player/Player';
import Ship from '../ship/Ship';

const Game = () => {
  // const human = Player();
  // const computer = Player('computer');

  const gameboardC = Gameboard();
  gameboardC.place(Ship(2), 'd', 19);
  gameboardC.place(Ship(2), 'a', 81);
  gameboardC.place(Ship(3), 'd', 32);
  gameboardC.place(Ship(4), 'a', 65);
  gameboardC.place(Ship(5), 'a', 12);

  const gameboardH = Gameboard();
  gameboardH.place(Ship(5), 'd', 17);
  gameboardH.place(Ship(4), 'a', 72);
  gameboardH.place(Ship(2), 'd', 2);
  gameboardH.place(Ship(2), 'd', 87);
  gameboardH.place(Ship(3), 'a', 41);

  return { gameboardC, gameboardH };
};

export default Game;
