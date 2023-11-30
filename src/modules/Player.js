/* 
TODO
1. Players can take turns playing the game by attacking the enemy Gameboard.

2. The game is played against the computer, so make the ‘computer’ capable of making random plays. The AI does not have to be smart, but it should know whether or not a given move is legal (i.e. it shouldn’t shoot the same coordinate twice). */

class Player {
  constructor(playerName) {
    this.name = playerName;

    this.isTheirTurn = false;
  }

  toggleIsTheirTurn() {
    this.isTheirTurn = !this.isTheirTurn;
  }
}

class AI extends Player {
  /**
   * @returns {Array.<number>}
   */
  generateAttack() {
    const getRandomCoord = () => Math.floor(Math.random() * 10);
    return [getRandomCoord(), getRandomCoord()];
  }
}

export { Player, AI };
