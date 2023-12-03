import Ship from "./modules/Ship";
import Gameboard from "./modules/Gameboard";
import { Player, AI } from "./modules/Player";
import DOM from "./modules/DOM";
import eventEmitter from "./modules/Events";

// create players
let dodot = new Player("Dodot");
let enemy = new AI("enemy");

// make boards
let playerBoard = new Gameboard(dodot);
let enemyBoard = new Gameboard(enemy);

start();

function activateShipsPlacement() {
  // handle isVertical
  let isVertical = false;
  const rotateButton = document.getElementById("rotateButton");
  rotateButton.onclick = () => {
    isVertical = isVertical == true ? false : true;
  };

  const Carrier = new Ship("Carrier", 5);
  const Battleship = new Ship("Battleship", 4);
  const Cruiser = new Ship("Cruiser", 3);
  const Submarine = new Ship("Submarine", 3);
  const Destroyer = new Ship("Destroyer", 2);

  let currentShip = Carrier; // Start with the Carrier
  let _length = currentShip.length; // for glowGrids

  const hangleShipsPlacement = (board, cell, row, col) => {
    if (board.id === "player") {
      const shipSuccessfullyPlaced = playerBoard.placeShip(
        currentShip,
        [row, col],
        isVertical
      );

      if (shipSuccessfullyPlaced) {
        DOM.placeShip(currentShip.length, [row, col], isVertical);
        playerBoard.placeShip(currentShip, [row, col], isVertical);

        // Move to the next ship
        switch (currentShip) {
          case Carrier:
            currentShip = Battleship;
            _length = currentShip.length;

            break;
          case Battleship:
            currentShip = Cruiser;
            _length = currentShip.length;

            break;
          case Cruiser:
            currentShip = Submarine;
            _length = currentShip.length;

            break;
          case Submarine:
            currentShip = Destroyer;
            _length = currentShip.length;

            break;
          case Destroyer:
            // All ships are placed, remove the event listener
            removeEventListener();
            eventEmitter.emit("done ships placement");
            DOM.displayGameboard(playerBoard, "player", true);
            break;
          default:
            break;
        }
      }
    }
  };

  eventEmitter.on("gameboard click", hangleShipsPlacement);

  const removeEventListener = () => {
    eventEmitter.removeListener("gameboard click", hangleShipsPlacement);
  };

  // todo WIP: add hover events
  const playerBoardDOM = document.getElementById("player");
  const cells = Array.from(playerBoardDOM.getElementsByClassName("cell"));
  let hoveredCells = [];
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", handleMouseOver);
    cell.addEventListener("mouseout", handleMouseOut);
  });

  function handleMouseOver(event) {
    console.log(hoveredCells);
    // Extract row and col from the dataset of the hovered cell
    const { row, col } = event.target.dataset;
    console.log(row, col);

    // Determine varying and constant coordinates based on isVertical
    const varyingCoord = isVertical ? parseInt(row, 10) : parseInt(col, 10);
    const constantCoord = isVertical ? parseInt(col, 10) : parseInt(row, 10);

    // Add the "dark" class to the specified range of cells
    for (let i = varyingCoord; i < varyingCoord + _length; i++) {
      const currentCell = isVertical
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
    return cells.find(
      (cell) =>
        cell.dataset.row === row.toString() &&
        cell.dataset.col === col.toString()
    );
  }

  function resetDarkClass() {
    hoveredCells.forEach((cell) => {
      cell.classList.remove("dark");
    });
    hoveredCells = [];
  }
}

function gameIsOver() {
  return playerBoard.isOver() || enemyBoard.isOver();
}

function activateGame() {
  //listen for gameboard clicks for attack
  eventEmitter.on("gameboard click", (board, cell, row, col) => {
    if (board.id === "enemy" && dodot.isTheirTurn && !gameIsOver()) {
      const results = enemyBoard.receiveAttack(row, col);

      // Display gameboard without showing ships
      DOM.displayGameboard(enemyBoard, "enemy", false);

      if (results.isASuccessfulHit) {
        switchTurn();
      }

      checkForWin();
    }

    if (enemy.isTheirTurn && !gameIsOver()) {
      let results;

      do {
        const [row, col] = enemy.generateAttack();
        results = playerBoard.receiveAttack(row, col);
      } while (!results.isASuccessfulHit);

      switchTurn();

      // Display gameboard with showing ships
      DOM.displayGameboard(playerBoard, "player", true);
      checkForWin();
    }
  });
}

function checkForWin() {
  // todo add feature
  //DOM.displayWinner(player);

  if (playerBoard.isOver()) {
    console.log("Player lost", playerBoard.map, enemyBoard.map);
  } else if (enemyBoard.isOver()) {
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

  DOM.displayGameboard(playerBoard, "player", true);
  DOM.listenForGameboardClicks(); //async, activate event emitter

  //position ships
  activateShipsPlacement();
  enemyBoard.placeShipsRandomly();

  eventEmitter.on("done ships placement", () => {
    activateGame();
  });
}
