import Gameboard from "./Gameboard";
import eventEmitter from "./Events";
import Ship from "./Ship";

class DOM {
  static initialize() {}

  static createGameboard(id) {
    let gameboardDOM = document.createElement("div");

    let gameboardHTML = "";

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        gameboardHTML += `<div class="cell" data-row="${row}" data-col="${col}"></div>`;
      }
    }

    gameboardDOM.innerHTML = gameboardHTML;
    gameboardDOM.classList.add("gameboard");
    gameboardDOM.setAttribute("id", id);

    return gameboardDOM;
  }

  // * game states

  // 1: ships placement
  static initializeShipsPlacement(gameboard) {
    let isVertical = false;
    let ship = new Ship("ship", 1);

    // todo: let ship = new Ship("ship", 1);
    // !                      this
    DOM.listenForCellClicks("player", (cell) => {
      // get row and col attr of the cell
      const rowValue = cell.dataset.row; // "2"
      const colValue = cell.dataset.col; // "3"

      // convert from string to number
      const rowNumber = parseInt(rowValue, 10); // 2
      const colNumber = parseInt(colValue, 10); // 3

      DOM.placeShip(gameboard.name, ship, [rowNumber, colNumber], isVertical);
      DOM.darkenCells(cell, (ship.length = 3), isVertical);
    });

    //after all 5 ships are placed, remove event listener
  }

  static stopShipsPlacement() {}

  // 2: game starting
  // todo: attack enemy ship
  /* //// static startGame(enemyBoard) {
    DOM.listenForCellClicks("enemy", (cell) => {
      // get row and col attr of the cell
      const rowValue = cell.dataset.row; // "2"
      const colValue = cell.dataset.col; // "3"

      // convert from string to number
      const rowNumber = parseInt(rowValue, 10); // 2
      const colNumber = parseInt(colValue, 10); // 3

      enemyBoard.receiveAttack(rowNumber, colNumber);
      DOM.darkenCell(cell);
    });
  } */

  // Extract the logic to get row and col values from a cell
  static #getRowAndColFromCell(cell) {
    const rowValue = cell.dataset.row;
    const colValue = cell.dataset.col;
    const rowNumber = parseInt(rowValue, 10);
    const colNumber = parseInt(colValue, 10);
    return { rowNumber, colNumber };
  }

  /*   // Extract the logic for handling cell clicks
  static #handleCellClick(cell, board) {
    const { rowNumber, colNumber } = DOM.#getRowAndColFromCell(cell);

   ! CAUSES PROBLEMMS
    board.receiveAttack(rowNumber, colNumber);
    DOM.darkenCell(cell);
  }

  // The main function
  static startGame(enemyBoard) {
    // DOM.listenForCellClicks("enemy", (cell) => {
    //   DOM.#handleCellClick(cell, enemyBoard);
    // });
  }
 */
  // * game states ends here
  /* 
  placeShip([0,0], length, isVertical)
  */
  static placeShip(playerName, ship, coords, isVertical) {
    // glowGrids();
    eventEmitter.emit("place ship", playerName, ship, coords, isVertical);
    DOM.refreshGameboards();
  }
  static saveToGameboard() {}

  static displayGameboard({ map } = gameboard, id, showShips) {
    // example: document.getElementById("player")
    const playerBoard = document.getElementById(id);
    const cells = playerBoard.children;

    // Iterate through each cell and update its content
    for (let row = 0; row < map.length; row++) {
      for (let col = 0; col < map[row].length; col++) {
        const cellIndex = row * 10 + col;
        const cell = cells[cellIndex];

        // Update cell content based on gameboard value
        switch (map[row][col]) {
          case "S":
            if (showShips) {
              cell.classList.add("dark");
              cell.textContent = "S"; // Display 'S' for ships
            }

            break;
          case 0:
            cell.textContent = "0"; // Display '0' for water
            break;
          case "X":
            cell.textContent = "X"; // Display 'X' for hit marks
            break;
          // Add more cases for other possible values if needed
          default:
            cell.textContent = ""; // Default to empty content
        }
      }
    }
  }

  static retrieveGameboard() {
    let map;
    eventEmitter.on("map update", (_map) => (map = _map));
    return map;
  }

  static refreshGameboards() {}

  static darkenCells(cell, length) {
    // for()
    cell.classList.add("dark");
  }

  /**
   *
   * @param {Node} cell
   * @param {string} color Option: "dark" or "red"
   */
  static darkenCell(cell, color) {
    cell.classList.add(`${color}`);
  }

  static rotateShip() {}

  static attackShip() {}

  // * Event Listeners
  /**
   * @listenForCellClicks
   * @param {string} id The id attribute of the gameboard
   * */

  // Example usage: listenForClicks("playerBoard");

  static listenForCellClicks(
    id,
    fn = (cell) => {
      console.log(cell);
    }
  ) {
    const gameboard = document.getElementById(`${id}`);
    const cells = gameboard.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        fn(cell);
      });
    });
  }

  static listenForGameboardClicks() {
    const addClickEvent = (board) => {
      board.addEventListener("click", (e) => {
        let gameboardClicked = board;
        const cell = e.target;
        const { rowNumber, colNumber } = DOM.#getRowAndColFromCell(cell);
        eventEmitter.emit("gameboard click", board, cell, rowNumber, colNumber);
      });
    };

    const playerBoard = document.getElementById("player");
    const enemyBoard = document.getElementById("enemy");

    addClickEvent(playerBoard);
    addClickEvent(enemyBoard);
  }

  static disableCellClicks(id) {
    cells.forEach((cell) => {
      cell.removeEventListener("click");
    });
  }
}

/* 
todo 
sulayi dula

then, implement placeShip
*/

export default DOM;
