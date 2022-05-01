import './index.css';
import Game from './game/Game';
import gameboardHTML from './dom/gameboardHTML';

const root = document.getElementById('root');
const heading = document.createElement('h1');
heading.textContent = 'Battleship';
root.appendChild(heading);

const computerBoard = Game().gameboardC;

root.insertAdjacentHTML('beforeend', gameboardHTML(computerBoard.grid));

// console.log('ਨਿਰਵਾਣ ਬੱਲ نِروَاݨ بلّ');
