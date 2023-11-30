import Ship from "../modules/Ship";
import Gameboard from "../modules/Gameboard";
import { Player, AI } from "../modules/Player";
import DOM from "../modules/DOM";
import eventEmitter from "../modules/Events";

describe("Hit carrier until sunk", function () {
  test("1 Hit carrier", () => {
    let carrier = new Ship("carrier", 5);

    carrier.hit();

    expect(carrier.isSunk()).toBe(false);
  });

  test("2 hit carrier", () => {
    let carrier = new Ship("carrier", 5);

    carrier.hit();
    carrier.hit();

    expect(carrier.isSunk()).toBe(false);
  });

  test("3 hit carrier", () => {
    let carrier = new Ship("carrier", 5);

    carrier.hit();
    carrier.hit();
    carrier.hit();

    expect(carrier.isSunk()).toBe(false);
  });

  test("4 hit carrier", () => {
    let carrier = new Ship("carrier", 5);

    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();

    expect(carrier.isSunk()).toBe(false);
  });

  test("5 hit carrier: sink carrier", () => {
    let carrier = new Ship("carrier", 5);

    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();
    carrier.hit();

    expect(carrier.isSunk()).toBe(true);
  });
});

describe("Gameboard", function () {
  let gameboard = new Gameboard();

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("hit ship once", () => {
    let destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);
    // gameboard.receiveHits(row, col);
    expect(gameboard.receiveAttack(0, 0)).toBe(true);

    expect(destroyer.isSunk()).toBe(false);
    expect(gameboard.isOver()).toBe(false);
  });

  test("hit ship twice", () => {
    let destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);
    // gameboard.receiveHits(row, col);
    expect(gameboard.receiveAttack(0, 0)).toBe(true);
    expect(gameboard.receiveAttack(2, 0)).toBe(true);

    expect(destroyer.isSunk()).toBe(false);
    expect(gameboard.isOver()).toBe(false);
  });

  test("sink ship", () => {
    let destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);
    // gameboard.receiveAttack(row, col);

    expect(gameboard.receiveAttack(0, 0)).toBe(true);
    expect(gameboard.receiveAttack(1, 0)).toBe(true);
    expect(gameboard.receiveAttack(2, 0)).toBe(true);

    expect(destroyer.isSunk()).toBe(true);
    expect(gameboard.isOver()).toBe(true);
  });

  test("Game is not over when ship is around", () => {
    let destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);
    expect(gameboard.isOver()).toBe(false);
  });

  test("Game is over when no ship is around", () => {
    let destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(1, 0);
    gameboard.receiveAttack(2, 0);
    gameboard.isOver();
  });

  test("Miss shots, ship will not sink", () => {
    let destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);

    expect(gameboard.receiveAttack(9, 9)).toBe(false);
    expect(gameboard.receiveAttack(8, 8)).toBe(false);
    expect(gameboard.receiveAttack(7, 7)).toBe(false);

    expect(destroyer.isSunk()).toBe(false);
  });

  test("Right ship placement", () => {
    const Carrier = new Ship("Carrier", 5);

    expect(gameboard.placeShip(Carrier, [5, 0], false)).toBe(true);
  });
  test("Wrong ship placement", () => {
    const Carrier = new Ship("Carrier", 5);

    expect(gameboard.placeShip(Carrier, [9, 9], false)).toBe(false);
    expect(gameboard.placeShip(Carrier, [9, 9], true)).toBe(false);
  });

  test("Overlapping ship placement", () => {
    const destroyer = new Ship("battleship", 3);
    gameboard.placeShip(destroyer, [0, 0], true);

    const Carrier = new Ship("Carrier", 5);

    expect(gameboard.placeShip(Carrier, [0, 0], false)).toBe(false);
    expect(gameboard.placeShip(Carrier, [0, 0], true)).toBe(false);

    expect(gameboard.placeShip(Carrier, [1, 0], false)).toBe(false);
    expect(gameboard.placeShip(Carrier, [1, 0], true)).toBe(false);

    expect(gameboard.placeShip(Carrier, [2, 0], false)).toBe(false);
    expect(gameboard.placeShip(Carrier, [2, 0], true)).toBe(false);
  });

  test("Out of bounds ship placement", () => {
    const Carrier = new Ship("Carrier", 5);
    expect(gameboard.placeShip(Carrier, [9, 9], false)).toBe(false);
    expect(gameboard.placeShip(Carrier, [9, 0], true)).toBe(false);
  });

  test("Random ship placement", () => {
    gameboard.placeShipsRandomly();

    expect(
      Object.keys(gameboard.gameState.shipsAndTheirOccupiedSpaces).length
    ).toBe(17);
  });
});

describe("Play Game", () => {
  test("Player vs Player", () => {
    let playerBoard = new Gameboard(new Player("Dodot"));
    let botBoard = new Gameboard(new AI("Bot"));

    //position ships
    playerBoard.placeShipsRandomly();
    botBoard.placeShipsRandomly();

    //attack til game is over
    // while game is not over, generate attack
    while (!playerBoard.isOver() && !botBoard.isOver()) {
      const getRandomCoord = () => Math.floor(Math.random() * 10);
      playerBoard.receiveAttack(getRandomCoord(), getRandomCoord());
      botBoard.receiveAttack(getRandomCoord(), getRandomCoord());
    }

    expect(playerBoard.isOver() || botBoard.isOver()).toBe(true);
  });
});

describe("DOM", () => {
  let gameboard = new Gameboard("player");
  let gameboard2 = new Gameboard("enemy");
  let ship = new Ship("destroyer", 5);

  // todo new change!
  DOM.placeShip("player", ship, [0, 0], false);

  console.log(gameboard.map);
  expect(gameboard.isOver()).toBe(false);
  expect(gameboard2.isOver()).toBe(true);
});
