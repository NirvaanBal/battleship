import './index.css';
import Game from './game/Game';
import gameboardHTML from './dom/gameboardHTML';

const root = document.getElementById('root');

/**
 * HEADER
 */
const header = document.createElement('div');
header.classList.add('header');
const heading = document.createElement('h1');
heading.textContent = 'Battleship';
header.appendChild(heading);
root.appendChild(header);

/**
 * MAIN CONTENT DIV
 */
const content = document.createElement('div');
content.classList.add('content');
root.appendChild(content);

/**
 * BOARDS
 */
const boards = document.createElement('div');
boards.classList.add('boards');
const computerBoard = Game().gameboardC;
const myBoard = Game().gameboardH;

boards.insertAdjacentHTML(
  'beforeend',
  gameboardHTML(computerBoard.grid, 'computer')
);
boards.insertAdjacentHTML('beforeend', gameboardHTML(myBoard.grid));
content.appendChild(boards);

const ships = document.querySelectorAll('.grid-item[data-player="computer"]');
ships.forEach((ship, index) => {
  ship.addEventListener('click', (e) => {
    const row = e.target.parentElement.firstChild.textContent.toLowerCase();
    const col = (index % 10) + 1;
    const action = computerBoard.receiveAttack(row, col);
    if (action.shipId) {
      e.target.textContent = 'x';
      const targetShip = computerBoard.ships.find(
        (s) => s.id === +action.shipId
      );
      targetShip.hit(action.shipHitIndex, action.shipId);
      // myBoard.grid[+Game().computer.move()] = 'o';
    } else {
      e.target.textContent = 'o';
      // console.log(Game().computer.move());
    }
  });
});

// ਨਿਰਵਾਣ ਬੱਲ نِروَاݨ بلّ
