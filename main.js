/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/creatorHTML.js":
/*!********************************!*\
  !*** ./src/dom/creatorHTML.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const creatorHTML = creator => `<div class="creator"><p>created by <a href="https://linkedin.com/in/nirvaanbal" target="_blank">${creator}</a></p></div>`; // prettier-ignore


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (creatorHTML);

/***/ }),

/***/ "./src/dom/gameboardHTML.js":
/*!**********************************!*\
  !*** ./src/dom/gameboardHTML.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const gameboardHTML = (board, player = 'human') => {
  let boardHTML = `
    <table>
      <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
      </tr>`;
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].forEach((row, index) => {
    boardHTML += `<tr><td>${row.toUpperCase()}</td>`;

    for (let i = 0; i < 10; i += 1) {
      if (board[+`${index}${i}`] === '' || board[+`${index}${i}`] === 'o') {
        boardHTML += `<td class="grid-item" data-player="${player}">${board[+`${index}${i}`]}</td>`;
      } else {
        const [shipId, shipHitIndex] = board[+`${index}${i}`].split('_');
        boardHTML += `<td class="grid-item ${player}" data-player="${player}" data-id="${shipId}" data-hit="${shipHitIndex}">${board[+`${index}${i}`].length === 1 ? board[+`${index}${i}`] : ''}</td>`;
      }
    }

    boardHTML += '</tr>';
  });
  boardHTML += '</table>';
  return boardHTML;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameboardHTML);

/***/ }),

/***/ "./src/game/Game.js":
/*!**************************!*\
  !*** ./src/game/Game.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameboard_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gameboard/Gameboard */ "./src/gameboard/Gameboard.js");
/* harmony import */ var _ship_Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ship/Ship */ "./src/ship/Ship.js");



const Game = () => {
  const placeRandomly = board => {
    let shipSizes = [1, 2, 3, 4, 5];
    let shipsUpto = 0;

    while (shipsUpto !== 5) {
      const shipSize = shipSizes[Math.floor(Math.random() * shipSizes.length)];
      const shipPos = ['a', 'd'][Math.floor(Math.random() * 2)];
      const shipLoc = Math.floor(Math.random() * 100);

      if (board.place((0,_ship_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(shipSize), shipPos, shipLoc)) {
        shipSizes = shipSizes.filter(size => size !== shipSize);
        board.place((0,_ship_Ship__WEBPACK_IMPORTED_MODULE_1__["default"])(shipSize), shipPos, shipLoc);
        shipsUpto += 1;
      }
    }
  };

  const gameboardC = (0,_gameboard_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  placeRandomly(gameboardC); // gameboardC.place(Ship(2), 'd', 19); // submarine
  // gameboardC.place(Ship(1), 'a', 81); // boat
  // gameboardC.place(Ship(3), 'd', 32); // cruiser
  // gameboardC.place(Ship(4), 'a', 65); // destroyer
  // gameboardC.place(Ship(5), 'a', 12); // carrier

  const gameboardH = (0,_gameboard_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"])();
  placeRandomly(gameboardH); // gameboardH.place(Ship(5), 'd', 17);
  // gameboardH.place(Ship(4), 'a', 72);
  // gameboardH.place(Ship(3), 'd', 2);
  // gameboardH.place(Ship(2), 'd', 88);
  // gameboardH.place(Ship(1), 'a', 41);

  return {
    gameboardC,
    gameboardH
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/gameboard/Gameboard.js":
/*!************************************!*\
  !*** ./src/gameboard/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_updateRowToNumeral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/updateRowToNumeral */ "./src/utils/updateRowToNumeral.js");


const Gameboard = () => {
  const grid = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']; // prettier-ignore

  const ships = [];

  const place = (ship, direction, placeAt) => {
    const size = ship.ship.length;
    let placesCache = [];

    if (direction === 'a') {
      if (placeAt % 10 === 9 && size === 2 || (placeAt % 10 === 9 || placeAt % 10 === 8) && size === 3 || (placeAt % 10 === 9 || placeAt % 10 === 8 || placeAt % 10 === 7) && size === 4 || (placeAt % 10 === 9 || placeAt % 10 === 8 || placeAt % 10 === 7 || placeAt % 10 === 6) && size === 5) {
        return false;
      }

      for (let i = 0; i < size; i += 1) {
        if (grid[placeAt] !== '') {
          if (placesCache.length > 0) {
            placesCache.forEach(placeCache => {
              grid[placeCache] = '';
            });
            placesCache = [];
          }

          return false;
        }

        grid[placeAt] = `${ship.id}_${i}_${ship.ship[i]}`;
        placesCache.push(placeAt);
        placeAt += 1;
      }
    }

    if (direction === 'd') {
      if (placeAt >= 90 || placeAt >= 80 && size === 3 || placeAt >= 70 && size === 4 || placeAt >= 60 && size === 5) {
        return false;
      }

      for (let i = 0; i < size; i += 1) {
        if (grid[placeAt] !== '') {
          if (placesCache.length > 0) {
            placesCache.forEach(placeCache => {
              grid[placeCache] = '';
            });
            placesCache = [];
          }

          return false;
        }

        if (i === 0) grid[placeAt] = `${ship.id}_${i}_${ship.ship[i]}`;else grid[placeAt] = `${ship.id}_${i}_${ship.ship[i]}`;
        placesCache.push(placeAt);
        placeAt += 10;
      }
    }

    ships.push(ship);
    return grid;
  };

  const receiveAttack = (row, col) => {
    if ((0,_utils_updateRowToNumeral__WEBPACK_IMPORTED_MODULE_0__["default"])(row) === false || col > 10 || col < 1) return false;
    row = (0,_utils_updateRowToNumeral__WEBPACK_IMPORTED_MODULE_0__["default"])(row);
    col -= 1;

    if (grid[+`${row}${col}`] === 'o' || grid[+`${row}${col}`] === 'x') {
      return false;
    }

    let shipId = null;
    let shipHitIndex = null;

    if (grid[+`${row}${col}`] !== '') {
      [shipId, shipHitIndex] = grid[+`${row}${col}`].split('_');
      grid[+`${row}${col}`] = 'x';
    } else {
      grid[+`${row}${col}`] = 'o';
    }

    return {
      coords: `${row}${col}`,
      shipId,
      shipHitIndex: shipHitIndex ? +shipHitIndex + 1 : null
    };
  };

  const allSunk = allShips => {
    const totalShips = ships.length;
    let counter = 0;
    allShips.forEach(ship => {
      if (ship.isSunk(ship.id)) counter += 1;
    });
    if (counter === totalShips) return true;
    return false;
  };

  return {
    grid,
    place,
    receiveAttack,
    allSunk,
    ships
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/player/Player.js":
/*!******************************!*\
  !*** ./src/player/Player.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const Player = (player = 'human') => {
  let availableLocations = [];
  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].forEach(row => {
    for (let i = 0; i < 10; i += 1) {
      availableLocations.push(`${row}${i + 1}`);
    }
  });

  const move = () => {
    const locsLen = availableLocations.length;
    const locationUsed = availableLocations[Math.floor(Math.random() * locsLen)];
    const row = locationUsed[0];
    let col = locationUsed[1];
    if (locationUsed.length === 3) col += locationUsed[2];
    availableLocations = [...availableLocations].filter(loc => loc !== locationUsed);
    return {
      row,
      col
    };
  };

  return {
    move,
    player
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship/Ship.js":
/*!**************************!*\
  !*** ./src/ship/Ship.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

  const isSunk = shipId => {
    if (+shipId === id && hitCounter === length) return true;
    return false;
  };

  return {
    id,
    ship,
    hit,
    isSunk
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/utils/updateRowToNumeral.js":
/*!*****************************************!*\
  !*** ./src/utils/updateRowToNumeral.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const updateRowToNumeral = row => {
  switch (row) {
    case 'a':
      return 0;

    case 'b':
      return 1;

    case 'c':
      return 2;

    case 'd':
      return 3;

    case 'e':
      return 4;

    case 'f':
      return 5;

    case 'g':
      return 6;

    case 'h':
      return 7;

    case 'i':
      return 8;

    case 'j':
      return 9;

    default:
      return false;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateRowToNumeral);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/index.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/index.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Major+Mono+Display);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --text-color: #000;\r\n  --base-color: #fff;\r\n  --attack-color: red;\r\n}\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: inherit;\r\n}\r\n\r\nhtml {\r\n  font-family: 'Major Mono Display', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: var(--base-color);\r\n  color: var(--text-color);\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n  margin-top: 30px;\r\n  letter-spacing: 5px;\r\n}\r\n\r\n.boards {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 40px;\r\n}\r\n\r\ntable {\r\n  border-collapse: collapse;\r\n}\r\n\r\ntr:first-child > td {\r\n  border: none;\r\n}\r\n\r\ntd {\r\n  border: solid 1px gray;\r\n  color: gray;\r\n  width: 40px;\r\n  height: 40px;\r\n  text-align: center;\r\n  font-size: 15px;\r\n  text-transform: lowercase;\r\n  font-weight: bold;\r\n}\r\n\r\ntd.human {\r\n  border: solid 5px var(--text-color);\r\n  color: var(--text-color);\r\n}\r\n\r\ntd.hit {\r\n  border: solid 5px var(--attack-color);\r\n  color: var(--attack-color);\r\n}\r\n\r\ntd:first-child {\r\n  border: none;\r\n}\r\n\r\n.controls {\r\n  font-weight: bold;\r\n  text-align: center;\r\n  margin: 20px 0;\r\n  display: none;\r\n}\r\n\r\n.controls p {\r\n  font-size: 20px;\r\n  color: var(--attack-color);\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.controls button {\r\n  font-weight: bold;\r\n  background-color: var(--text-color);\r\n  color: var(--base-color);\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  padding: 10px;\r\n}\r\n\r\n.creator {\r\n  text-align: center;\r\n  margin: 30px 0;\r\n}\r\n\r\n.creator a {\r\n  text-decoration: none;\r\n  color: var(--attack-color);\r\n  font-weight: bold;\r\n  font-size: 20px;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAEA;EACE,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,oBAAoB;AACtB;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,mCAAmC;EACnC,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,sBAAsB;EACtB,WAAW;EACX,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;EACnC,wBAAwB;AAC1B;;AAEA;EACE,qCAAqC;EACrC,0BAA0B;AAC5B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;EACd,aAAa;AACf;;AAEA;EACE,eAAe;EACf,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,0BAA0B;EAC1B,iBAAiB;EACjB,eAAe;AACjB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display');\r\n\r\n:root {\r\n  --text-color: #000;\r\n  --base-color: #fff;\r\n  --attack-color: red;\r\n}\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: inherit;\r\n}\r\n\r\nhtml {\r\n  font-family: 'Major Mono Display', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: var(--base-color);\r\n  color: var(--text-color);\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n  margin-top: 30px;\r\n  letter-spacing: 5px;\r\n}\r\n\r\n.boards {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 40px;\r\n}\r\n\r\ntable {\r\n  border-collapse: collapse;\r\n}\r\n\r\ntr:first-child > td {\r\n  border: none;\r\n}\r\n\r\ntd {\r\n  border: solid 1px gray;\r\n  color: gray;\r\n  width: 40px;\r\n  height: 40px;\r\n  text-align: center;\r\n  font-size: 15px;\r\n  text-transform: lowercase;\r\n  font-weight: bold;\r\n}\r\n\r\ntd.human {\r\n  border: solid 5px var(--text-color);\r\n  color: var(--text-color);\r\n}\r\n\r\ntd.hit {\r\n  border: solid 5px var(--attack-color);\r\n  color: var(--attack-color);\r\n}\r\n\r\ntd:first-child {\r\n  border: none;\r\n}\r\n\r\n.controls {\r\n  font-weight: bold;\r\n  text-align: center;\r\n  margin: 20px 0;\r\n  display: none;\r\n}\r\n\r\n.controls p {\r\n  font-size: 20px;\r\n  color: var(--attack-color);\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.controls button {\r\n  font-weight: bold;\r\n  background-color: var(--text-color);\r\n  color: var(--base-color);\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  padding: 10px;\r\n}\r\n\r\n.creator {\r\n  text-align: center;\r\n  margin: 30px 0;\r\n}\r\n\r\n.creator a {\r\n  text-decoration: none;\r\n  color: var(--attack-color);\r\n  font-weight: bold;\r\n  font-size: 20px;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _game_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game/Game */ "./src/game/Game.js");
/* harmony import */ var _player_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player/Player */ "./src/player/Player.js");
/* harmony import */ var _dom_gameboardHTML__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom/gameboardHTML */ "./src/dom/gameboardHTML.js");
/* harmony import */ var _dom_creatorHTML__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom/creatorHTML */ "./src/dom/creatorHTML.js");





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
  const computerBoard = (0,_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"])().gameboardC;
  const myBoard = (0,_game_Game__WEBPACK_IMPORTED_MODULE_1__["default"])().gameboardH;
  const computer = (0,_player_Player__WEBPACK_IMPORTED_MODULE_2__["default"])('computer');
  const human = (0,_player_Player__WEBPACK_IMPORTED_MODULE_2__["default"])();
  boards.insertAdjacentHTML('beforeend', (0,_dom_gameboardHTML__WEBPACK_IMPORTED_MODULE_3__["default"])(computerBoard.grid, 'computer'));
  boards.insertAdjacentHTML('beforeend', (0,_dom_gameboardHTML__WEBPACK_IMPORTED_MODULE_3__["default"])(myBoard.grid));
  content.appendChild(boards);
  const ships = document.querySelectorAll('.grid-item[data-player="computer"]');
  ships.forEach((ship, index) => {
    ship.addEventListener('click', e => {
      const row = e.target.parentElement.firstChild.textContent.toLowerCase();
      const col = index % 10 + 1;
      const action = computerBoard.receiveAttack(row, col);
      if (!action) return;

      if (action.shipId) {
        const targetShip = computerBoard.ships.find(s => s.id === +action.shipId);
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
        const targetShip = myBoard.ships.find(s => s.id === +computerAction.shipId);
        targetShip.hit(computerAction.shipHitIndex, computerAction.shipId);
      }

      boards.lastChild.remove();
      boards.insertAdjacentHTML('beforeend', (0,_dom_gameboardHTML__WEBPACK_IMPORTED_MODULE_3__["default"])(myBoard.grid));

      if (myBoard.allSunk(myBoard.ships)) {
        winner.textContent = `${computer.player} won`;
        controls.style.display = 'block';
      }
    });
  });
};

init();
button.addEventListener('click', init);
root.insertAdjacentHTML('beforeend', (0,_dom_creatorHTML__WEBPACK_IMPORTED_MODULE_4__["default"])('ਨਿਰਵਾਣ ਬੱਲ نِروَاݨ بلّ'));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXdCLFdBQXhCLEVBQXFDcEYsNERBQVcsQ0FBQyx3QkFBRCxDQUFoRCxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vY3JlYXRvckhUTUwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20vZ2FtZWJvYXJkSFRNTC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUvR2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC9TaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvdXRpbHMvdXBkYXRlUm93VG9OdW1lcmFsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmNzcz9jZmU0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcmVhdG9ySFRNTCA9IChjcmVhdG9yKSA9PiBgPGRpdiBjbGFzcz1cImNyZWF0b3JcIj48cD5jcmVhdGVkIGJ5IDxhIGhyZWY9XCJodHRwczovL2xpbmtlZGluLmNvbS9pbi9uaXJ2YWFuYmFsXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtjcmVhdG9yfTwvYT48L3A+PC9kaXY+YDsgLy8gcHJldHRpZXItaWdub3JlXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdG9ySFRNTDtcclxuIiwiY29uc3QgZ2FtZWJvYXJkSFRNTCA9IChib2FyZCwgcGxheWVyID0gJ2h1bWFuJykgPT4ge1xyXG4gIGxldCBib2FyZEhUTUwgPSBgXHJcbiAgICA8dGFibGU+XHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGQ+PC90ZD5cclxuICAgICAgICA8dGQ+MTwvdGQ+XHJcbiAgICAgICAgPHRkPjI8L3RkPlxyXG4gICAgICAgIDx0ZD4zPC90ZD5cclxuICAgICAgICA8dGQ+NDwvdGQ+XHJcbiAgICAgICAgPHRkPjU8L3RkPlxyXG4gICAgICAgIDx0ZD42PC90ZD5cclxuICAgICAgICA8dGQ+NzwvdGQ+XHJcbiAgICAgICAgPHRkPjg8L3RkPlxyXG4gICAgICAgIDx0ZD45PC90ZD5cclxuICAgICAgICA8dGQ+MTA8L3RkPlxyXG4gICAgICA8L3RyPmA7XHJcblxyXG4gIFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZycsICdoJywgJ2knLCAnaiddLmZvckVhY2goKHJvdywgaW5kZXgpID0+IHtcclxuICAgIGJvYXJkSFRNTCArPSBgPHRyPjx0ZD4ke3Jvdy50b1VwcGVyQ2FzZSgpfTwvdGQ+YDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkgKz0gMSkge1xyXG4gICAgICBpZiAoYm9hcmRbK2Ake2luZGV4fSR7aX1gXSA9PT0gJycgfHwgYm9hcmRbK2Ake2luZGV4fSR7aX1gXSA9PT0gJ28nKSB7XHJcbiAgICAgICAgYm9hcmRIVE1MICs9IGA8dGQgY2xhc3M9XCJncmlkLWl0ZW1cIiBkYXRhLXBsYXllcj1cIiR7cGxheWVyfVwiPiR7XHJcbiAgICAgICAgICBib2FyZFsrYCR7aW5kZXh9JHtpfWBdXHJcbiAgICAgICAgfTwvdGQ+YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBbc2hpcElkLCBzaGlwSGl0SW5kZXhdID0gYm9hcmRbK2Ake2luZGV4fSR7aX1gXS5zcGxpdCgnXycpO1xyXG4gICAgICAgIGJvYXJkSFRNTCArPSBgPHRkIGNsYXNzPVwiZ3JpZC1pdGVtICR7cGxheWVyfVwiIGRhdGEtcGxheWVyPVwiJHtwbGF5ZXJ9XCIgZGF0YS1pZD1cIiR7c2hpcElkfVwiIGRhdGEtaGl0PVwiJHtzaGlwSGl0SW5kZXh9XCI+JHtcclxuICAgICAgICAgIGJvYXJkWytgJHtpbmRleH0ke2l9YF0ubGVuZ3RoID09PSAxID8gYm9hcmRbK2Ake2luZGV4fSR7aX1gXSA6ICcnXHJcbiAgICAgICAgfTwvdGQ+YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgYm9hcmRIVE1MICs9ICc8L3RyPic7XHJcbiAgfSk7XHJcblxyXG4gIGJvYXJkSFRNTCArPSAnPC90YWJsZT4nO1xyXG5cclxuICByZXR1cm4gYm9hcmRIVE1MO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZ2FtZWJvYXJkSFRNTDtcclxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuLi9nYW1lYm9hcmQvR2FtZWJvYXJkJztcclxuaW1wb3J0IFNoaXAgZnJvbSAnLi4vc2hpcC9TaGlwJztcclxuXHJcbmNvbnN0IEdhbWUgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxhY2VSYW5kb21seSA9IChib2FyZCkgPT4ge1xyXG4gICAgbGV0IHNoaXBTaXplcyA9IFsxLCAyLCAzLCA0LCA1XTtcclxuICAgIGxldCBzaGlwc1VwdG8gPSAwO1xyXG4gICAgd2hpbGUgKHNoaXBzVXB0byAhPT0gNSkge1xyXG4gICAgICBjb25zdCBzaGlwU2l6ZSA9IHNoaXBTaXplc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwU2l6ZXMubGVuZ3RoKV07XHJcbiAgICAgIGNvbnN0IHNoaXBQb3MgPSBbJ2EnLCAnZCddW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcclxuICAgICAgY29uc3Qgc2hpcExvYyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcbiAgICAgIGlmIChib2FyZC5wbGFjZShTaGlwKHNoaXBTaXplKSwgc2hpcFBvcywgc2hpcExvYykpIHtcclxuICAgICAgICBzaGlwU2l6ZXMgPSBzaGlwU2l6ZXMuZmlsdGVyKChzaXplKSA9PiBzaXplICE9PSBzaGlwU2l6ZSk7XHJcbiAgICAgICAgYm9hcmQucGxhY2UoU2hpcChzaGlwU2l6ZSksIHNoaXBQb3MsIHNoaXBMb2MpO1xyXG4gICAgICAgIHNoaXBzVXB0byArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZ2FtZWJvYXJkQyA9IEdhbWVib2FyZCgpO1xyXG4gIHBsYWNlUmFuZG9tbHkoZ2FtZWJvYXJkQyk7XHJcbiAgLy8gZ2FtZWJvYXJkQy5wbGFjZShTaGlwKDIpLCAnZCcsIDE5KTsgLy8gc3VibWFyaW5lXHJcbiAgLy8gZ2FtZWJvYXJkQy5wbGFjZShTaGlwKDEpLCAnYScsIDgxKTsgLy8gYm9hdFxyXG4gIC8vIGdhbWVib2FyZEMucGxhY2UoU2hpcCgzKSwgJ2QnLCAzMik7IC8vIGNydWlzZXJcclxuICAvLyBnYW1lYm9hcmRDLnBsYWNlKFNoaXAoNCksICdhJywgNjUpOyAvLyBkZXN0cm95ZXJcclxuICAvLyBnYW1lYm9hcmRDLnBsYWNlKFNoaXAoNSksICdhJywgMTIpOyAvLyBjYXJyaWVyXHJcblxyXG4gIGNvbnN0IGdhbWVib2FyZEggPSBHYW1lYm9hcmQoKTtcclxuICBwbGFjZVJhbmRvbWx5KGdhbWVib2FyZEgpO1xyXG4gIC8vIGdhbWVib2FyZEgucGxhY2UoU2hpcCg1KSwgJ2QnLCAxNyk7XHJcbiAgLy8gZ2FtZWJvYXJkSC5wbGFjZShTaGlwKDQpLCAnYScsIDcyKTtcclxuICAvLyBnYW1lYm9hcmRILnBsYWNlKFNoaXAoMyksICdkJywgMik7XHJcbiAgLy8gZ2FtZWJvYXJkSC5wbGFjZShTaGlwKDIpLCAnZCcsIDg4KTtcclxuICAvLyBnYW1lYm9hcmRILnBsYWNlKFNoaXAoMSksICdhJywgNDEpO1xyXG5cclxuICByZXR1cm4geyBnYW1lYm9hcmRDLCBnYW1lYm9hcmRIIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG4iLCJpbXBvcnQgdXBkYXRlUm93VG9OdW1lcmFsIGZyb20gJy4uL3V0aWxzL3VwZGF0ZVJvd1RvTnVtZXJhbCc7XHJcblxyXG5jb25zdCBHYW1lYm9hcmQgPSAoKSA9PiB7XHJcbiAgY29uc3QgZ3JpZCA9IFtcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gICAgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gICAgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gICAgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gIF07IC8vIHByZXR0aWVyLWlnbm9yZVxyXG5cclxuICBjb25zdCBzaGlwcyA9IFtdO1xyXG5cclxuICBjb25zdCBwbGFjZSA9IChzaGlwLCBkaXJlY3Rpb24sIHBsYWNlQXQpID0+IHtcclxuICAgIGNvbnN0IHNpemUgPSBzaGlwLnNoaXAubGVuZ3RoO1xyXG4gICAgbGV0IHBsYWNlc0NhY2hlID0gW107XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2EnKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICAocGxhY2VBdCAlIDEwID09PSA5ICYmIHNpemUgPT09IDIpIHx8XHJcbiAgICAgICAgKChwbGFjZUF0ICUgMTAgPT09IDkgfHwgcGxhY2VBdCAlIDEwID09PSA4KSAmJiBzaXplID09PSAzKSB8fFxyXG4gICAgICAgICgocGxhY2VBdCAlIDEwID09PSA5IHx8IHBsYWNlQXQgJSAxMCA9PT0gOCB8fCBwbGFjZUF0ICUgMTAgPT09IDcpICYmXHJcbiAgICAgICAgICBzaXplID09PSA0KSB8fFxyXG4gICAgICAgICgocGxhY2VBdCAlIDEwID09PSA5IHx8XHJcbiAgICAgICAgICBwbGFjZUF0ICUgMTAgPT09IDggfHxcclxuICAgICAgICAgIHBsYWNlQXQgJSAxMCA9PT0gNyB8fFxyXG4gICAgICAgICAgcGxhY2VBdCAlIDEwID09PSA2KSAmJlxyXG4gICAgICAgICAgc2l6ZSA9PT0gNSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChncmlkW3BsYWNlQXRdICE9PSAnJykge1xyXG4gICAgICAgICAgaWYgKHBsYWNlc0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcGxhY2VzQ2FjaGUuZm9yRWFjaCgocGxhY2VDYWNoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGdyaWRbcGxhY2VDYWNoZV0gPSAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBsYWNlc0NhY2hlID0gW107XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyaWRbcGxhY2VBdF0gPSBgJHtzaGlwLmlkfV8ke2l9XyR7c2hpcC5zaGlwW2ldfWA7XHJcbiAgICAgICAgcGxhY2VzQ2FjaGUucHVzaChwbGFjZUF0KTtcclxuICAgICAgICBwbGFjZUF0ICs9IDE7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZCcpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHBsYWNlQXQgPj0gOTAgfHxcclxuICAgICAgICAocGxhY2VBdCA+PSA4MCAmJiBzaXplID09PSAzKSB8fFxyXG4gICAgICAgIChwbGFjZUF0ID49IDcwICYmIHNpemUgPT09IDQpIHx8XHJcbiAgICAgICAgKHBsYWNlQXQgPj0gNjAgJiYgc2l6ZSA9PT0gNSlcclxuICAgICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XHJcbiAgICAgICAgaWYgKGdyaWRbcGxhY2VBdF0gIT09ICcnKSB7XHJcbiAgICAgICAgICBpZiAocGxhY2VzQ2FjaGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwbGFjZXNDYWNoZS5mb3JFYWNoKChwbGFjZUNhY2hlKSA9PiB7XHJcbiAgICAgICAgICAgICAgZ3JpZFtwbGFjZUNhY2hlXSA9ICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGxhY2VzQ2FjaGUgPSBbXTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID09PSAwKSBncmlkW3BsYWNlQXRdID0gYCR7c2hpcC5pZH1fJHtpfV8ke3NoaXAuc2hpcFtpXX1gO1xyXG4gICAgICAgIGVsc2UgZ3JpZFtwbGFjZUF0XSA9IGAke3NoaXAuaWR9XyR7aX1fJHtzaGlwLnNoaXBbaV19YDtcclxuICAgICAgICBwbGFjZXNDYWNoZS5wdXNoKHBsYWNlQXQpO1xyXG4gICAgICAgIHBsYWNlQXQgKz0gMTA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgcmV0dXJuIGdyaWQ7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbCkgPT4ge1xyXG4gICAgaWYgKHVwZGF0ZVJvd1RvTnVtZXJhbChyb3cpID09PSBmYWxzZSB8fCBjb2wgPiAxMCB8fCBjb2wgPCAxKSByZXR1cm4gZmFsc2U7XHJcbiAgICByb3cgPSB1cGRhdGVSb3dUb051bWVyYWwocm93KTtcclxuICAgIGNvbCAtPSAxO1xyXG5cclxuICAgIGlmIChncmlkWytgJHtyb3d9JHtjb2x9YF0gPT09ICdvJyB8fCBncmlkWytgJHtyb3d9JHtjb2x9YF0gPT09ICd4Jykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHNoaXBJZCA9IG51bGw7XHJcbiAgICBsZXQgc2hpcEhpdEluZGV4ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoZ3JpZFsrYCR7cm93fSR7Y29sfWBdICE9PSAnJykge1xyXG4gICAgICBbc2hpcElkLCBzaGlwSGl0SW5kZXhdID0gZ3JpZFsrYCR7cm93fSR7Y29sfWBdLnNwbGl0KCdfJyk7XHJcbiAgICAgIGdyaWRbK2Ake3Jvd30ke2NvbH1gXSA9ICd4JztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGdyaWRbK2Ake3Jvd30ke2NvbH1gXSA9ICdvJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjb29yZHM6IGAke3Jvd30ke2NvbH1gLFxyXG4gICAgICBzaGlwSWQsXHJcbiAgICAgIHNoaXBIaXRJbmRleDogc2hpcEhpdEluZGV4ID8gK3NoaXBIaXRJbmRleCArIDEgOiBudWxsLFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBjb25zdCBhbGxTdW5rID0gKGFsbFNoaXBzKSA9PiB7XHJcbiAgICBjb25zdCB0b3RhbFNoaXBzID0gc2hpcHMubGVuZ3RoO1xyXG4gICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgYWxsU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBpZiAoc2hpcC5pc1N1bmsoc2hpcC5pZCkpIGNvdW50ZXIgKz0gMTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGNvdW50ZXIgPT09IHRvdGFsU2hpcHMpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZ3JpZCxcclxuICAgIHBsYWNlLFxyXG4gICAgcmVjZWl2ZUF0dGFjayxcclxuICAgIGFsbFN1bmssXHJcbiAgICBzaGlwcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJjb25zdCBQbGF5ZXIgPSAocGxheWVyID0gJ2h1bWFuJykgPT4ge1xyXG4gIGxldCBhdmFpbGFibGVMb2NhdGlvbnMgPSBbXTtcclxuXHJcbiAgWydhJywgJ2InLCAnYycsICdkJywgJ2UnLCAnZicsICdnJywgJ2gnLCAnaScsICdqJ10uZm9yRWFjaCgocm93KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcclxuICAgICAgYXZhaWxhYmxlTG9jYXRpb25zLnB1c2goYCR7cm93fSR7aSArIDF9YCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IG1vdmUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsb2NzTGVuID0gYXZhaWxhYmxlTG9jYXRpb25zLmxlbmd0aDtcclxuICAgIGNvbnN0IGxvY2F0aW9uVXNlZCA9XHJcbiAgICAgIGF2YWlsYWJsZUxvY2F0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsb2NzTGVuKV07XHJcbiAgICBjb25zdCByb3cgPSBsb2NhdGlvblVzZWRbMF07XHJcbiAgICBsZXQgY29sID0gbG9jYXRpb25Vc2VkWzFdO1xyXG4gICAgaWYgKGxvY2F0aW9uVXNlZC5sZW5ndGggPT09IDMpIGNvbCArPSBsb2NhdGlvblVzZWRbMl07XHJcblxyXG4gICAgYXZhaWxhYmxlTG9jYXRpb25zID0gWy4uLmF2YWlsYWJsZUxvY2F0aW9uc10uZmlsdGVyKFxyXG4gICAgICAobG9jKSA9PiBsb2MgIT09IGxvY2F0aW9uVXNlZFxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4geyByb3csIGNvbCB9O1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7IG1vdmUsIHBsYXllciB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjb25zdCBTaGlwID0gKGxlbmd0aCA9IDIpID0+IHtcclxuICBsZXQgaGl0Q291bnRlciA9IDA7XHJcblxyXG4gIGNvbnN0IGlkID0gTWF0aC5yYW5kb20oKTtcclxuXHJcbiAgY29uc3Qgc2hpcCA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwoJycpO1xyXG5cclxuICBjb25zdCBoaXQgPSAocG9zLCBzaGlwSWQpID0+IHtcclxuICAgIGlmICgrc2hpcElkICE9PSBpZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaGl0Q291bnRlciArPSAxO1xyXG4gICAgc2hpcFtwb3MgLSAxXSA9ICd4JztcclxuICAgIHJldHVybiBzaGlwO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzU3VuayA9IChzaGlwSWQpID0+IHtcclxuICAgIGlmICgrc2hpcElkID09PSBpZCAmJiBoaXRDb3VudGVyID09PSBsZW5ndGgpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpZCxcclxuICAgIHNoaXAsXHJcbiAgICBoaXQsXHJcbiAgICBpc1N1bmssXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsImNvbnN0IHVwZGF0ZVJvd1RvTnVtZXJhbCA9IChyb3cpID0+IHtcclxuICBzd2l0Y2ggKHJvdykge1xyXG4gICAgY2FzZSAnYSc6XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgY2FzZSAnYic6XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgY2FzZSAnYyc6XHJcbiAgICAgIHJldHVybiAyO1xyXG4gICAgY2FzZSAnZCc6XHJcbiAgICAgIHJldHVybiAzO1xyXG4gICAgY2FzZSAnZSc6XHJcbiAgICAgIHJldHVybiA0O1xyXG4gICAgY2FzZSAnZic6XHJcbiAgICAgIHJldHVybiA1O1xyXG4gICAgY2FzZSAnZyc6XHJcbiAgICAgIHJldHVybiA2O1xyXG4gICAgY2FzZSAnaCc6XHJcbiAgICAgIHJldHVybiA3O1xyXG4gICAgY2FzZSAnaSc6XHJcbiAgICAgIHJldHVybiA4O1xyXG4gICAgY2FzZSAnaic6XHJcbiAgICAgIHJldHVybiA5O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZVJvd1RvTnVtZXJhbDtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYWpvcitNb25vK0Rpc3BsYXkpO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxyXFxuICAtLXRleHQtY29sb3I6ICMwMDA7XFxyXFxuICAtLWJhc2UtY29sb3I6ICNmZmY7XFxyXFxuICAtLWF0dGFjay1jb2xvcjogcmVkO1xcclxcbn1cXHJcXG5cXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbmh0bWwge1xcclxcbiAgZm9udC1mYW1pbHk6ICdNYWpvciBNb25vIERpc3BsYXknLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhc2UtY29sb3IpO1xcclxcbiAgY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG5oMSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkcyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZ2FwOiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG50YWJsZSB7XFxyXFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbn1cXHJcXG5cXHJcXG50cjpmaXJzdC1jaGlsZCA+IHRkIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxudGQge1xcclxcbiAgYm9yZGVyOiBzb2xpZCAxcHggZ3JheTtcXHJcXG4gIGNvbG9yOiBncmF5O1xcclxcbiAgd2lkdGg6IDQwcHg7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDE1cHg7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbnRkLmh1bWFuIHtcXHJcXG4gIGJvcmRlcjogc29saWQgNXB4IHZhcigtLXRleHQtY29sb3IpO1xcclxcbiAgY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG50ZC5oaXQge1xcclxcbiAgYm9yZGVyOiBzb2xpZCA1cHggdmFyKC0tYXR0YWNrLWNvbG9yKTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1hdHRhY2stY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG50ZDpmaXJzdC1jaGlsZCB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9scyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIG1hcmdpbjogMjBweCAwO1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xzIHAge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgY29sb3I6IHZhcigtLWF0dGFjay1jb2xvcik7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29udHJvbHMgYnV0dG9uIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XFxyXFxuICBjb2xvcjogdmFyKC0tYmFzZS1jb2xvcik7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWF0b3Ige1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAzMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5jcmVhdG9yIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6IHZhcigtLWF0dGFjay1jb2xvcik7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2luZGV4LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFFQTtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7RUFDdEIsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsbUNBQW1DO0VBQ25DLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsU0FBUztBQUNYOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxxQ0FBcUM7RUFDckMsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixjQUFjO0VBQ2QsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtFQUNmLDBCQUEwQjtFQUMxQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUNBQW1DO0VBQ25DLHdCQUF3QjtFQUN4QixZQUFZO0VBQ1osYUFBYTtFQUNiLGVBQWU7RUFDZixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHFCQUFxQjtFQUNyQiwwQkFBMEI7RUFDMUIsaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TWFqb3IrTW9ubytEaXNwbGF5Jyk7XFxyXFxuXFxyXFxuOnJvb3Qge1xcclxcbiAgLS10ZXh0LWNvbG9yOiAjMDAwO1xcclxcbiAgLS1iYXNlLWNvbG9yOiAjZmZmO1xcclxcbiAgLS1hdHRhY2stY29sb3I6IHJlZDtcXHJcXG59XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnTWFqb3IgTW9ubyBEaXNwbGF5Jywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLWNvbG9yKTtcXHJcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZHMge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxudGFibGUge1xcclxcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG59XFxyXFxuXFxyXFxudHI6Zmlyc3QtY2hpbGQgPiB0ZCB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbnRkIHtcXHJcXG4gIGJvcmRlcjogc29saWQgMXB4IGdyYXk7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG4gIHdpZHRoOiA0MHB4O1xcclxcbiAgaGVpZ2h0OiA0MHB4O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAxNXB4O1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG50ZC5odW1hbiB7XFxyXFxuICBib3JkZXI6IHNvbGlkIDVweCB2YXIoLS10ZXh0LWNvbG9yKTtcXHJcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxudGQuaGl0IHtcXHJcXG4gIGJvcmRlcjogc29saWQgNXB4IHZhcigtLWF0dGFjay1jb2xvcik7XFxyXFxuICBjb2xvcjogdmFyKC0tYXR0YWNrLWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxudGQ6Zmlyc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udHJvbHMge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBtYXJnaW46IDIwcHggMDtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9scyBwIHtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1hdHRhY2stY29sb3IpO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xzIGJ1dHRvbiB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xcclxcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IpO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5jcmVhdG9yIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIG1hcmdpbjogMzBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY3JlYXRvciBhIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1hdHRhY2stY29sb3IpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9pbmRleC5jc3MnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUvR2FtZSc7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9wbGF5ZXIvUGxheWVyJztcclxuaW1wb3J0IGdhbWVib2FyZEhUTUwgZnJvbSAnLi9kb20vZ2FtZWJvYXJkSFRNTCc7XHJcbmltcG9ydCBjcmVhdG9ySFRNTCBmcm9tICcuL2RvbS9jcmVhdG9ySFRNTCc7XHJcblxyXG5jb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKTtcclxuXHJcbi8qKlxyXG4gKiBIRUFERVJcclxuICovXHJcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyJyk7XHJcbmNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG5oZWFkaW5nLnRleHRDb250ZW50ID0gJ0JhdHRsZXNoaXAnO1xyXG5oZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XHJcbnJvb3QuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuXHJcbi8qKlxyXG4gKiBNQUlOIENPTlRFTlQgRElWXHJcbiAqL1xyXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbmNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnY29udGVudCcpO1xyXG5yb290LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xyXG5cclxuLyoqXHJcbiAqIFdJTk5FUlxyXG4gKi9cclxuY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuY29udHJvbHMuY2xhc3NMaXN0LmFkZCgnY29udHJvbHMnKTtcclxuY29udGVudC5hcHBlbmRDaGlsZChjb250cm9scyk7XHJcbmNvbnN0IHdpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbmJ1dHRvbi50ZXh0Q29udGVudCA9ICdwbGF5IGFnYWluJztcclxuY29udHJvbHMuYXBwZW5kQ2hpbGQod2lubmVyKTtcclxuY29udHJvbHMuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuXHJcbi8qKlxyXG4gKiBCT0FSRFNcclxuICovXHJcbmNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5ib2FyZHMuY2xhc3NMaXN0LmFkZCgnYm9hcmRzJyk7XHJcblxyXG5jb25zdCBpbml0ID0gKCkgPT4ge1xyXG4gIGJvYXJkcy5pbm5lckhUTUwgPSAnJztcclxuICBjb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICBjb25zdCBjb21wdXRlckJvYXJkID0gR2FtZSgpLmdhbWVib2FyZEM7XHJcbiAgY29uc3QgbXlCb2FyZCA9IEdhbWUoKS5nYW1lYm9hcmRIO1xyXG4gIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKCdjb21wdXRlcicpO1xyXG4gIGNvbnN0IGh1bWFuID0gUGxheWVyKCk7XHJcblxyXG4gIGJvYXJkcy5pbnNlcnRBZGphY2VudEhUTUwoXHJcbiAgICAnYmVmb3JlZW5kJyxcclxuICAgIGdhbWVib2FyZEhUTUwoY29tcHV0ZXJCb2FyZC5ncmlkLCAnY29tcHV0ZXInKVxyXG4gICk7XHJcbiAgYm9hcmRzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZ2FtZWJvYXJkSFRNTChteUJvYXJkLmdyaWQpKTtcclxuICBjb250ZW50LmFwcGVuZENoaWxkKGJvYXJkcyk7XHJcblxyXG4gIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtaXRlbVtkYXRhLXBsYXllcj1cImNvbXB1dGVyXCJdJyk7XHJcbiAgc2hpcHMuZm9yRWFjaCgoc2hpcCwgaW5kZXgpID0+IHtcclxuICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCByb3cgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgY29uc3QgY29sID0gKGluZGV4ICUgMTApICsgMTtcclxuICAgICAgY29uc3QgYWN0aW9uID0gY29tcHV0ZXJCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sKTtcclxuXHJcbiAgICAgIGlmICghYWN0aW9uKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoYWN0aW9uLnNoaXBJZCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldFNoaXAgPSBjb21wdXRlckJvYXJkLnNoaXBzLmZpbmQoXHJcbiAgICAgICAgICAocykgPT4gcy5pZCA9PT0gK2FjdGlvbi5zaGlwSWRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRhcmdldFNoaXAuaGl0KGFjdGlvbi5zaGlwSGl0SW5kZXgsIGFjdGlvbi5zaGlwSWQpO1xyXG5cclxuICAgICAgICBlLnRhcmdldC50ZXh0Q29udGVudCA9IHRhcmdldFNoaXAuc2hpcFthY3Rpb24uc2hpcEhpdEluZGV4IC0gMV07XHJcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XHJcblxyXG4gICAgICAgIGlmIChjb21wdXRlckJvYXJkLmFsbFN1bmsoY29tcHV0ZXJCb2FyZC5zaGlwcykpIHtcclxuICAgICAgICAgIHdpbm5lci50ZXh0Q29udGVudCA9IGh1bWFuLnBsYXllciA9PT0gJ2h1bWFuJyA/ICdZb3Ugd29uJyA6ICcnO1xyXG4gICAgICAgICAgY29udHJvbHMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gJ28nO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb29yZHMgPSBjb21wdXRlci5tb3ZlKCk7XHJcbiAgICAgIGNvbnN0IGNvbXB1dGVyQWN0aW9uID0gbXlCb2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcy5yb3csIGNvb3Jkcy5jb2wpO1xyXG4gICAgICBpZiAoY29tcHV0ZXJBY3Rpb24uc2hpcElkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2hpcCA9IG15Qm9hcmQuc2hpcHMuZmluZChcclxuICAgICAgICAgIChzKSA9PiBzLmlkID09PSArY29tcHV0ZXJBY3Rpb24uc2hpcElkXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0YXJnZXRTaGlwLmhpdChjb21wdXRlckFjdGlvbi5zaGlwSGl0SW5kZXgsIGNvbXB1dGVyQWN0aW9uLnNoaXBJZCk7XHJcbiAgICAgIH1cclxuICAgICAgYm9hcmRzLmxhc3RDaGlsZC5yZW1vdmUoKTtcclxuICAgICAgYm9hcmRzLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgZ2FtZWJvYXJkSFRNTChteUJvYXJkLmdyaWQpKTtcclxuICAgICAgaWYgKG15Qm9hcmQuYWxsU3VuayhteUJvYXJkLnNoaXBzKSkge1xyXG4gICAgICAgIHdpbm5lci50ZXh0Q29udGVudCA9IGAke2NvbXB1dGVyLnBsYXllcn0gd29uYDtcclxuICAgICAgICBjb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5pbml0KCk7XHJcblxyXG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbml0KTtcclxuXHJcbnJvb3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjcmVhdG9ySFRNTCgn4Kio4Ki/4Kiw4Ki14Ki+4KijIOCorOCpseCosiDZhtmQ2LHZiNmO2KfdqCDYqNmE2ZEnKSk7XHJcbiJdLCJuYW1lcyI6WyJjcmVhdG9ySFRNTCIsImNyZWF0b3IiLCJnYW1lYm9hcmRIVE1MIiwiYm9hcmQiLCJwbGF5ZXIiLCJib2FyZEhUTUwiLCJmb3JFYWNoIiwicm93IiwiaW5kZXgiLCJ0b1VwcGVyQ2FzZSIsImkiLCJzaGlwSWQiLCJzaGlwSGl0SW5kZXgiLCJzcGxpdCIsImxlbmd0aCIsIkdhbWVib2FyZCIsIlNoaXAiLCJHYW1lIiwicGxhY2VSYW5kb21seSIsInNoaXBTaXplcyIsInNoaXBzVXB0byIsInNoaXBTaXplIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwic2hpcFBvcyIsInNoaXBMb2MiLCJwbGFjZSIsImZpbHRlciIsInNpemUiLCJnYW1lYm9hcmRDIiwiZ2FtZWJvYXJkSCIsInVwZGF0ZVJvd1RvTnVtZXJhbCIsImdyaWQiLCJzaGlwcyIsInNoaXAiLCJkaXJlY3Rpb24iLCJwbGFjZUF0IiwicGxhY2VzQ2FjaGUiLCJwbGFjZUNhY2hlIiwiaWQiLCJwdXNoIiwicmVjZWl2ZUF0dGFjayIsImNvbCIsImNvb3JkcyIsImFsbFN1bmsiLCJhbGxTaGlwcyIsInRvdGFsU2hpcHMiLCJjb3VudGVyIiwiaXNTdW5rIiwiUGxheWVyIiwiYXZhaWxhYmxlTG9jYXRpb25zIiwibW92ZSIsImxvY3NMZW4iLCJsb2NhdGlvblVzZWQiLCJsb2MiLCJoaXRDb3VudGVyIiwiQXJyYXkiLCJmaWxsIiwiaGl0IiwicG9zIiwicm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJoZWFkZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaGVhZGluZyIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiY29udHJvbHMiLCJ3aW5uZXIiLCJidXR0b24iLCJib2FyZHMiLCJpbml0IiwiaW5uZXJIVE1MIiwic3R5bGUiLCJkaXNwbGF5IiwiY29tcHV0ZXJCb2FyZCIsIm15Qm9hcmQiLCJjb21wdXRlciIsImh1bWFuIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicXVlcnlTZWxlY3RvckFsbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImZpcnN0Q2hpbGQiLCJ0b0xvd2VyQ2FzZSIsImFjdGlvbiIsInRhcmdldFNoaXAiLCJmaW5kIiwicyIsImNvbXB1dGVyQWN0aW9uIiwibGFzdENoaWxkIiwicmVtb3ZlIl0sInNvdXJjZVJvb3QiOiIifQ==