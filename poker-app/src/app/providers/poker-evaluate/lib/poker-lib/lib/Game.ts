"use strict";

import { Round } from "./Round";

/**
 * defines a game class
 */
export class Game {
  private rawData: any;         // local raw data storage
  public rounds: Round[] = [];  // stores the results of rounds

  public constructor (data) {
    this.rawData = data;
    this.evaluate();
  }

  private evaluate() {
    // loop through the rounds and build results
    this.rawData.rounds.forEach((roundData) => {
      const roundObj: Round = new Round(roundData.players);
      this.rounds.push(roundObj);
    })
  }

  public getResults(): Round[] {
    return this.rounds;
  }
}
