import { Player, AI } from "../modules/Player";
import Gameboard from "../modules/Gameboard";
import Ship from "../modules/Ship";

describe("Game Test", function () {
  test("Player wins", function () {
    const player = new Player("Dodot");
    const bot = new AI("Bot");
    const playerGameboard = new Gameboard(player);
    const botGameboard = new Gameboard(bot);

    const destroyer = new Ship("Destroyer", 3);
    const destroyer2 = new Ship("Destroyer", 3);

    playerGameboard.placeShip(destroyer, [0, 0], true);
    botGameboard.placeShip(destroyer2, [0, 0], true);

    playerGameboard.receiveAttack(0, 1);
    botGameboard.receiveAttack(0, 0);
    playerGameboard.receiveAttack(0, 1);
    botGameboard.receiveAttack(1, 0);
    playerGameboard.receiveAttack(0, 1);
    botGameboard.receiveAttack(2, 0);

    expect(botGameboard.isOver()).toBe(true);
    expect(playerGameboard.isOver()).toBe(false);
  });
});
