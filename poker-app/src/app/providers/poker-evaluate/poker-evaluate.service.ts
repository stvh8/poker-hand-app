import { Injectable } from '@angular/core';
import { Game } from "./lib/poker-lib";

@Injectable({
  providedIn: 'root'
})

export class PokerEvaluateService {
  private _data: any;
  private _game: Game;

  constructor() {}

  create(data: any) {
    this._game = new Game(data);
  }

  getResults() {
    return this._game.getResults();
  }
}
