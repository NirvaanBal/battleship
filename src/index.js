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

boards.insertAdjacentHTML('beforeend', gameboardHTML(computerBoard.grid));
boards.insertAdjacentHTML('beforeend', gameboardHTML(myBoard.grid));
content.appendChild(boards);

// console.log('ਨਿਰਵਾਣ ਬੱਲ نِروَاݨ بلّ');
