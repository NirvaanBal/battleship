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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --text-color: lightblue;\r\n  --base-color: rgb(31, 31, 43);\r\n  --attack-color: orangered;\r\n}\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: inherit;\r\n}\r\n\r\nhtml {\r\n  font-family: 'Major Mono Display', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: var(--base-color);\r\n  color: var(--text-color);\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n  margin-top: 30px;\r\n  letter-spacing: 5px;\r\n}\r\n\r\n.boards {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 40px;\r\n}\r\n\r\ntable {\r\n  border-collapse: collapse;\r\n}\r\n\r\ntr:first-child > td {\r\n  border: none;\r\n}\r\n\r\ntd {\r\n  border: solid 1px var(--text-color);\r\n  width: 50px;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 20px;\r\n  text-transform: lowercase;\r\n  font-weight: bold;\r\n}\r\n\r\ntd.human {\r\n  border: solid 7px var(--text-color);\r\n}\r\n\r\ntd.hit {\r\n  border: solid 7px var(--attack-color);\r\n  color: var(--attack-color);\r\n}\r\n\r\ntd:first-child {\r\n  border: none;\r\n}\r\n\r\n.controls {\r\n  font-weight: bold;\r\n  text-align: center;\r\n  margin: 20px 0;\r\n  display: none;\r\n}\r\n\r\n.controls p {\r\n  font-size: 20px;\r\n  color: var(--attack-color);\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.controls button {\r\n  font-weight: bold;\r\n  background-color: var(--text-color);\r\n  color: var(--base-color);\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  padding: 10px;\r\n}\r\n\r\n.creator {\r\n  text-align: center;\r\n  margin: 30px 0;\r\n}\r\n\r\n.creator a {\r\n  text-decoration: none;\r\n  color: var(--attack-color);\r\n  font-weight: bold;\r\n  font-size: 30px;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/index.css"],"names":[],"mappings":"AAEA;EACE,uBAAuB;EACvB,6BAA6B;EAC7B,yBAAyB;AAC3B;;AAEA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,oBAAoB;AACtB;;AAEA;EACE,6CAA6C;AAC/C;;AAEA;EACE,mCAAmC;EACnC,wBAAwB;AAC1B;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,mCAAmC;EACnC,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,qCAAqC;EACrC,0BAA0B;AAC5B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;EACd,aAAa;AACf;;AAEA;EACE,eAAe;EACf,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,mCAAmC;EACnC,wBAAwB;EACxB,YAAY;EACZ,aAAa;EACb,eAAe;EACf,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,cAAc;AAChB;;AAEA;EACE,qBAAqB;EACrB,0BAA0B;EAC1B,iBAAiB;EACjB,eAAe;AACjB","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Major+Mono+Display');\r\n\r\n:root {\r\n  --text-color: lightblue;\r\n  --base-color: rgb(31, 31, 43);\r\n  --attack-color: orangered;\r\n}\r\n\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: inherit;\r\n}\r\n\r\nhtml {\r\n  font-family: 'Major Mono Display', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: var(--base-color);\r\n  color: var(--text-color);\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n  margin-top: 30px;\r\n  letter-spacing: 5px;\r\n}\r\n\r\n.boards {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 40px;\r\n}\r\n\r\ntable {\r\n  border-collapse: collapse;\r\n}\r\n\r\ntr:first-child > td {\r\n  border: none;\r\n}\r\n\r\ntd {\r\n  border: solid 1px var(--text-color);\r\n  width: 50px;\r\n  height: 50px;\r\n  text-align: center;\r\n  font-size: 20px;\r\n  text-transform: lowercase;\r\n  font-weight: bold;\r\n}\r\n\r\ntd.human {\r\n  border: solid 7px var(--text-color);\r\n}\r\n\r\ntd.hit {\r\n  border: solid 7px var(--attack-color);\r\n  color: var(--attack-color);\r\n}\r\n\r\ntd:first-child {\r\n  border: none;\r\n}\r\n\r\n.controls {\r\n  font-weight: bold;\r\n  text-align: center;\r\n  margin: 20px 0;\r\n  display: none;\r\n}\r\n\r\n.controls p {\r\n  font-size: 20px;\r\n  color: var(--attack-color);\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.controls button {\r\n  font-weight: bold;\r\n  background-color: var(--text-color);\r\n  color: var(--base-color);\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  padding: 10px;\r\n}\r\n\r\n.creator {\r\n  text-align: center;\r\n  margin: 30px 0;\r\n}\r\n\r\n.creator a {\r\n  text-decoration: none;\r\n  color: var(--attack-color);\r\n  font-weight: bold;\r\n  font-size: 30px;\r\n}\r\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aEQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2NyZWF0b3JIVE1MLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tL2dhbWVib2FyZEhUTUwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lL0dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyL1BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3V0aWxzL3VwZGF0ZVJvd1RvTnVtZXJhbC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5jc3M/Y2ZlNCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRvckhUTUwgPSAoY3JlYXRvcikgPT4gYDxkaXYgY2xhc3M9XCJjcmVhdG9yXCI+PHA+Y3JlYXRlZCBieSA8YSBocmVmPVwiaHR0cHM6Ly9saW5rZWRpbi5jb20vaW4vbmlydmFhbmJhbFwiIHRhcmdldD1cIl9ibGFua1wiPiR7Y3JlYXRvcn08L2E+PC9wPjwvZGl2PmA7IC8vIHByZXR0aWVyLWlnbm9yZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRvckhUTUw7XHJcbiIsImNvbnN0IGdhbWVib2FyZEhUTUwgPSAoYm9hcmQsIHBsYXllciA9ICdodW1hbicpID0+IHtcclxuICBsZXQgYm9hcmRIVE1MID0gYFxyXG4gICAgPHRhYmxlPlxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRkPjwvdGQ+XHJcbiAgICAgICAgPHRkPjE8L3RkPlxyXG4gICAgICAgIDx0ZD4yPC90ZD5cclxuICAgICAgICA8dGQ+MzwvdGQ+XHJcbiAgICAgICAgPHRkPjQ8L3RkPlxyXG4gICAgICAgIDx0ZD41PC90ZD5cclxuICAgICAgICA8dGQ+NjwvdGQ+XHJcbiAgICAgICAgPHRkPjc8L3RkPlxyXG4gICAgICAgIDx0ZD44PC90ZD5cclxuICAgICAgICA8dGQ+OTwvdGQ+XHJcbiAgICAgICAgPHRkPjEwPC90ZD5cclxuICAgICAgPC90cj5gO1xyXG5cclxuICBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnLCAnaCcsICdpJywgJ2onXS5mb3JFYWNoKChyb3csIGluZGV4KSA9PiB7XHJcbiAgICBib2FyZEhUTUwgKz0gYDx0cj48dGQ+JHtyb3cudG9VcHBlckNhc2UoKX08L3RkPmA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpICs9IDEpIHtcclxuICAgICAgaWYgKGJvYXJkWytgJHtpbmRleH0ke2l9YF0gPT09ICcnIHx8IGJvYXJkWytgJHtpbmRleH0ke2l9YF0gPT09ICdvJykge1xyXG4gICAgICAgIGJvYXJkSFRNTCArPSBgPHRkIGNsYXNzPVwiZ3JpZC1pdGVtXCIgZGF0YS1wbGF5ZXI9XCIke3BsYXllcn1cIj4ke1xyXG4gICAgICAgICAgYm9hcmRbK2Ake2luZGV4fSR7aX1gXVxyXG4gICAgICAgIH08L3RkPmA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgW3NoaXBJZCwgc2hpcEhpdEluZGV4XSA9IGJvYXJkWytgJHtpbmRleH0ke2l9YF0uc3BsaXQoJ18nKTtcclxuICAgICAgICBib2FyZEhUTUwgKz0gYDx0ZCBjbGFzcz1cImdyaWQtaXRlbSAke3BsYXllcn1cIiBkYXRhLXBsYXllcj1cIiR7cGxheWVyfVwiIGRhdGEtaWQ9XCIke3NoaXBJZH1cIiBkYXRhLWhpdD1cIiR7c2hpcEhpdEluZGV4fVwiPiR7XHJcbiAgICAgICAgICBib2FyZFsrYCR7aW5kZXh9JHtpfWBdLmxlbmd0aCA9PT0gMSA/IGJvYXJkWytgJHtpbmRleH0ke2l9YF0gOiAnJ1xyXG4gICAgICAgIH08L3RkPmA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGJvYXJkSFRNTCArPSAnPC90cj4nO1xyXG4gIH0pO1xyXG5cclxuICBib2FyZEhUTUwgKz0gJzwvdGFibGU+JztcclxuXHJcbiAgcmV0dXJuIGJvYXJkSFRNTDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVib2FyZEhUTUw7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi4vZ2FtZWJvYXJkL0dhbWVib2FyZCc7XHJcbmltcG9ydCBTaGlwIGZyb20gJy4uL3NoaXAvU2hpcCc7XHJcblxyXG5jb25zdCBHYW1lID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYWNlUmFuZG9tbHkgPSAoYm9hcmQpID0+IHtcclxuICAgIGxldCBzaGlwU2l6ZXMgPSBbMSwgMiwgMywgNCwgNV07XHJcbiAgICBsZXQgc2hpcHNVcHRvID0gMDtcclxuICAgIHdoaWxlIChzaGlwc1VwdG8gIT09IDUpIHtcclxuICAgICAgY29uc3Qgc2hpcFNpemUgPSBzaGlwU2l6ZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcFNpemVzLmxlbmd0aCldO1xyXG4gICAgICBjb25zdCBzaGlwUG9zID0gWydhJywgJ2QnXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcbiAgICAgIGNvbnN0IHNoaXBMb2MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xyXG4gICAgICBpZiAoYm9hcmQucGxhY2UoU2hpcChzaGlwU2l6ZSksIHNoaXBQb3MsIHNoaXBMb2MpKSB7XHJcbiAgICAgICAgc2hpcFNpemVzID0gc2hpcFNpemVzLmZpbHRlcigoc2l6ZSkgPT4gc2l6ZSAhPT0gc2hpcFNpemUpO1xyXG4gICAgICAgIGJvYXJkLnBsYWNlKFNoaXAoc2hpcFNpemUpLCBzaGlwUG9zLCBzaGlwTG9jKTtcclxuICAgICAgICBzaGlwc1VwdG8gKz0gMTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdhbWVib2FyZEMgPSBHYW1lYm9hcmQoKTtcclxuICBwbGFjZVJhbmRvbWx5KGdhbWVib2FyZEMpO1xyXG4gIC8vIGdhbWVib2FyZEMucGxhY2UoU2hpcCgyKSwgJ2QnLCAxOSk7IC8vIHN1Ym1hcmluZVxyXG4gIC8vIGdhbWVib2FyZEMucGxhY2UoU2hpcCgxKSwgJ2EnLCA4MSk7IC8vIGJvYXRcclxuICAvLyBnYW1lYm9hcmRDLnBsYWNlKFNoaXAoMyksICdkJywgMzIpOyAvLyBjcnVpc2VyXHJcbiAgLy8gZ2FtZWJvYXJkQy5wbGFjZShTaGlwKDQpLCAnYScsIDY1KTsgLy8gZGVzdHJveWVyXHJcbiAgLy8gZ2FtZWJvYXJkQy5wbGFjZShTaGlwKDUpLCAnYScsIDEyKTsgLy8gY2FycmllclxyXG5cclxuICBjb25zdCBnYW1lYm9hcmRIID0gR2FtZWJvYXJkKCk7XHJcbiAgcGxhY2VSYW5kb21seShnYW1lYm9hcmRIKTtcclxuICAvLyBnYW1lYm9hcmRILnBsYWNlKFNoaXAoNSksICdkJywgMTcpO1xyXG4gIC8vIGdhbWVib2FyZEgucGxhY2UoU2hpcCg0KSwgJ2EnLCA3Mik7XHJcbiAgLy8gZ2FtZWJvYXJkSC5wbGFjZShTaGlwKDMpLCAnZCcsIDIpO1xyXG4gIC8vIGdhbWVib2FyZEgucGxhY2UoU2hpcCgyKSwgJ2QnLCA4OCk7XHJcbiAgLy8gZ2FtZWJvYXJkSC5wbGFjZShTaGlwKDEpLCAnYScsIDQxKTtcclxuXHJcbiAgcmV0dXJuIHsgZ2FtZWJvYXJkQywgZ2FtZWJvYXJkSCB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IHVwZGF0ZVJvd1RvTnVtZXJhbCBmcm9tICcuLi91dGlscy91cGRhdGVSb3dUb051bWVyYWwnO1xyXG5cclxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xyXG4gIGNvbnN0IGdyaWQgPSBbXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gICAgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gICAgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICAgICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLFxyXG4gICAgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsXHJcbiAgICAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJyxcclxuICBdOyAvLyBwcmV0dGllci1pZ25vcmVcclxuXHJcbiAgY29uc3Qgc2hpcHMgPSBbXTtcclxuXHJcbiAgY29uc3QgcGxhY2UgPSAoc2hpcCwgZGlyZWN0aW9uLCBwbGFjZUF0KSA9PiB7XHJcbiAgICBjb25zdCBzaXplID0gc2hpcC5zaGlwLmxlbmd0aDtcclxuICAgIGxldCBwbGFjZXNDYWNoZSA9IFtdO1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdhJykge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgKHBsYWNlQXQgJSAxMCA9PT0gOSAmJiBzaXplID09PSAyKSB8fFxyXG4gICAgICAgICgocGxhY2VBdCAlIDEwID09PSA5IHx8IHBsYWNlQXQgJSAxMCA9PT0gOCkgJiYgc2l6ZSA9PT0gMykgfHxcclxuICAgICAgICAoKHBsYWNlQXQgJSAxMCA9PT0gOSB8fCBwbGFjZUF0ICUgMTAgPT09IDggfHwgcGxhY2VBdCAlIDEwID09PSA3KSAmJlxyXG4gICAgICAgICAgc2l6ZSA9PT0gNCkgfHxcclxuICAgICAgICAoKHBsYWNlQXQgJSAxMCA9PT0gOSB8fFxyXG4gICAgICAgICAgcGxhY2VBdCAlIDEwID09PSA4IHx8XHJcbiAgICAgICAgICBwbGFjZUF0ICUgMTAgPT09IDcgfHxcclxuICAgICAgICAgIHBsYWNlQXQgJSAxMCA9PT0gNikgJiZcclxuICAgICAgICAgIHNpemUgPT09IDUpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAoZ3JpZFtwbGFjZUF0XSAhPT0gJycpIHtcclxuICAgICAgICAgIGlmIChwbGFjZXNDYWNoZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHBsYWNlc0NhY2hlLmZvckVhY2goKHBsYWNlQ2FjaGUpID0+IHtcclxuICAgICAgICAgICAgICBncmlkW3BsYWNlQ2FjaGVdID0gJyc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwbGFjZXNDYWNoZSA9IFtdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBncmlkW3BsYWNlQXRdID0gYCR7c2hpcC5pZH1fJHtpfV8ke3NoaXAuc2hpcFtpXX1gO1xyXG4gICAgICAgIHBsYWNlc0NhY2hlLnB1c2gocGxhY2VBdCk7XHJcbiAgICAgICAgcGxhY2VBdCArPSAxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2QnKSB7XHJcbiAgICAgIGlmIChcclxuICAgICAgICBwbGFjZUF0ID49IDkwIHx8XHJcbiAgICAgICAgKHBsYWNlQXQgPj0gODAgJiYgc2l6ZSA9PT0gMykgfHxcclxuICAgICAgICAocGxhY2VBdCA+PSA3MCAmJiBzaXplID09PSA0KSB8fFxyXG4gICAgICAgIChwbGFjZUF0ID49IDYwICYmIHNpemUgPT09IDUpXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChncmlkW3BsYWNlQXRdICE9PSAnJykge1xyXG4gICAgICAgICAgaWYgKHBsYWNlc0NhY2hlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcGxhY2VzQ2FjaGUuZm9yRWFjaCgocGxhY2VDYWNoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGdyaWRbcGxhY2VDYWNoZV0gPSAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBsYWNlc0NhY2hlID0gW107XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PT0gMCkgZ3JpZFtwbGFjZUF0XSA9IGAke3NoaXAuaWR9XyR7aX1fJHtzaGlwLnNoaXBbaV19YDtcclxuICAgICAgICBlbHNlIGdyaWRbcGxhY2VBdF0gPSBgJHtzaGlwLmlkfV8ke2l9XyR7c2hpcC5zaGlwW2ldfWA7XHJcbiAgICAgICAgcGxhY2VzQ2FjaGUucHVzaChwbGFjZUF0KTtcclxuICAgICAgICBwbGFjZUF0ICs9IDEwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hpcHMucHVzaChzaGlwKTtcclxuICAgIHJldHVybiBncmlkO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAocm93LCBjb2wpID0+IHtcclxuICAgIGlmICh1cGRhdGVSb3dUb051bWVyYWwocm93KSA9PT0gZmFsc2UgfHwgY29sID4gMTAgfHwgY29sIDwgMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgcm93ID0gdXBkYXRlUm93VG9OdW1lcmFsKHJvdyk7XHJcbiAgICBjb2wgLT0gMTtcclxuXHJcbiAgICBpZiAoZ3JpZFsrYCR7cm93fSR7Y29sfWBdID09PSAnbycgfHwgZ3JpZFsrYCR7cm93fSR7Y29sfWBdID09PSAneCcpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzaGlwSWQgPSBudWxsO1xyXG4gICAgbGV0IHNoaXBIaXRJbmRleCA9IG51bGw7XHJcblxyXG4gICAgaWYgKGdyaWRbK2Ake3Jvd30ke2NvbH1gXSAhPT0gJycpIHtcclxuICAgICAgW3NoaXBJZCwgc2hpcEhpdEluZGV4XSA9IGdyaWRbK2Ake3Jvd30ke2NvbH1gXS5zcGxpdCgnXycpO1xyXG4gICAgICBncmlkWytgJHtyb3d9JHtjb2x9YF0gPSAneCc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBncmlkWytgJHtyb3d9JHtjb2x9YF0gPSAnbyc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY29vcmRzOiBgJHtyb3d9JHtjb2x9YCxcclxuICAgICAgc2hpcElkLFxyXG4gICAgICBzaGlwSGl0SW5kZXg6IHNoaXBIaXRJbmRleCA/ICtzaGlwSGl0SW5kZXggKyAxIDogbnVsbCxcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgYWxsU3VuayA9IChhbGxTaGlwcykgPT4ge1xyXG4gICAgY29uc3QgdG90YWxTaGlwcyA9IHNoaXBzLmxlbmd0aDtcclxuICAgIGxldCBjb3VudGVyID0gMDtcclxuICAgIGFsbFNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAuaXNTdW5rKHNoaXAuaWQpKSBjb3VudGVyICs9IDE7XHJcbiAgICB9KTtcclxuICAgIGlmIChjb3VudGVyID09PSB0b3RhbFNoaXBzKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdyaWQsXHJcbiAgICBwbGFjZSxcclxuICAgIHJlY2VpdmVBdHRhY2ssXHJcbiAgICBhbGxTdW5rLFxyXG4gICAgc2hpcHMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiY29uc3QgUGxheWVyID0gKHBsYXllciA9ICdodW1hbicpID0+IHtcclxuICBsZXQgYXZhaWxhYmxlTG9jYXRpb25zID0gW107XHJcblxyXG4gIFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZycsICdoJywgJ2knLCAnaiddLmZvckVhY2goKHJvdykgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSArPSAxKSB7XHJcbiAgICAgIGF2YWlsYWJsZUxvY2F0aW9ucy5wdXNoKGAke3Jvd30ke2kgKyAxfWApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBtb3ZlID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbG9jc0xlbiA9IGF2YWlsYWJsZUxvY2F0aW9ucy5sZW5ndGg7XHJcbiAgICBjb25zdCBsb2NhdGlvblVzZWQgPVxyXG4gICAgICBhdmFpbGFibGVMb2NhdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbG9jc0xlbildO1xyXG4gICAgY29uc3Qgcm93ID0gbG9jYXRpb25Vc2VkWzBdO1xyXG4gICAgbGV0IGNvbCA9IGxvY2F0aW9uVXNlZFsxXTtcclxuICAgIGlmIChsb2NhdGlvblVzZWQubGVuZ3RoID09PSAzKSBjb2wgKz0gbG9jYXRpb25Vc2VkWzJdO1xyXG5cclxuICAgIGF2YWlsYWJsZUxvY2F0aW9ucyA9IFsuLi5hdmFpbGFibGVMb2NhdGlvbnNdLmZpbHRlcihcclxuICAgICAgKGxvYykgPT4gbG9jICE9PSBsb2NhdGlvblVzZWRcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHsgcm93LCBjb2wgfTtcclxuICB9O1xyXG5cclxuICByZXR1cm4geyBtb3ZlLCBwbGF5ZXIgfTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcclxuIiwiY29uc3QgU2hpcCA9IChsZW5ndGggPSAyKSA9PiB7XHJcbiAgbGV0IGhpdENvdW50ZXIgPSAwO1xyXG5cclxuICBjb25zdCBpZCA9IE1hdGgucmFuZG9tKCk7XHJcblxyXG4gIGNvbnN0IHNoaXAgPSBuZXcgQXJyYXkobGVuZ3RoKS5maWxsKCcnKTtcclxuXHJcbiAgY29uc3QgaGl0ID0gKHBvcywgc2hpcElkKSA9PiB7XHJcbiAgICBpZiAoK3NoaXBJZCAhPT0gaWQpIHJldHVybiBmYWxzZTtcclxuICAgIGhpdENvdW50ZXIgKz0gMTtcclxuICAgIHNoaXBbcG9zIC0gMV0gPSAneCc7XHJcbiAgICByZXR1cm4gc2hpcDtcclxuICB9O1xyXG5cclxuICBjb25zdCBpc1N1bmsgPSAoc2hpcElkKSA9PiB7XHJcbiAgICBpZiAoK3NoaXBJZCA9PT0gaWQgJiYgaGl0Q291bnRlciA9PT0gbGVuZ3RoKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaWQsXHJcbiAgICBzaGlwLFxyXG4gICAgaGl0LFxyXG4gICAgaXNTdW5rLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCJjb25zdCB1cGRhdGVSb3dUb051bWVyYWwgPSAocm93KSA9PiB7XHJcbiAgc3dpdGNoIChyb3cpIHtcclxuICAgIGNhc2UgJ2EnOlxyXG4gICAgICByZXR1cm4gMDtcclxuICAgIGNhc2UgJ2InOlxyXG4gICAgICByZXR1cm4gMTtcclxuICAgIGNhc2UgJ2MnOlxyXG4gICAgICByZXR1cm4gMjtcclxuICAgIGNhc2UgJ2QnOlxyXG4gICAgICByZXR1cm4gMztcclxuICAgIGNhc2UgJ2UnOlxyXG4gICAgICByZXR1cm4gNDtcclxuICAgIGNhc2UgJ2YnOlxyXG4gICAgICByZXR1cm4gNTtcclxuICAgIGNhc2UgJ2cnOlxyXG4gICAgICByZXR1cm4gNjtcclxuICAgIGNhc2UgJ2gnOlxyXG4gICAgICByZXR1cm4gNztcclxuICAgIGNhc2UgJ2knOlxyXG4gICAgICByZXR1cm4gODtcclxuICAgIGNhc2UgJ2onOlxyXG4gICAgICByZXR1cm4gOTtcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1cGRhdGVSb3dUb051bWVyYWw7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TWFqb3IrTW9ubytEaXNwbGF5KTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcclxcbiAgLS10ZXh0LWNvbG9yOiBsaWdodGJsdWU7XFxyXFxuICAtLWJhc2UtY29sb3I6IHJnYigzMSwgMzEsIDQzKTtcXHJcXG4gIC0tYXR0YWNrLWNvbG9yOiBvcmFuZ2VyZWQ7XFxyXFxufVxcclxcblxcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCB7XFxyXFxuICBmb250LWZhbWlseTogJ01ham9yIE1vbm8gRGlzcGxheScsIHNhbnMtc2VyaWY7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFzZS1jb2xvcik7XFxyXFxuICBjb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XFxyXFxufVxcclxcblxcclxcbmgxIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICBsZXR0ZXItc3BhY2luZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmRzIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBnYXA6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbnRhYmxlIHtcXHJcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxufVxcclxcblxcclxcbnRyOmZpcnN0LWNoaWxkID4gdGQge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG50ZCB7XFxyXFxuICBib3JkZXI6IHNvbGlkIDFweCB2YXIoLS10ZXh0LWNvbG9yKTtcXHJcXG4gIHdpZHRoOiA1MHB4O1xcclxcbiAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IGxvd2VyY2FzZTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG50ZC5odW1hbiB7XFxyXFxuICBib3JkZXI6IHNvbGlkIDdweCB2YXIoLS10ZXh0LWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxudGQuaGl0IHtcXHJcXG4gIGJvcmRlcjogc29saWQgN3B4IHZhcigtLWF0dGFjay1jb2xvcik7XFxyXFxuICBjb2xvcjogdmFyKC0tYXR0YWNrLWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxudGQ6Zmlyc3QtY2hpbGQge1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udHJvbHMge1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBtYXJnaW46IDIwcHggMDtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9scyBwIHtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1hdHRhY2stY29sb3IpO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xzIGJ1dHRvbiB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xcclxcbiAgY29sb3I6IHZhcigtLWJhc2UtY29sb3IpO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgb3V0bGluZTogbm9uZTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5jcmVhdG9yIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIG1hcmdpbjogMzBweCAwO1xcclxcbn1cXHJcXG5cXHJcXG4uY3JlYXRvciBhIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1hdHRhY2stY29sb3IpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBmb250LXNpemU6IDMwcHg7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFDRSx1QkFBdUI7RUFDdkIsNkJBQTZCO0VBQzdCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLDZDQUE2QztBQUMvQzs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFNBQVM7QUFDWDs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQywwQkFBMEI7QUFDNUI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGNBQWM7RUFDZCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsMEJBQTBCO0VBQzFCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQ0FBbUM7RUFDbkMsd0JBQXdCO0VBQ3hCLFlBQVk7RUFDWixhQUFhO0VBQ2IsZUFBZTtFQUNmLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLDBCQUEwQjtFQUMxQixpQkFBaUI7RUFDakIsZUFBZTtBQUNqQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1NYWpvcitNb25vK0Rpc3BsYXknKTtcXHJcXG5cXHJcXG46cm9vdCB7XFxyXFxuICAtLXRleHQtY29sb3I6IGxpZ2h0Ymx1ZTtcXHJcXG4gIC0tYmFzZS1jb2xvcjogcmdiKDMxLCAzMSwgNDMpO1xcclxcbiAgLS1hdHRhY2stY29sb3I6IG9yYW5nZXJlZDtcXHJcXG59XFxyXFxuXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5odG1sIHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnTWFqb3IgTW9ubyBEaXNwbGF5Jywgc2Fucy1zZXJpZjtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXNlLWNvbG9yKTtcXHJcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yKTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZHMge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGdhcDogNDBweDtcXHJcXG59XFxyXFxuXFxyXFxudGFibGUge1xcclxcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG59XFxyXFxuXFxyXFxudHI6Zmlyc3QtY2hpbGQgPiB0ZCB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbnRkIHtcXHJcXG4gIGJvcmRlcjogc29saWQgMXB4IHZhcigtLXRleHQtY29sb3IpO1xcclxcbiAgd2lkdGg6IDUwcHg7XFxyXFxuICBoZWlnaHQ6IDUwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDIwcHg7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogbG93ZXJjYXNlO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbnRkLmh1bWFuIHtcXHJcXG4gIGJvcmRlcjogc29saWQgN3B4IHZhcigtLXRleHQtY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG50ZC5oaXQge1xcclxcbiAgYm9yZGVyOiBzb2xpZCA3cHggdmFyKC0tYXR0YWNrLWNvbG9yKTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1hdHRhY2stY29sb3IpO1xcclxcbn1cXHJcXG5cXHJcXG50ZDpmaXJzdC1jaGlsZCB7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9scyB7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIG1hcmdpbjogMjBweCAwO1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRyb2xzIHAge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgY29sb3I6IHZhcigtLWF0dGFjay1jb2xvcik7XFxyXFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29udHJvbHMgYnV0dG9uIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XFxyXFxuICBjb2xvcjogdmFyKC0tYmFzZS1jb2xvcik7XFxyXFxuICBib3JkZXI6IG5vbmU7XFxyXFxuICBvdXRsaW5lOiBub25lO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNyZWF0b3Ige1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgbWFyZ2luOiAzMHB4IDA7XFxyXFxufVxcclxcblxcclxcbi5jcmVhdG9yIGEge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgY29sb3I6IHZhcigtLWF0dGFjay1jb2xvcik7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGZvbnQtc2l6ZTogMzBweDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2luZGV4LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL2luZGV4LmNzcyc7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZS9HYW1lJztcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL3BsYXllci9QbGF5ZXInO1xyXG5pbXBvcnQgZ2FtZWJvYXJkSFRNTCBmcm9tICcuL2RvbS9nYW1lYm9hcmRIVE1MJztcclxuaW1wb3J0IGNyZWF0b3JIVE1MIGZyb20gJy4vZG9tL2NyZWF0b3JIVE1MJztcclxuXHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpO1xyXG5cclxuLyoqXHJcbiAqIEhFQURFUlxyXG4gKi9cclxuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbmhlYWRlci5jbGFzc0xpc3QuYWRkKCdoZWFkZXInKTtcclxuY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcbmhlYWRpbmcudGV4dENvbnRlbnQgPSAnQmF0dGxlc2hpcCc7XHJcbmhlYWRlci5hcHBlbmRDaGlsZChoZWFkaW5nKTtcclxucm9vdC5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG5cclxuLyoqXHJcbiAqIE1BSU4gQ09OVEVOVCBESVZcclxuICovXHJcbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuY29udGVudC5jbGFzc0xpc3QuYWRkKCdjb250ZW50Jyk7XHJcbnJvb3QuYXBwZW5kQ2hpbGQoY29udGVudCk7XHJcblxyXG4vKipcclxuICogV0lOTkVSXHJcbiAqL1xyXG5jb25zdCBjb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5jb250cm9scy5jbGFzc0xpc3QuYWRkKCdjb250cm9scycpO1xyXG5jb250ZW50LmFwcGVuZENoaWxkKGNvbnRyb2xzKTtcclxuY29uc3Qgd2lubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG5jb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuYnV0dG9uLnRleHRDb250ZW50ID0gJ3BsYXkgYWdhaW4nO1xyXG5jb250cm9scy5hcHBlbmRDaGlsZCh3aW5uZXIpO1xyXG5jb250cm9scy5hcHBlbmRDaGlsZChidXR0b24pO1xyXG5cclxuLyoqXHJcbiAqIEJPQVJEU1xyXG4gKi9cclxuY29uc3QgYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbmJvYXJkcy5jbGFzc0xpc3QuYWRkKCdib2FyZHMnKTtcclxuXHJcbmNvbnN0IGluaXQgPSAoKSA9PiB7XHJcbiAgYm9hcmRzLmlubmVySFRNTCA9ICcnO1xyXG4gIGNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBHYW1lKCkuZ2FtZWJvYXJkQztcclxuICBjb25zdCBteUJvYXJkID0gR2FtZSgpLmdhbWVib2FyZEg7XHJcbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoJ2NvbXB1dGVyJyk7XHJcbiAgY29uc3QgaHVtYW4gPSBQbGF5ZXIoKTtcclxuXHJcbiAgYm9hcmRzLmluc2VydEFkamFjZW50SFRNTChcclxuICAgICdiZWZvcmVlbmQnLFxyXG4gICAgZ2FtZWJvYXJkSFRNTChjb21wdXRlckJvYXJkLmdyaWQsICdjb21wdXRlcicpXHJcbiAgKTtcclxuICBib2FyZHMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBnYW1lYm9hcmRIVE1MKG15Qm9hcmQuZ3JpZCkpO1xyXG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoYm9hcmRzKTtcclxuXHJcbiAgY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1pdGVtW2RhdGEtcGxheWVyPVwiY29tcHV0ZXJcIl0nKTtcclxuICBzaGlwcy5mb3JFYWNoKChzaGlwLCBpbmRleCkgPT4ge1xyXG4gICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJvdyA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC50ZXh0Q29udGVudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBjb2wgPSAoaW5kZXggJSAxMCkgKyAxO1xyXG4gICAgICBjb25zdCBhY3Rpb24gPSBjb21wdXRlckJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xyXG5cclxuICAgICAgaWYgKCFhY3Rpb24pIHJldHVybjtcclxuXHJcbiAgICAgIGlmIChhY3Rpb24uc2hpcElkKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0U2hpcCA9IGNvbXB1dGVyQm9hcmQuc2hpcHMuZmluZChcclxuICAgICAgICAgIChzKSA9PiBzLmlkID09PSArYWN0aW9uLnNoaXBJZFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGFyZ2V0U2hpcC5oaXQoYWN0aW9uLnNoaXBIaXRJbmRleCwgYWN0aW9uLnNoaXBJZCk7XHJcblxyXG4gICAgICAgIGUudGFyZ2V0LnRleHRDb250ZW50ID0gdGFyZ2V0U2hpcC5zaGlwW2FjdGlvbi5zaGlwSGl0SW5kZXggLSAxXTtcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbXB1dGVyQm9hcmQuYWxsU3Vuayhjb21wdXRlckJvYXJkLnNoaXBzKSkge1xyXG4gICAgICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gaHVtYW4ucGxheWVyID09PSAnaHVtYW4nID8gJ1lvdSB3b24nIDogJyc7XHJcbiAgICAgICAgICBjb250cm9scy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZS50YXJnZXQudGV4dENvbnRlbnQgPSAnbyc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvb3JkcyA9IGNvbXB1dGVyLm1vdmUoKTtcclxuICAgICAgY29uc3QgY29tcHV0ZXJBY3Rpb24gPSBteUJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzLnJvdywgY29vcmRzLmNvbCk7XHJcbiAgICAgIGlmIChjb21wdXRlckFjdGlvbi5zaGlwSWQpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXRTaGlwID0gbXlCb2FyZC5zaGlwcy5maW5kKFxyXG4gICAgICAgICAgKHMpID0+IHMuaWQgPT09ICtjb21wdXRlckFjdGlvbi5zaGlwSWRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRhcmdldFNoaXAuaGl0KGNvbXB1dGVyQWN0aW9uLnNoaXBIaXRJbmRleCwgY29tcHV0ZXJBY3Rpb24uc2hpcElkKTtcclxuICAgICAgfVxyXG4gICAgICBib2FyZHMubGFzdENoaWxkLnJlbW92ZSgpO1xyXG4gICAgICBib2FyZHMuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBnYW1lYm9hcmRIVE1MKG15Qm9hcmQuZ3JpZCkpO1xyXG4gICAgICBpZiAobXlCb2FyZC5hbGxTdW5rKG15Qm9hcmQuc2hpcHMpKSB7XHJcbiAgICAgICAgd2lubmVyLnRleHRDb250ZW50ID0gYCR7Y29tcHV0ZXIucGxheWVyfSB3b25gO1xyXG4gICAgICAgIGNvbnRyb2xzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmluaXQoKTtcclxuXHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluaXQpO1xyXG5cclxucm9vdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNyZWF0b3JIVE1MKCfgqKjgqL/gqLDgqLXgqL7gqKMg4Kis4Kmx4KiyINmG2ZDYsdmI2Y7Yp92oINio2YTZkScpKTtcclxuIl0sIm5hbWVzIjpbImNyZWF0b3JIVE1MIiwiY3JlYXRvciIsImdhbWVib2FyZEhUTUwiLCJib2FyZCIsInBsYXllciIsImJvYXJkSFRNTCIsImZvckVhY2giLCJyb3ciLCJpbmRleCIsInRvVXBwZXJDYXNlIiwiaSIsInNoaXBJZCIsInNoaXBIaXRJbmRleCIsInNwbGl0IiwibGVuZ3RoIiwiR2FtZWJvYXJkIiwiU2hpcCIsIkdhbWUiLCJwbGFjZVJhbmRvbWx5Iiwic2hpcFNpemVzIiwic2hpcHNVcHRvIiwic2hpcFNpemUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzaGlwUG9zIiwic2hpcExvYyIsInBsYWNlIiwiZmlsdGVyIiwic2l6ZSIsImdhbWVib2FyZEMiLCJnYW1lYm9hcmRIIiwidXBkYXRlUm93VG9OdW1lcmFsIiwiZ3JpZCIsInNoaXBzIiwic2hpcCIsImRpcmVjdGlvbiIsInBsYWNlQXQiLCJwbGFjZXNDYWNoZSIsInBsYWNlQ2FjaGUiLCJpZCIsInB1c2giLCJyZWNlaXZlQXR0YWNrIiwiY29sIiwiY29vcmRzIiwiYWxsU3VuayIsImFsbFNoaXBzIiwidG90YWxTaGlwcyIsImNvdW50ZXIiLCJpc1N1bmsiLCJQbGF5ZXIiLCJhdmFpbGFibGVMb2NhdGlvbnMiLCJtb3ZlIiwibG9jc0xlbiIsImxvY2F0aW9uVXNlZCIsImxvYyIsImhpdENvdW50ZXIiLCJBcnJheSIsImZpbGwiLCJoaXQiLCJwb3MiLCJyb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhlYWRlciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJoZWFkaW5nIiwidGV4dENvbnRlbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRlbnQiLCJjb250cm9scyIsIndpbm5lciIsImJ1dHRvbiIsImJvYXJkcyIsImluaXQiLCJpbm5lckhUTUwiLCJzdHlsZSIsImRpc3BsYXkiLCJjb21wdXRlckJvYXJkIiwibXlCb2FyZCIsImNvbXB1dGVyIiwiaHVtYW4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiZmlyc3RDaGlsZCIsInRvTG93ZXJDYXNlIiwiYWN0aW9uIiwidGFyZ2V0U2hpcCIsImZpbmQiLCJzIiwiY29tcHV0ZXJBY3Rpb24iLCJsYXN0Q2hpbGQiLCJyZW1vdmUiXSwic291cmNlUm9vdCI6IiJ9