import Ship from "./Ship.js";
import { Player, AI } from "./Player.js";
import eventEmitter from "./Events.js";
/* 
TODO
Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldn’t be relying on console.log or DOM methods to make sure your code is doing what you expect it to.

//1. Gameboards should be able to place ships at specific coordinates by calling the ship factory function.

//2. Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.

3. Gameboards should keep track of missed attacks so they can display them properly.

4. Gameboards should be able to report whether or not all of their ships have been sunk.

*/

class Gameboard {
  constructor(_player) {
    this.gameState = this.#createGameState();
    this.player = _player;
    this.map = Gameboard.generateMap();

    //listens to DOM changes
    eventEmitter.on("place ship", (playerName, ship, coord, isVertical) => {
      if (playerName == this.player) this.placeShip(ship, coord, isVertical);
    });

    // placeShip(ship, [row, col] = coord, isVertical)
  }

  static generateMap() {
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
  }

  /**
   * @param {Ship} ship - The ship
   * @param {number[]} coords - Coordinates of the ship in the map
   */

  placeShip(ship, [row, col] = coord, isVertical) {
    let success = true;

    // Create a deep copy of the map
    let tempMap = this.map.map((row) => [...row.map((cell) => cell)]);

    // Create a shallow copy of the shipsAndTheirOccupiedSpaces
    let tempList = { ...this.gameState.shipsAndTheirOccupiedSpaces };

    for (let i = 0; i < ship.length; i++) {
      if (this.#isPlacementPossible(row, col)) {
        tempMap[row][col] = "S";
        tempList[`${row},${col}`] = ship;

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
  }

  placeShipsRandomly() {
    const getRandomCoord = () => Math.floor(Math.random() * 10);
    const getRandomIsVertical = () => Math.random() < 0.5;

    const Carrier = new Ship("Carrier", 5);
    const Battleship = new Ship("Battleship", 4);
    const Cruiser = new Ship("Cruiser", 3);
    const Submarine = new Ship("Submarine", 3);
    const Destroyer = new Ship("Destroyer", 2);

    const attemptToPlaceShip = (ship) => {
      let isPlacedSuccessfully = false;
      do {
        const coords = [getRandomCoord(), getRandomCoord()];
        isPlacedSuccessfully = this.placeShip(
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
  }

  /**
   * @param {Number} row
   * @param {Number} col
   * @returns {boolean} Returns true if a ship was hit, false if otherwise;
   */
  receiveAttack(row, col) {
    // * push attack info
    let results = { isASuccessfulHit: false, shipHit: false, waterHit: false };

    // ! nahhhh giatay ang DOM makauna man ug update
    if (this.map[row][col] == "X") {
      return (results.isASuccessfulHit = false);
    } else {
      results.isASuccessfulHit = true;
      this.map[row][col] = "X";

      let shipHit = this.#attackShip(row, col);
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
  }

  isOver() {
    return !this.map.some((row) => row.includes("S"));
  }

  // private methods

  #createGameState = () => {
    return {
      missedSquares: [],
      hittedSquares: [], // [[x,y], [x,y], [x,y]]
      shipsAndTheirOccupiedSpaces: {
        /* 
        'x, y': Ship 1,
        'x, y': Ship 1,
        */
      },
    };
  };

  /**
   *
   * @param {Number} row
   * @param {Number} col
   * @returns {boolean} True if attack was successful, false otherwise;
   */

  #attackShip(row, col) {
    const _Ship = this.gameState.shipsAndTheirOccupiedSpaces[`${row},${col}`];

    // * if Ship is undefined, there's no ship at [row, col]

    if (_Ship !== undefined) return _Ship.hit();
    return false;
  }

  #isPlacementPossible(row, col) {
    const numRows = this.map.length;
    const numCols = this.map[0].length;

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
}

export default Gameboard;
