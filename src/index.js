import './index.css';
import Game from './game/Game';
import gameboardHTML from './dom/gameboardHTML';
import Player from './player/Player';

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
 * WINNER
 */
const controls = document.createElement('div');
controls.classList.add('controls');
content.appendChild(controls);
const winner = document.createElement('p');
const button = document.createElement('button');
button.textContent = 'play again';
controls.appendChild(winner);
controls.appendChild(button);

/**
 * BOARDS
 */
const boards = document.createElement('div');
boards.classList.add('boards');

const init = () => {
  boards.innerHTML = '';
  controls.style.display = 'none';

  const computerBoard = Game().gameboardC;
  const myBoard = Game().gameboardH;
  const computer = Player('computer');
  const human = Player();

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

      if (!action) return;

      if (action.shipId) {
        const targetShip = computerBoard.ships.find(
          (s) => s.id === +action.shipId
        );
        targetShip.hit(action.shipHitIndex, action.shipId);

        e.target.textContent = targetShip.ship[action.shipHitIndex - 1];
        e.target.classList.add('hit');

        if (computerBoard.allSunk(computerBoard.ships)) {
          winner.textContent = human.player === 'human' ? 'You won' : '';
          controls.style.display = 'block';
        }
      } else {
        e.target.textContent = 'o';
      }

      const coords = computer.move();
      const computerAction = myBoard.receiveAttack(coords.row, coords.col);
      if (computerAction.shipId) {
        const targetShip = myBoard.ships.find(
          (s) => s.id === +computerAction.shipId
        );
        targetShip.hit(computerAction.shipHitIndex, computerAction.shipId);
      }
      boards.lastChild.remove();
      boards.insertAdjacentHTML('beforeend', gameboardHTML(myBoard.grid));
      if (myBoard.allSunk(myBoard.ships)) {
        winner.textContent = `${computer.player} won`;
        controls.style.display = 'block';
      }
    });
  });
};

init();

button.addEventListener('click', init);

// ਨਿਰਵਾਣ ਬੱਲ نِروَاݨ بلّ
