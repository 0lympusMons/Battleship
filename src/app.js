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

eventEmitter.on("gameboard click", (board, cell, row, col) => {
  checkForWin();
  // todo continue here

  if (board.id === "enemy") {
    if (dodot.isTheirTurn) {
      let results = enemyBoard.receiveAttack(row, col);
      // DOM.displayGameboard(enemyBoard, "enemy", false);
      //display gameboard but hide ships

      //! PROBLEM: ONLY RETURNS TRUE IF HIT SHIP, APIL UNTA WATER
      if (results.isASuccessfulHit) {
        if (results.waterHit) DOM.darkenCell(cell, "dark");
        if (results.shipHit) DOM.darkenCell(cell, "red");
        switchTurn();
      }
    }
  }

  //enemy's turn, attack
  if (enemy.isTheirTurn) {
    let result = false;
    do {
      const [row, col] = enemy.generateAttack();
      const { isASuccessfulHit } = playerBoard.receiveAttack(row, col);
      result = isASuccessfulHit;
    } while (!result);

    console.log(playerBoard.map);
    DOM.displayGameboard(playerBoard, "player", true);
    switchTurn();
  }
});

function checkForWin() {
  //DOM.displayWinner(player);

  if (playerBoard.isOver()) {
    console.log("Player lost", playerBoard.map, enemyBoard.map);
  } else if (enemyBoard.isOver()) {
    console.log("Player won", playerBoard.map, enemyBoard.map);
  }

  //return winner
  return playerBoard.isOver()
    ? playerBoard.player.name
    : enemyBoard.player.name;
}

function switchTurn() {
  //if attack was successful
  dodot.toggleIsTheirTurn();
  enemy.toggleIsTheirTurn();

  return dodot.isTheirTurn ? dodot : enemy;
}

//disable clicks, if not dodot's turn
// enable again, if yes
//for every enable/disable check if isOver
//

// * functions

function start() {
  // DOM.startGame(enemyBoard);

  dodot.isTheirTurn = true;
  enemy.isTheirTurn = false;

  DOM.displayGameboard(playerBoard, "player", true);
  ///// DOM.displayGameboard(enemyBoard, "enemy", false);
  DOM.listenForGameboardClicks();
}

// * functions end here
