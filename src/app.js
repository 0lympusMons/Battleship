import Ship from "./modules/Ship";
import Gameboard from "./modules/Gameboard";
import { Player, AI } from "./modules/Player";
import DOM from "./modules/DOM";
import eventEmitter from "./modules/Events";

// make boards

let dodot = new Player("Dodot");
let enemy = new AI("enemy");

let playerBoard = new Gameboard(dodot);
let enemyBoard = new Gameboard(enemy);

//position ships

playerBoard.placeShipsRandomly();
enemyBoard.placeShipsRandomly();

start();

// todo this:WIP
// DOM.initializeShipsPlacement(playerBoard);

// todo continue here: fix dispaying gameboards
eventEmitter.on("gameboard click", (board, cell, row, col) => {
  checkForWin();
  if (board.id === "enemy") {
    if (dodot.isTheirTurn) {
      let results = enemyBoard.receiveAttack(row, col);

      //display gameboard but hide ships
      DOM.displayGameboard(enemyBoard, "enemy", false);

      if (results.isASuccessfulHit) {
        switchTurn();
      }
    }
  }

  if (enemy.isTheirTurn) {
    let results = { isASuccessfulHit: false };

    do {
      const [row, col] = enemy.generateAttack();
      results = playerBoard.receiveAttack(row, col);
    } while (!results.isASuccessfulHit);

    switchTurn();

    DOM.displayGameboard(playerBoard, "player", true);
  }
});

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

// * functions

function start() {
  dodot.isTheirTurn = true;
  enemy.isTheirTurn = false;

  DOM.displayGameboard(playerBoard, "player", true);
  DOM.listenForGameboardClicks();
}

// * functions end here
