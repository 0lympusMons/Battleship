/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ "./src/modules/DOM.js":
      /*!****************************!*\
  !*** ./src/modules/DOM.js ***!
  \****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
        /* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Events */ "./src/modules/Events.js");
        /* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
        function _typeof(o) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                    return typeof o;
                  }
                : function (o) {
                    return o &&
                      "function" == typeof Symbol &&
                      o.constructor === Symbol &&
                      o !== Symbol.prototype
                      ? "symbol"
                      : typeof o;
                  }),
            _typeof(o)
          );
        }
        var _class;
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          );
        }
        function _nonIterableRest() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (
            n === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        function _iterableToArrayLimit(r, l) {
          var t =
            null == r
              ? null
              : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
                r["@@iterator"];
          if (null != t) {
            var e,
              n,
              i,
              u,
              a = [],
              f = !0,
              o = !1;
            try {
              if (((i = (t = t.call(r)).next), 0 === l)) {
                if (Object(t) !== t) return;
                f = !1;
              } else
                for (
                  ;
                  !(f = (e = i.call(t)).done) &&
                  (a.push(e.value), a.length !== l);
                  f = !0
                );
            } catch (r) {
              (o = !0), (n = r);
            } finally {
              try {
                if (
                  !f &&
                  null != t["return"] &&
                  ((u = t["return"]()), Object(u) !== u)
                )
                  return;
              } finally {
                if (o) throw n;
              }
            }
            return a;
          }
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(
              target,
              _toPropertyKey(descriptor.key),
              descriptor
            );
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", { writable: false });
          return Constructor;
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, "string");
          return _typeof(key) === "symbol" ? key : String(key);
        }
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== "object" || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (_typeof(res) !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (hint === "string" ? String : Number)(input);
        }
        function _classStaticPrivateMethodGet(
          receiver,
          classConstructor,
          method
        ) {
          _classCheckPrivateStaticAccess(receiver, classConstructor);
          return method;
        }
        function _classCheckPrivateStaticAccess(receiver, classConstructor) {
          if (receiver !== classConstructor) {
            throw new TypeError("Private static access of wrong provenance");
          }
        }

        var DOM = /*#__PURE__*/ (function () {
          function DOM() {
            _classCallCheck(this, DOM);
          }
          _createClass(DOM, null, [
            {
              key: "initialize",
              value: function initialize() {},
            },
            {
              key: "createGameboard",
              value: function createGameboard(id) {
                var gameboardDOM = document.createElement("div");
                var gameboardHTML = "";
                for (var row = 0; row < 10; row++) {
                  for (var col = 0; col < 10; col++) {
                    gameboardHTML += '<div class="cell" data-row="'
                      .concat(row, '" data-col="')
                      .concat(col, '"></div>');
                  }
                }
                gameboardDOM.innerHTML = gameboardHTML;
                gameboardDOM.classList.add("gameboard");
                gameboardDOM.setAttribute("id", id);
                return gameboardDOM;
              },

              // 1: ships placement
            },
            {
              key: "initializeShipsPlacement",
              value: function initializeShipsPlacement(id, gameboard) {
                var isVertical = false;
                DOM.listenForCellEvents("player", "mouseover", function (cell) {
                  // get row and col attr of the cell
                  var rowValue = cell.dataset.row; // "2"
                  var colValue = cell.dataset.col; // "3"

                  // convert from string to number
                  var rowNumber = parseInt(rowValue, 10); // 2
                  var colNumber = parseInt(colValue, 10); // 3

                  DOM.placeShip(
                    gameboard.name,
                    ship,
                    [rowNumber, colNumber],
                    isVertical
                  );
                  DOM.darkenCells(cell, (ship.length = 3), isVertical);
                });

                //after all 5 ships are placed, remove event listener
              },

              // todo: fix glowCells not adjusting according to length
            },
            {
              key: "glowCells",
              value: function glowCells(length, isVertical) {
                var playerBoard = document.getElementById("player");
                var cells = Array.from(
                  playerBoard.getElementsByClassName("cell")
                );
                var hoveredCells = [];
                function findCellByDataAttributes(row, col) {
                  return cells.find(function (cell) {
                    return (
                      cell.dataset.row === row.toString() &&
                      cell.dataset.col === col.toString()
                    );
                  });
                }

                // Add "mouseover" and "mouseout" event listeners to each cell
                cells.forEach(function (cell) {
                  cell.addEventListener(
                    "mouseover",
                    _classStaticPrivateMethodGet(
                      DOM,
                      DOM,
                      _handleMouseOver
                    ).call(DOM, event, hoveredCells)
                  );
                  cell.addEventListener(
                    "mouseout",
                    _classStaticPrivateMethodGet(
                      DOM,
                      DOM,
                      _handleMouseOut
                    ).call(DOM, hoveredCells)
                  );
                });
              },
            },
            {
              key: "removeGlowCellsListener",
              value: function removeGlowCellsListener() {
                var playerBoard = document.getElementById("player");
                var cells = Array.from(
                  playerBoard.getElementsByClassName("cell")
                );

                // Remove "mouseover" and "mouseout" event listeners from each cell
                cells.forEach(function (cell) {
                  cell.removeEventListener(
                    "mouseover",
                    _classStaticPrivateMethodGet(DOM, DOM, _handleMouseOver)
                  );
                  cell.removeEventListener(
                    "mouseout",
                    _classStaticPrivateMethodGet(DOM, DOM, _handleMouseOut)
                  );
                });
              },
            },
            {
              key: "placeShip",
              value:
                /* 
    placeShip([0,0], length, isVertical)
    */
                function placeShip(length, coords, isVertical) {
                  var playerBoard = document.getElementById("player");
                  var cells = Array.from(playerBoard.children);
                  var _coords = _slicedToArray(coords, 2),
                    startRow = _coords[0],
                    startCol = _coords[1];
                  for (var i = 0; i < length; i++) {
                    var row = startRow;
                    var col = startCol;
                    if (isVertical) {
                      row += i;
                    } else {
                      col += i;
                    }
                    var index = row * 10 + col; // Assuming the board is a 10x10 grid
                    var cell = cells[index];
                    if (cell) {
                      cell.classList.add("ship");
                    }
                  }
                },
            },
            {
              key: "stopShipsPlacement",
              value: function stopShipsPlacement() {},

              // Extract the logic to get row and col values from a cell
            },
            {
              key: "displayGameboard",
              value: function displayGameboard() {
                var _ref =
                    arguments.length > 0 && arguments[0] !== undefined
                      ? arguments[0]
                      : gameboard,
                  map = _ref.map,
                  gameState = _ref.gameState;
                var id = arguments.length > 1 ? arguments[1] : undefined;
                var showShips = arguments.length > 2 ? arguments[2] : undefined;
                var playerBoard = document.getElementById(id);
                var cells = Array.from(playerBoard.children);
                cells.forEach(function (cell) {
                  var row = parseInt(cell.dataset.row, 10);
                  var col = parseInt(cell.dataset.col, 10);

                  // Check if the cell is a missed square
                  if (
                    gameState.missedSquares.some(function (_ref2) {
                      var _ref3 = _slicedToArray(_ref2, 2),
                        missedRow = _ref3[0],
                        missedCol = _ref3[1];
                      return row === missedRow && col === missedCol;
                    })
                  ) {
                    cell.classList.add("missed");
                  } else {
                    cell.classList.remove("missed");
                  }

                  // Check if the cell is a hitted square
                  if (
                    gameState.hittedSquares.some(function (_ref4) {
                      var _ref5 = _slicedToArray(_ref4, 2),
                        hitRow = _ref5[0],
                        hitCol = _ref5[1];
                      return row === hitRow && col === hitCol;
                    })
                  ) {
                    cell.classList.add("hitted");
                  } else {
                    cell.classList.remove("hitted");
                  }

                  // Check if the cell is part of a ship
                  if (showShips) {
                    var key = "".concat(row, ",").concat(col);
                    if (
                      gameState.shipsAndTheirOccupiedSpaces.hasOwnProperty(key)
                    ) {
                      // The cell is part of a ship
                      cell.classList.add("ship");
                    } else {
                      // The cell is not part of a ship
                      cell.classList.remove("ship");
                    }
                  }
                });
              },
            },
            {
              key: "darkenCells",
              value: function darkenCells(cell, length) {
                // for()
                cell.classList.add("dark");
              },

              /**
               *
               * @param {Node} cell
               * @param {string} color Option: "dark" or "red"
               */
            },
            {
              key: "darkenCell",
              value: function darkenCell(cell, color) {
                cell.classList.add("".concat(color));
              },
            },
            {
              key: "rotateShip",
              value: function rotateShip() {},
            },
            {
              key: "attackShip",
              value: function attackShip() {},

              // * Event Listeners
              /**
               * @listenForCellEvents
               * @param {string} id The id attribute of the gameboard
               * @param {string} _event The name of the event to listen to
               * */

              // Example usage: listenForClicks("playerBoard");
            },
            {
              key: "listenForCellEvents",
              value: function listenForCellEvents(id, _event) {
                var fn =
                  arguments.length > 2 && arguments[2] !== undefined
                    ? arguments[2]
                    : function (cell) {
                        console.log(cell);
                      };
                var gameboard = document.getElementById("".concat(id));
                var cells = gameboard.querySelectorAll(".cell");
                cells.forEach(function (cell) {
                  cell.addEventListener("".concat(_event), function () {
                    fn(cell);
                  });
                });
              },
            },
            {
              key: "listenForGameboardClicks",
              value: function listenForGameboardClicks() {
                var addClickEvent = function addClickEvent(board) {
                  board.addEventListener("click", function (e) {
                    var gameboardClicked = board;
                    var cell = e.target;
                    var _classStaticPrivateMe = _classStaticPrivateMethodGet(
                        DOM,
                        DOM,
                        _getRowAndColFromCell
                      ).call(DOM, cell),
                      rowNumber = _classStaticPrivateMe.rowNumber,
                      colNumber = _classStaticPrivateMe.colNumber;
                    _Events__WEBPACK_IMPORTED_MODULE_1__["default"].emit(
                      "gameboard click",
                      board,
                      cell,
                      rowNumber,
                      colNumber
                    );
                  });
                };
                var playerBoard = document.getElementById("player");
                var enemyBoard = document.getElementById("enemy");
                addClickEvent(playerBoard);
                addClickEvent(enemyBoard);
              },
            },
            {
              key: "displayInstruction",
              value: function displayInstruction() {},
            },
            {
              key: "updateInstruction",
              value: function updateInstruction(_shipName, _shipLength) {
                var shipName = document.getElementById(
                  "placing-ships__shipName"
                );
                shipName.innerText = "Ship: ".concat(_shipName);
                var shipLength = document.getElementById(
                  "placing-ships__shipLength"
                );
                shipLength.innerText = "Length: ".concat(_shipLength);
              },

              //TODO: WIP
            },
            {
              key: "announceWinner",
              value: function announceWinner(results) {
                var modalBackground = document.querySelector(".modal__bg");
                var winnerText = document.querySelector(".winner__text");
                var restartButton = document.getElementById(
                  "restart__button--modal"
                );
                restartButton.onclick = function () {
                  location.reload();
                };
                modalBackground.style.display = "flex";
                winnerText.innerText = results;
              },
            },
          ]);
          return DOM;
        })();
        _class = DOM;
        function _handleMouseOver(event, hoveredCells) {
          // Extract row and col from the dataset of the hovered cell
          var _event$target$dataset = event.target.dataset,
            row = _event$target$dataset.row,
            col = _event$target$dataset.col;

          // Reset the "dark" class for the previously hovered cells
          _classStaticPrivateMethodGet(_class, _class, _resetDarkClass).call(
            _class,
            hoveredCells
          );

          // Determine varying and constant coordinates based on isVertical
          var varyingCoord = isVertical ? parseInt(row, 10) : parseInt(col, 10);
          var constantCoord = isVertical
            ? parseInt(col, 10)
            : parseInt(row, 10);

          // Add the "dark" class to the specified range of cells
          for (var i = varyingCoord; i < varyingCoord + length; i++) {
            var currentCell = isVertical
              ? findCellByDataAttributes(i, constantCoord)
              : findCellByDataAttributes(constantCoord, i);
            if (currentCell) {
              currentCell.classList.add("dark");
              hoveredCells.push(currentCell);
            }
          }
        }
        function _handleMouseOut(hoveredCells) {
          // Reset the "dark" class for the previously hovered cells

          _classStaticPrivateMethodGet(_class, _class, _resetDarkClass).call(
            _class,
            hoveredCells
          );
        }
        function _resetDarkClass(hoveredCells) {
          hoveredCells.forEach(function (cell) {
            cell.classList.remove("dark");
          });
          hoveredCells = [];
        }
        function _getRowAndColFromCell(cell) {
          var rowValue = cell.dataset.row;
          var colValue = cell.dataset.col;
          var rowNumber = parseInt(rowValue, 10);
          var colNumber = parseInt(colValue, 10);
          return {
            rowNumber: rowNumber,
            colNumber: colNumber,
          };
        }
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = DOM;

        /***/
      },

    /***/ "./src/modules/Events.js":
      /*!*******************************!*\
  !*** ./src/modules/Events.js ***!
  \*******************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! events */ "./node_modules/events/events.js");
        /* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default =
          /*#__PURE__*/ __webpack_require__.n(
            events__WEBPACK_IMPORTED_MODULE_0__
          );

        var eventEmitter =
          new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          eventEmitter;

        /* 
emits

DOM: "gameboard click"

*/

        // map update

        /* export default class Events {
  static eventEmitter = new EventEmitter();
} */

        /***/
      },

    /***/ "./src/modules/Gameboard.js":
      /*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _Ship_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./Ship.js */ "./src/modules/Ship.js");
        /* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./Player.js */ "./src/modules/Player.js");
        /* harmony import */ var _Events_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./Events.js */ "./src/modules/Events.js");
        function _typeof(o) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                    return typeof o;
                  }
                : function (o) {
                    return o &&
                      "function" == typeof Symbol &&
                      o.constructor === Symbol &&
                      o !== Symbol.prototype
                      ? "symbol"
                      : typeof o;
                  }),
            _typeof(o)
          );
        }
        function ownKeys(e, r) {
          var t = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var o = Object.getOwnPropertySymbols(e);
            r &&
              (o = o.filter(function (r) {
                return Object.getOwnPropertyDescriptor(e, r).enumerable;
              })),
              t.push.apply(t, o);
          }
          return t;
        }
        function _objectSpread(e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = null != arguments[r] ? arguments[r] : {};
            r % 2
              ? ownKeys(Object(t), !0).forEach(function (r) {
                  _defineProperty(e, r, t[r]);
                })
              : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(
                    e,
                    Object.getOwnPropertyDescriptors(t)
                  )
                : ownKeys(Object(t)).forEach(function (r) {
                    Object.defineProperty(
                      e,
                      r,
                      Object.getOwnPropertyDescriptor(t, r)
                    );
                  });
          }
          return e;
        }
        function _defineProperty(obj, key, value) {
          key = _toPropertyKey(key);
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
          );
        }
        function _nonIterableSpread() {
          throw new TypeError(
            "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        function _iterableToArray(iter) {
          if (
            (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null) ||
            iter["@@iterator"] != null
          )
            return Array.from(iter);
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }
        function _slicedToArray(arr, i) {
          return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
          );
        }
        function _nonIterableRest() {
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (
            n === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
          )
            return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;
          for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
          return arr2;
        }
        function _iterableToArrayLimit(r, l) {
          var t =
            null == r
              ? null
              : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
                r["@@iterator"];
          if (null != t) {
            var e,
              n,
              i,
              u,
              a = [],
              f = !0,
              o = !1;
            try {
              if (((i = (t = t.call(r)).next), 0 === l)) {
                if (Object(t) !== t) return;
                f = !1;
              } else
                for (
                  ;
                  !(f = (e = i.call(t)).done) &&
                  (a.push(e.value), a.length !== l);
                  f = !0
                );
            } catch (r) {
              (o = !0), (n = r);
            } finally {
              try {
                if (
                  !f &&
                  null != t["return"] &&
                  ((u = t["return"]()), Object(u) !== u)
                )
                  return;
              } finally {
                if (o) throw n;
              }
            }
            return a;
          }
        }
        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(
              target,
              _toPropertyKey(descriptor.key),
              descriptor
            );
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", { writable: false });
          return Constructor;
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, "string");
          return _typeof(key) === "symbol" ? key : String(key);
        }
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== "object" || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (_typeof(res) !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (hint === "string" ? String : Number)(input);
        }
        function _classPrivateMethodInitSpec(obj, privateSet) {
          _checkPrivateRedeclaration(obj, privateSet);
          privateSet.add(obj);
        }
        function _classPrivateFieldInitSpec(obj, privateMap, value) {
          _checkPrivateRedeclaration(obj, privateMap);
          privateMap.set(obj, value);
        }
        function _checkPrivateRedeclaration(obj, privateCollection) {
          if (privateCollection.has(obj)) {
            throw new TypeError(
              "Cannot initialize the same private elements twice on an object"
            );
          }
        }
        function _classPrivateMethodGet(receiver, privateSet, fn) {
          if (!privateSet.has(receiver)) {
            throw new TypeError(
              "attempted to get private field on non-instance"
            );
          }
          return fn;
        }
        function _classPrivateFieldGet(receiver, privateMap) {
          var descriptor = _classExtractFieldDescriptor(
            receiver,
            privateMap,
            "get"
          );
          return _classApplyDescriptorGet(receiver, descriptor);
        }
        function _classExtractFieldDescriptor(receiver, privateMap, action) {
          if (!privateMap.has(receiver)) {
            throw new TypeError(
              "attempted to " + action + " private field on non-instance"
            );
          }
          return privateMap.get(receiver);
        }
        function _classApplyDescriptorGet(receiver, descriptor) {
          if (descriptor.get) {
            return descriptor.get.call(receiver);
          }
          return descriptor.value;
        }

        /* 
TODO
Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.

//1. Gameboards should be able to place ships at specific coordinates by calling the ship factory function.

//2. Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

3. Gameboards should keep track of missed attacks so they can display them properly.

4. Gameboards should be able to report whether or not all of their ships have been sunk.

*/
        var _createGameState = /*#__PURE__*/ new WeakMap();
        var _attackShip = /*#__PURE__*/ new WeakSet();
        var _isPlacementPossible = /*#__PURE__*/ new WeakSet();
        var Gameboard = /*#__PURE__*/ (function () {
          function Gameboard(_player) {
            var _this = this;
            _classCallCheck(this, Gameboard);
            _classPrivateMethodInitSpec(this, _isPlacementPossible);
            /**
             *
             * @param {Number} row
             * @param {Number} col
             * @returns {boolean} True if attack was successful, false otherwise;
             */
            _classPrivateMethodInitSpec(this, _attackShip);
            // private methods
            _classPrivateFieldInitSpec(this, _createGameState, {
              writable: true,
              value: function value() {
                return {
                  missedSquares: [],
                  hittedSquares: [],
                  // [[x,y], [x,y], [x,y]]
                  shipsAndTheirOccupiedSpaces: {
                    /* 
            'x, y': Ship 1,
            'x, y': Ship 1,
            */
                  },
                };
              },
            });
            this.gameState = _classPrivateFieldGet(this, _createGameState).call(
              this
            );
            this.player = _player;
            this.map = Gameboard.generateMap();

            //listens to DOM changes
            _Events_js__WEBPACK_IMPORTED_MODULE_2__["default"].on(
              "place ship",
              function (playerName, ship, coord, isVertical) {
                if (playerName == _this.player)
                  _this.placeShip(ship, coord, isVertical);
              }
            );

            // placeShip(ship, [row, col] = coord, isVertical)
          }
          _createClass(
            Gameboard,
            [
              {
                key: "placeShip",
                value:
                  /**
                   * @param {Ship} ship - The ship
                   * @param {number[]} coords - Coordinates of the ship in the map
                   */

                  function placeShip(ship) {
                    var _ref =
                        arguments.length > 1 && arguments[1] !== undefined
                          ? arguments[1]
                          : coord,
                      _ref2 = _slicedToArray(_ref, 2),
                      row = _ref2[0],
                      col = _ref2[1];
                    var isVertical =
                      arguments.length > 2 ? arguments[2] : undefined;
                    var success = true;

                    // Create a deep copy of the map
                    var tempMap = this.map.map(function (row) {
                      return _toConsumableArray(
                        row.map(function (cell) {
                          return cell;
                        })
                      );
                    });

                    // Create a shallow copy of the shipsAndTheirOccupiedSpaces
                    var tempList = _objectSpread(
                      {},
                      this.gameState.shipsAndTheirOccupiedSpaces
                    );
                    for (var i = 0; i < ship.length; i++) {
                      if (
                        _classPrivateMethodGet(
                          this,
                          _isPlacementPossible,
                          _isPlacementPossible2
                        ).call(this, row, col)
                      ) {
                        tempMap[row][col] = "S";
                        tempList["".concat(row, ",").concat(col)] = ship;

                        // Update row or col based on the orientation
                        isVertical ? row++ : col++;
                      } else {
                        // If placement is not possible, set success to false and break the loop
                        success = false;
                        break;
                      }
                    }
                    if (success) {
                      this.map = tempMap;
                      this.gameState.shipsAndTheirOccupiedSpaces = tempList;
                    }
                    return success;
                  },
              },
              {
                key: "placeShipsRandomly",
                value: function placeShipsRandomly() {
                  var _this2 = this;
                  var getRandomCoord = function getRandomCoord() {
                    return Math.floor(Math.random() * 10);
                  };
                  var getRandomIsVertical = function getRandomIsVertical() {
                    return Math.random() < 0.5;
                  };
                  var Carrier = new _Ship_js__WEBPACK_IMPORTED_MODULE_0__[
                    "default"
                  ]("Carrier", 5);
                  var Battleship = new _Ship_js__WEBPACK_IMPORTED_MODULE_0__[
                    "default"
                  ]("Battleship", 4);
                  var Cruiser = new _Ship_js__WEBPACK_IMPORTED_MODULE_0__[
                    "default"
                  ]("Cruiser", 3);
                  var Submarine = new _Ship_js__WEBPACK_IMPORTED_MODULE_0__[
                    "default"
                  ]("Submarine", 3);
                  var Destroyer = new _Ship_js__WEBPACK_IMPORTED_MODULE_0__[
                    "default"
                  ]("Destroyer", 2);
                  var attemptToPlaceShip = function attemptToPlaceShip(ship) {
                    var isPlacedSuccessfully = false;
                    do {
                      var coords = [getRandomCoord(), getRandomCoord()];
                      isPlacedSuccessfully = _this2.placeShip(
                        ship,
                        coords,
                        getRandomIsVertical()
                      );
                    } while (!isPlacedSuccessfully);
                  };
                  attemptToPlaceShip(Carrier);
                  attemptToPlaceShip(Battleship);
                  attemptToPlaceShip(Cruiser);
                  attemptToPlaceShip(Submarine);
                  attemptToPlaceShip(Destroyer);
                },

                /**
                 * @param {Number} row
                 * @param {Number} col
                 * @returns {boolean} Returns true if a ship was hit, false if otherwise;
                 */
              },
              {
                key: "receiveAttack",
                value: function receiveAttack(row, col) {
                  // * push attack info
                  var results = {
                    isASuccessfulHit: false,
                    shipHit: false,
                    waterHit: false,
                  };

                  // ! nahhhh giatay ang DOM makauna man ug update
                  if (this.map[row][col] == "X") {
                    return (results.isASuccessfulHit = false);
                  } else {
                    results.isASuccessfulHit = true;
                    this.map[row][col] = "X";
                    var shipHit = _classPrivateMethodGet(
                      this,
                      _attackShip,
                      _attackShip2
                    ).call(this, row, col);
                    if (shipHit) {
                      results.shipHit = true;
                      this.gameState.hittedSquares.push([row, col]);
                    } else {
                      results.waterHit = true;
                      this.gameState.missedSquares.push([row, col]);
                    }
                  }

                  // ! lol

                  return results;
                },
              },
              {
                key: "isOver",
                value: function isOver() {
                  return !this.map.some(function (row) {
                    return row.includes("S");
                  });
                },
              },
            ],
            [
              {
                key: "generateMap",
                value: function generateMap() {
                  var map = [];
                  var gameState = {};
                  for (var i = 0; i < 10; i++) {
                    var row = [];
                    for (var j = 0; j < 10; j++) {
                      // You can set initial values or leave it empty
                      // For example, you can set all elements to 0 initially:
                      row.push(0);
                    }
                    map.push(row);
                  }
                  return map;
                },
              },
            ]
          );
          return Gameboard;
        })();
        function _attackShip2(row, col) {
          var _Ship =
            this.gameState.shipsAndTheirOccupiedSpaces[
              "".concat(row, ",").concat(col)
            ];

          // * if Ship is undefined, there's no ship at [row, col]

          if (_Ship !== undefined) return _Ship.hit();
          return false;
        }
        function _isPlacementPossible2(row, col) {
          var numRows = this.map.length;
          var numCols = this.map[0].length;

          // Check if the specified row and column are within the bounds of the map
          if (row < 0 || row >= numRows || col < 0 || col >= numCols) {
            return false;
          }

          // Check if the cell is not already occupied by another ship
          if (this.map[row][col] === "S") {
            return false;
          }
          return true;
        }
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          Gameboard;

        /***/
      },

    /***/ "./src/modules/Player.js":
      /*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ AI: () => /* binding */ AI,
          /* harmony export */ Player: () => /* binding */ Player,
          /* harmony export */
        });
        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                writable: true,
                configurable: true,
              },
            }
          );
          Object.defineProperty(subClass, "prototype", { writable: false });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }
        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function _setPrototypeOf(o, p) {
                o.__proto__ = p;
                return o;
              };
          return _setPrototypeOf(o, p);
        }
        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();
          return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived),
              result;
            if (hasNativeReflectConstruct) {
              var NewTarget = _getPrototypeOf(this).constructor;
              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }
            return _possibleConstructorReturn(this, result);
          };
        }
        function _possibleConstructorReturn(self, call) {
          if (
            call &&
            (_typeof(call) === "object" || typeof call === "function")
          ) {
            return call;
          } else if (call !== void 0) {
            throw new TypeError(
              "Derived constructors may only return object or undefined"
            );
          }
          return _assertThisInitialized(self);
        }
        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          }
          return self;
        }
        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct)
            return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;
          try {
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            );
            return true;
          } catch (e) {
            return false;
          }
        }
        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o);
              };
          return _getPrototypeOf(o);
        }
        function _typeof(o) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                    return typeof o;
                  }
                : function (o) {
                    return o &&
                      "function" == typeof Symbol &&
                      o.constructor === Symbol &&
                      o !== Symbol.prototype
                      ? "symbol"
                      : typeof o;
                  }),
            _typeof(o)
          );
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(
              target,
              _toPropertyKey(descriptor.key),
              descriptor
            );
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", { writable: false });
          return Constructor;
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, "string");
          return _typeof(key) === "symbol" ? key : String(key);
        }
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== "object" || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (_typeof(res) !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (hint === "string" ? String : Number)(input);
        }
        /* 
TODO
1. Players can take turns playing the game by attacking the enemy Gameboard.

2. The game is played against the computer, so make the ‘computer’ capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice). */
        var Player = /*#__PURE__*/ (function () {
          function Player(playerName) {
            _classCallCheck(this, Player);
            this.name = playerName;
            this.isTheirTurn = false;
          }
          _createClass(Player, [
            {
              key: "toggleIsTheirTurn",
              value: function toggleIsTheirTurn() {
                this.isTheirTurn = !this.isTheirTurn;
              },
            },
          ]);
          return Player;
        })();
        var AI = /*#__PURE__*/ (function (_Player) {
          _inherits(AI, _Player);
          var _super = _createSuper(AI);
          function AI() {
            _classCallCheck(this, AI);
            return _super.apply(this, arguments);
          }
          _createClass(AI, [
            {
              key: "generateAttack",
              value:
                /**
                 * @returns {Array.<number>}
                 */
                function generateAttack() {
                  var getRandomCoord = function getRandomCoord() {
                    return Math.floor(Math.random() * 10);
                  };
                  return [getRandomCoord(), getRandomCoord()];
                },
            },
          ]);
          return AI;
        })(Player);

        /***/
      },

    /***/ "./src/modules/Ship.js":
      /*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        function _typeof(o) {
          "@babel/helpers - typeof";
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (o) {
                    return typeof o;
                  }
                : function (o) {
                    return o &&
                      "function" == typeof Symbol &&
                      o.constructor === Symbol &&
                      o !== Symbol.prototype
                      ? "symbol"
                      : typeof o;
                  }),
            _typeof(o)
          );
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(
              target,
              _toPropertyKey(descriptor.key),
              descriptor
            );
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          Object.defineProperty(Constructor, "prototype", { writable: false });
          return Constructor;
        }
        function _toPropertyKey(arg) {
          var key = _toPrimitive(arg, "string");
          return _typeof(key) === "symbol" ? key : String(key);
        }
        function _toPrimitive(input, hint) {
          if (_typeof(input) !== "object" || input === null) return input;
          var prim = input[Symbol.toPrimitive];
          if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (_typeof(res) !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return (hint === "string" ? String : Number)(input);
        }
        /* 
TODO
Begin your app by creating the Ship class/factory (your choice).

Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.

Ships should have a hit() function that increases the number of ‘hits’ in your ship.

isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received. 

*/
        var Ship = /*#__PURE__*/ (function () {
          /**
           * @param name Could be: "carrier", "battleship", "destroyer", "submarine", "patrolBoat"
           * @param length lenght of the ship
           */
          function Ship(name, length) {
            _classCallCheck(this, Ship);
            this.name = name;
            this.length = length;
            this.hits = 0;
          }

          /**
           *@hit Increments the number of ship's hits
           */
          _createClass(Ship, [
            {
              key: "hit",
              value: function hit() {
                this.hits++;
                return true;
              },

              /**
               *@returns Returns true if ship has sunk, false if otherwise
               */
            },
            {
              key: "isSunk",
              value: function isSunk() {
                return this.hits >= this.length;
              },
            },
          ]);
          return Ship;
        })();
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Ship;

        /***/
      },

    /***/ "./node_modules/events/events.js":
      /*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
      /***/ (module) => {
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.

        var R = typeof Reflect === "object" ? Reflect : null;
        var ReflectApply =
          R && typeof R.apply === "function"
            ? R.apply
            : function ReflectApply(target, receiver, args) {
                return Function.prototype.apply.call(target, receiver, args);
              };

        var ReflectOwnKeys;
        if (R && typeof R.ownKeys === "function") {
          ReflectOwnKeys = R.ownKeys;
        } else if (Object.getOwnPropertySymbols) {
          ReflectOwnKeys = function ReflectOwnKeys(target) {
            return Object.getOwnPropertyNames(target).concat(
              Object.getOwnPropertySymbols(target)
            );
          };
        } else {
          ReflectOwnKeys = function ReflectOwnKeys(target) {
            return Object.getOwnPropertyNames(target);
          };
        }

        function ProcessEmitWarning(warning) {
          if (console && console.warn) console.warn(warning);
        }

        var NumberIsNaN =
          Number.isNaN ||
          function NumberIsNaN(value) {
            return value !== value;
          };

        function EventEmitter() {
          EventEmitter.init.call(this);
        }
        module.exports = EventEmitter;
        module.exports.once = once;

        // Backwards-compat with node 0.10.x
        EventEmitter.EventEmitter = EventEmitter;

        EventEmitter.prototype._events = undefined;
        EventEmitter.prototype._eventsCount = 0;
        EventEmitter.prototype._maxListeners = undefined;

        // By default EventEmitters will print a warning if more than 10 listeners are
        // added to it. This is a useful default which helps finding memory leaks.
        var defaultMaxListeners = 10;

        function checkListener(listener) {
          if (typeof listener !== "function") {
            throw new TypeError(
              'The "listener" argument must be of type Function. Received type ' +
                typeof listener
            );
          }
        }

        Object.defineProperty(EventEmitter, "defaultMaxListeners", {
          enumerable: true,
          get: function () {
            return defaultMaxListeners;
          },
          set: function (arg) {
            if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
              throw new RangeError(
                'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                  arg +
                  "."
              );
            }
            defaultMaxListeners = arg;
          },
        });

        EventEmitter.init = function () {
          if (
            this._events === undefined ||
            this._events === Object.getPrototypeOf(this)._events
          ) {
            this._events = Object.create(null);
            this._eventsCount = 0;
          }

          this._maxListeners = this._maxListeners || undefined;
        };

        // Obviously not all Emitters should be limited to 10. This function allows
        // that to be increased. Set to zero for unlimited.
        EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
          if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
            throw new RangeError(
              'The value of "n" is out of range. It must be a non-negative number. Received ' +
                n +
                "."
            );
          }
          this._maxListeners = n;
          return this;
        };

        function _getMaxListeners(that) {
          if (that._maxListeners === undefined)
            return EventEmitter.defaultMaxListeners;
          return that._maxListeners;
        }

        EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
          return _getMaxListeners(this);
        };

        EventEmitter.prototype.emit = function emit(type) {
          var args = [];
          for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
          var doError = type === "error";

          var events = this._events;
          if (events !== undefined)
            doError = doError && events.error === undefined;
          else if (!doError) return false;

          // If there is no 'error' event listener then throw.
          if (doError) {
            var er;
            if (args.length > 0) er = args[0];
            if (er instanceof Error) {
              // Note: The comments on the `throw` lines are intentional, they show
              // up in Node's output if this results in an unhandled exception.
              throw er; // Unhandled 'error' event
            }
            // At least give some kind of context to the user
            var err = new Error(
              "Unhandled error." + (er ? " (" + er.message + ")" : "")
            );
            err.context = er;
            throw err; // Unhandled 'error' event
          }

          var handler = events[type];

          if (handler === undefined) return false;

          if (typeof handler === "function") {
            ReflectApply(handler, this, args);
          } else {
            var len = handler.length;
            var listeners = arrayClone(handler, len);
            for (var i = 0; i < len; ++i)
              ReflectApply(listeners[i], this, args);
          }

          return true;
        };

        function _addListener(target, type, listener, prepend) {
          var m;
          var events;
          var existing;

          checkListener(listener);

          events = target._events;
          if (events === undefined) {
            events = target._events = Object.create(null);
            target._eventsCount = 0;
          } else {
            // To avoid recursion in the case that type === "newListener"! Before
            // adding it to the listeners, first emit "newListener".
            if (events.newListener !== undefined) {
              target.emit(
                "newListener",
                type,
                listener.listener ? listener.listener : listener
              );

              // Re-assign `events` because a newListener handler could have caused the
              // this._events to be assigned to a new object
              events = target._events;
            }
            existing = events[type];
          }

          if (existing === undefined) {
            // Optimize the case of one listener. Don't need the extra array object.
            existing = events[type] = listener;
            ++target._eventsCount;
          } else {
            if (typeof existing === "function") {
              // Adding the second element, need to change to array.
              existing = events[type] = prepend
                ? [listener, existing]
                : [existing, listener];
              // If we've already got an array, just append.
            } else if (prepend) {
              existing.unshift(listener);
            } else {
              existing.push(listener);
            }

            // Check for listener leak
            m = _getMaxListeners(target);
            if (m > 0 && existing.length > m && !existing.warned) {
              existing.warned = true;
              // No error code for this since it is a Warning
              // eslint-disable-next-line no-restricted-syntax
              var w = new Error(
                "Possible EventEmitter memory leak detected. " +
                  existing.length +
                  " " +
                  String(type) +
                  " listeners " +
                  "added. Use emitter.setMaxListeners() to " +
                  "increase limit"
              );
              w.name = "MaxListenersExceededWarning";
              w.emitter = target;
              w.type = type;
              w.count = existing.length;
              ProcessEmitWarning(w);
            }
          }

          return target;
        }

        EventEmitter.prototype.addListener = function addListener(
          type,
          listener
        ) {
          return _addListener(this, type, listener, false);
        };

        EventEmitter.prototype.on = EventEmitter.prototype.addListener;

        EventEmitter.prototype.prependListener = function prependListener(
          type,
          listener
        ) {
          return _addListener(this, type, listener, true);
        };

        function onceWrapper() {
          if (!this.fired) {
            this.target.removeListener(this.type, this.wrapFn);
            this.fired = true;
            if (arguments.length === 0) return this.listener.call(this.target);
            return this.listener.apply(this.target, arguments);
          }
        }

        function _onceWrap(target, type, listener) {
          var state = {
            fired: false,
            wrapFn: undefined,
            target: target,
            type: type,
            listener: listener,
          };
          var wrapped = onceWrapper.bind(state);
          wrapped.listener = listener;
          state.wrapFn = wrapped;
          return wrapped;
        }

        EventEmitter.prototype.once = function once(type, listener) {
          checkListener(listener);
          this.on(type, _onceWrap(this, type, listener));
          return this;
        };

        EventEmitter.prototype.prependOnceListener =
          function prependOnceListener(type, listener) {
            checkListener(listener);
            this.prependListener(type, _onceWrap(this, type, listener));
            return this;
          };

        // Emits a 'removeListener' event if and only if the listener was removed.
        EventEmitter.prototype.removeListener = function removeListener(
          type,
          listener
        ) {
          var list, events, position, i, originalListener;

          checkListener(listener);

          events = this._events;
          if (events === undefined) return this;

          list = events[type];
          if (list === undefined) return this;

          if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else {
              delete events[type];
              if (events.removeListener)
                this.emit("removeListener", type, list.listener || listener);
            }
          } else if (typeof list !== "function") {
            position = -1;

            for (i = list.length - 1; i >= 0; i--) {
              if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
              }
            }

            if (position < 0) return this;

            if (position === 0) list.shift();
            else {
              spliceOne(list, position);
            }

            if (list.length === 1) events[type] = list[0];

            if (events.removeListener !== undefined)
              this.emit("removeListener", type, originalListener || listener);
          }

          return this;
        };

        EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

        EventEmitter.prototype.removeAllListeners = function removeAllListeners(
          type
        ) {
          var listeners, events, i;

          events = this._events;
          if (events === undefined) return this;

          // not listening for removeListener, no need to emit
          if (events.removeListener === undefined) {
            if (arguments.length === 0) {
              this._events = Object.create(null);
              this._eventsCount = 0;
            } else if (events[type] !== undefined) {
              if (--this._eventsCount === 0) this._events = Object.create(null);
              else delete events[type];
            }
            return this;
          }

          // emit removeListener for all listeners on all events
          if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
              key = keys[i];
              if (key === "removeListener") continue;
              this.removeAllListeners(key);
            }
            this.removeAllListeners("removeListener");
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
          }

          listeners = events[type];

          if (typeof listeners === "function") {
            this.removeListener(type, listeners);
          } else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
              this.removeListener(type, listeners[i]);
            }
          }

          return this;
        };

        function _listeners(target, type, unwrap) {
          var events = target._events;

          if (events === undefined) return [];

          var evlistener = events[type];
          if (evlistener === undefined) return [];

          if (typeof evlistener === "function")
            return unwrap ? [evlistener.listener || evlistener] : [evlistener];

          return unwrap
            ? unwrapListeners(evlistener)
            : arrayClone(evlistener, evlistener.length);
        }

        EventEmitter.prototype.listeners = function listeners(type) {
          return _listeners(this, type, true);
        };

        EventEmitter.prototype.rawListeners = function rawListeners(type) {
          return _listeners(this, type, false);
        };

        EventEmitter.listenerCount = function (emitter, type) {
          if (typeof emitter.listenerCount === "function") {
            return emitter.listenerCount(type);
          } else {
            return listenerCount.call(emitter, type);
          }
        };

        EventEmitter.prototype.listenerCount = listenerCount;
        function listenerCount(type) {
          var events = this._events;

          if (events !== undefined) {
            var evlistener = events[type];

            if (typeof evlistener === "function") {
              return 1;
            } else if (evlistener !== undefined) {
              return evlistener.length;
            }
          }

          return 0;
        }

        EventEmitter.prototype.eventNames = function eventNames() {
          return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
        };

        function arrayClone(arr, n) {
          var copy = new Array(n);
          for (var i = 0; i < n; ++i) copy[i] = arr[i];
          return copy;
        }

        function spliceOne(list, index) {
          for (; index + 1 < list.length; index++)
            list[index] = list[index + 1];
          list.pop();
        }

        function unwrapListeners(arr) {
          var ret = new Array(arr.length);
          for (var i = 0; i < ret.length; ++i) {
            ret[i] = arr[i].listener || arr[i];
          }
          return ret;
        }

        function once(emitter, name) {
          return new Promise(function (resolve, reject) {
            function errorListener(err) {
              emitter.removeListener(name, resolver);
              reject(err);
            }

            function resolver() {
              if (typeof emitter.removeListener === "function") {
                emitter.removeListener("error", errorListener);
              }
              resolve([].slice.call(arguments));
            }

            eventTargetAgnosticAddListener(emitter, name, resolver, {
              once: true,
            });
            if (name !== "error") {
              addErrorHandlerIfEventEmitter(emitter, errorListener, {
                once: true,
              });
            }
          });
        }

        function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
          if (typeof emitter.on === "function") {
            eventTargetAgnosticAddListener(emitter, "error", handler, flags);
          }
        }

        function eventTargetAgnosticAddListener(
          emitter,
          name,
          listener,
          flags
        ) {
          if (typeof emitter.on === "function") {
            if (flags.once) {
              emitter.once(name, listener);
            } else {
              emitter.on(name, listener);
            }
          } else if (typeof emitter.addEventListener === "function") {
            // EventTarget does not have `error` event semantics like Node
            // EventEmitters, we do not listen for `error` events here.
            emitter.addEventListener(name, function wrapListener(arg) {
              // IE does not have builtin `{ once: true }` support so we
              // have to do it manually.
              if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
              }
              listener(arg);
            });
          } else {
            throw new TypeError(
              'The "emitter" argument must be of type EventEmitter. Received type ' +
                typeof emitter
            );
          }
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    /*!********************!*\
  !*** ./src/app.js ***!
  \********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _modules_Ship__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(/*! ./modules/Ship */ "./src/modules/Ship.js");
    /* harmony import */ var _modules_Gameboard__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(
        /*! ./modules/Gameboard */ "./src/modules/Gameboard.js"
      );
    /* harmony import */ var _modules_Player__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(/*! ./modules/Player */ "./src/modules/Player.js");
    /* harmony import */ var _modules_DOM__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(/*! ./modules/DOM */ "./src/modules/DOM.js");
    /* harmony import */ var _modules_Events__WEBPACK_IMPORTED_MODULE_4__ =
      __webpack_require__(/*! ./modules/Events */ "./src/modules/Events.js");
    function _slicedToArray(arr, i) {
      return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
      );
    }
    function _nonIterableRest() {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (
        n === "Arguments" ||
        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
      )
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t =
        null == r
          ? null
          : ("undefined" != typeof Symbol && r[Symbol.iterator]) ||
            r["@@iterator"];
      if (null != t) {
        var e,
          n,
          i,
          u,
          a = [],
          f = !0,
          o = !1;
        try {
          if (((i = (t = t.call(r)).next), 0 === l)) {
            if (Object(t) !== t) return;
            f = !1;
          } else
            for (
              ;
              !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l);
              f = !0
            );
        } catch (r) {
          (o = !0), (n = r);
        } finally {
          try {
            if (
              !f &&
              null != t["return"] &&
              ((u = t["return"]()), Object(u) !== u)
            )
              return;
          } finally {
            if (o) throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    // create players
    var dodot = new _modules_Player__WEBPACK_IMPORTED_MODULE_2__.Player(
      "Dodot"
    );
    var enemy = new _modules_Player__WEBPACK_IMPORTED_MODULE_2__.AI("enemy");

    // make boards
    var playerBoard = new _modules_Gameboard__WEBPACK_IMPORTED_MODULE_1__[
      "default"
    ](dodot);
    var enemyBoard = new _modules_Gameboard__WEBPACK_IMPORTED_MODULE_1__[
      "default"
    ](enemy);

    // gameboard methods
    function gameIsOver() {
      return playerBoard.isOver() || enemyBoard.isOver();
    }
    start();
    function activateShipsPlacement() {
      // handle isVertical
      var isVertical = false;
      var rotateButton = document.getElementById("rotateButton");
      rotateButton.onclick = function () {
        isVertical = isVertical == true ? false : true;
      };
      var Carrier = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__["default"](
        "Carrier",
        5
      );
      var Battleship = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__[
        "default"
      ]("Battleship", 4);
      var Cruiser = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__["default"](
        "Cruiser",
        3
      );
      var Submarine = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__["default"](
        "Submarine",
        3
      );
      var Destroyer = new _modules_Ship__WEBPACK_IMPORTED_MODULE_0__["default"](
        "Destroyer",
        2
      );
      var currentShip = Carrier; // Start with the Carrier
      var _length = currentShip.length; // for glowGrids

      _modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].updateInstruction(
        currentShip.name,
        currentShip.length
      );
      var handleShipsPlacement = function handleShipsPlacement(
        board,
        cell,
        row,
        col
      ) {
        if (board.id === "player") {
          var shipSuccessfullyPlaced = playerBoard.placeShip(
            currentShip,
            [row, col],
            isVertical
          );
          if (shipSuccessfullyPlaced) {
            _modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].placeShip(
              currentShip.length,
              [row, col],
              isVertical
            );
            playerBoard.placeShip(currentShip, [row, col], isVertical);

            // Move to the next ship
            switch (currentShip) {
              case Carrier:
                currentShip = Battleship;
                _length = currentShip.length;
                _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].updateInstruction(currentShip.name, currentShip.length);
                break;
              case Battleship:
                currentShip = Cruiser;
                _length = currentShip.length;
                _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].updateInstruction(currentShip.name, currentShip.length);
                break;
              case Cruiser:
                currentShip = Submarine;
                _length = currentShip.length;
                _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].updateInstruction(currentShip.name, currentShip.length);
                break;
              case Submarine:
                currentShip = Destroyer;
                _length = currentShip.length;
                _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].updateInstruction(currentShip.name, currentShip.length);
                break;
              case Destroyer:
                // All ships are placed, remove the event listener
                removeEventListener();
                _modules_Events__WEBPACK_IMPORTED_MODULE_4__["default"].emit(
                  "done ships placement"
                );
                _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
                  "default"
                ].displayGameboard(playerBoard, "player", true);
                break;
              default:
                break;
            }
          }
        }
      };
      _modules_Events__WEBPACK_IMPORTED_MODULE_4__["default"].on(
        "gameboard click",
        handleShipsPlacement
      );
      var removeEventListener = function removeEventListener() {
        _modules_Events__WEBPACK_IMPORTED_MODULE_4__["default"].removeListener(
          "gameboard click",
          handleShipsPlacement
        );
        cells.forEach(function (cell) {
          cell.removeEventListener("mouseover", handleMouseOver);
          cell.removeEventListener("mouseout", handleMouseOut);
        });
      };

      // todo WIP: add hover events
      var playerBoardDOM = document.getElementById("player");
      var cells = Array.from(playerBoardDOM.getElementsByClassName("cell"));
      var hoveredCells = [];
      cells.forEach(function (cell) {
        cell.addEventListener("mouseover", handleMouseOver);
        cell.addEventListener("mouseout", handleMouseOut);
      });
      function handleMouseOver(event) {
        console.log(hoveredCells);
        // Extract row and col from the dataset of the hovered cell
        var _event$target$dataset = event.target.dataset,
          row = _event$target$dataset.row,
          col = _event$target$dataset.col;
        console.log(row, col);

        // Determine varying and constant coordinates based on isVertical
        var varyingCoord = isVertical ? parseInt(row, 10) : parseInt(col, 10);
        var constantCoord = isVertical ? parseInt(col, 10) : parseInt(row, 10);

        // Add the "dark" class to the specified range of cells
        for (var i = varyingCoord; i < varyingCoord + _length; i++) {
          var currentCell = isVertical
            ? findCellByDataAttributes(i, constantCoord)
            : findCellByDataAttributes(constantCoord, i);
          if (currentCell) {
            currentCell.classList.add("dark");
            hoveredCells.push(currentCell);
          }
        }
      }
      function handleMouseOut() {
        // Reset the "dark" class for the previously hovered cells
        resetDarkClass(hoveredCells);
      }
      function findCellByDataAttributes(row, col) {
        return cells.find(function (cell) {
          return (
            cell.dataset.row === row.toString() &&
            cell.dataset.col === col.toString()
          );
        });
      }
      function resetDarkClass() {
        hoveredCells.forEach(function (cell) {
          cell.classList.remove("dark");
        });
        hoveredCells = [];
      }
    }
    function activateGame() {
      //listen for gameboard clicks for attack
      _modules_Events__WEBPACK_IMPORTED_MODULE_4__["default"].on(
        "gameboard click",
        function (board, cell, row, col) {
          if (board.id === "enemy" && dodot.isTheirTurn && !gameIsOver()) {
            var results = enemyBoard.receiveAttack(row, col);

            // Display gameboard without showing ships
            _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
              "default"
            ].displayGameboard(enemyBoard, "enemy", false);
            if (results.isASuccessfulHit) {
              switchTurn();
            }
            checkForWin();
          }
          if (enemy.isTheirTurn && !gameIsOver()) {
            var _results;
            do {
              var _enemy$generateAttack = enemy.generateAttack(),
                _enemy$generateAttack2 = _slicedToArray(
                  _enemy$generateAttack,
                  2
                ),
                _row = _enemy$generateAttack2[0],
                _col = _enemy$generateAttack2[1];
              _results = playerBoard.receiveAttack(_row, _col);
            } while (!_results.isASuccessfulHit);
            switchTurn();

            // Display gameboard with showing ships
            _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
              "default"
            ].displayGameboard(playerBoard, "player", true);
            checkForWin();
          }
        }
      );
    }
    function checkForWin() {
      // todo add feature
      //DOM.displayWinner(player);

      if (playerBoard.isOver()) {
        _modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].announceWinner(
          "You Lost"
        );

        //reveal enemy ships
        _modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].displayGameboard(
          enemyBoard,
          "enemy",
          false
        );
        console.log("Player lost", playerBoard.map, enemyBoard.map);
      } else if (enemyBoard.isOver()) {
        _modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].announceWinner(
          "You Won"
        );
        console.log("Player won", playerBoard.map, enemyBoard.map);
      }
      return playerBoard.isOver()
        ? playerBoard.player.name
        : enemyBoard.player.name;
    }
    function switchTurn() {
      dodot.toggleIsTheirTurn();
      enemy.toggleIsTheirTurn();
      return dodot.isTheirTurn ? dodot : enemy;
    }
    function start() {
      dodot.isTheirTurn = true;
      enemy.isTheirTurn = false;
      _modules_DOM__WEBPACK_IMPORTED_MODULE_3__["default"].displayGameboard(
        playerBoard,
        "player",
        true
      );
      _modules_DOM__WEBPACK_IMPORTED_MODULE_3__[
        "default"
      ].listenForGameboardClicks(); //async, activate event emitter

      //position ships
      activateShipsPlacement();
      enemyBoard.placeShipsRandomly();
      _modules_Events__WEBPACK_IMPORTED_MODULE_4__["default"].on(
        "done ships placement",
        function () {
          document.getElementById("enemy").classList.remove("hide");
          document.getElementById("placing-ships").classList.add("hide");
          activateGame();
        }
      );
    }
  })();

  /******/
})();
//# sourceMappingURL=bundle.js.map
