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

  // 1: ships placement
  static initializeShipsPlacement(id, gameboard) {
    let isVertical = false;

    DOM.listenForCellEvents("player", "mouseover", (cell) => {
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

  // todo: fix glowCells not adjusting according to length
  static glowCells(length, isVertical) {
    const playerBoard = document.getElementById("player");
    const cells = Array.from(playerBoard.getElementsByClassName("cell"));
    let hoveredCells = [];

    function findCellByDataAttributes(row, col) {
      return cells.find(
        (cell) =>
          cell.dataset.row === row.toString() &&
          cell.dataset.col === col.toString()
      );
    }

    // Add "mouseover" and "mouseout" event listeners to each cell
    cells.forEach((cell) => {
      cell.addEventListener(
        "mouseover",
        DOM.#handleMouseOver(event, hoveredCells)
      );
      cell.addEventListener("mouseout", DOM.#handleMouseOut(hoveredCells));
    });
  }

  static glowCellsHelper(hoveredCells) {}

  static removeGlowCellsListener() {
    const playerBoard = document.getElementById("player");
    const cells = Array.from(playerBoard.getElementsByClassName("cell"));

    // Remove "mouseover" and "mouseout" event listeners from each cell
    cells.forEach((cell) => {
      cell.removeEventListener("mouseover", DOM.#handleMouseOver);
      cell.removeEventListener("mouseout", DOM.#handleMouseOut);
    });
  }

  static #handleMouseOver(event, hoveredCells) {
    // Extract row and col from the dataset of the hovered cell
    const { row, col } = event.target.dataset;

    // Reset the "dark" class for the previously hovered cells
    DOM.#resetDarkClass(hoveredCells);

    // Determine varying and constant coordinates based on isVertical
    const varyingCoord = isVertical ? parseInt(row, 10) : parseInt(col, 10);
    const constantCoord = isVertical ? parseInt(col, 10) : parseInt(row, 10);

    // Add the "dark" class to the specified range of cells
    for (let i = varyingCoord; i < varyingCoord + length; i++) {
      const currentCell = isVertical
        ? findCellByDataAttributes(i, constantCoord)
        : findCellByDataAttributes(constantCoord, i);

      if (currentCell) {
        currentCell.classList.add("dark");
        hoveredCells.push(currentCell);
      }
    }
  }

  static #handleMouseOut(hoveredCells) {
    // Reset the "dark" class for the previously hovered cells

    DOM.#resetDarkClass(hoveredCells);
  }

  static #resetDarkClass(hoveredCells) {
    hoveredCells.forEach((cell) => {
      cell.classList.remove("dark");
    });
    hoveredCells = [];
  }

  /* 
  placeShip([0,0], length, isVertical)
  */
  static placeShip(length, coords, isVertical) {
    const playerBoard = document.getElementById("player");
    const cells = Array.from(playerBoard.children);

    const [startRow, startCol] = coords;

    for (let i = 0; i < length; i++) {
      let row = startRow;
      let col = startCol;

      if (isVertical) {
        row += i;
      } else {
        col += i;
      }

      const index = row * 10 + col; // Assuming the board is a 10x10 grid
      const cell = cells[index];

      if (cell) {
        cell.classList.add("ship");
      }
    }
  }

  static stopShipsPlacement() {}

  // Extract the logic to get row and col values from a cell

  static displayGameboard({ map, gameState } = gameboard, id, showShips) {
    const playerBoard = document.getElementById(id);
    const cells = Array.from(playerBoard.children);

    cells.forEach((cell) => {
      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10);

      // Check if the cell is a missed square
      if (
        gameState.missedSquares.some(
          ([missedRow, missedCol]) => row === missedRow && col === missedCol
        )
      ) {
        cell.classList.add("missed");
      } else {
        cell.classList.remove("missed");
      }

      // Check if the cell is a hitted square
      if (
        gameState.hittedSquares.some(
          ([hitRow, hitCol]) => row === hitRow && col === hitCol
        )
      ) {
        cell.classList.add("hitted");
      } else {
        cell.classList.remove("hitted");
      }

      // Check if the cell is part of a ship
      if (showShips) {
        const key = `${row},${col}`;
        if (gameState.shipsAndTheirOccupiedSpaces.hasOwnProperty(key)) {
          // The cell is part of a ship
          cell.classList.add("ship");
        } else {
          // The cell is not part of a ship
          cell.classList.remove("ship");
        }
      }
    });
  }

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
   * @listenForCellEvents
   * @param {string} id The id attribute of the gameboard
   * @param {string} _event The name of the event to listen to
   * */

  // Example usage: listenForClicks("playerBoard");

  static listenForCellEvents(
    id,
    _event,
    fn = (cell) => {
      console.log(cell);
    }
  ) {
    const gameboard = document.getElementById(`${id}`);
    const cells = gameboard.querySelectorAll(".cell");

    cells.forEach((cell) => {
      cell.addEventListener(`${_event}`, () => {
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

  static #getRowAndColFromCell(cell) {
    const rowValue = cell.dataset.row;
    const colValue = cell.dataset.col;
    const rowNumber = parseInt(rowValue, 10);
    const colNumber = parseInt(colValue, 10);
    return { rowNumber, colNumber };
  }

  static displayInstruction() {}

  static updateInstruction(_shipName, _shipLength) {
    const shipName = document.getElementById("placing-ships__shipName");
    shipName.innerText = `Ship: ${_shipName}`;

    const shipLength = document.getElementById("placing-ships__shipLength");
    shipLength.innerText = `Length: ${_shipLength}`;
  }

  //TODO: WIP
  static announceWinner(results) {
    let modalBackground = document.querySelector(".modal__bg");
    let winnerText = document.querySelector(".winner__text");

    let restartButton = document.getElementById("restart__button--modal");
    restartButton.onclick = () => {
      location.reload();
    };

    modalBackground.style.display = "flex";

    winnerText.innerText = results;
  }
}

export default DOM;
