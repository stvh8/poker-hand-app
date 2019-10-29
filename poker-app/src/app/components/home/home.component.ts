import { Component, OnInit } from '@angular/core';
import { PokerEvaluateService } from "../../providers/poker-evaluate/poker-evaluate.service";

import { sampleData } from "../../providers/poker-evaluate/lib/poker-lib/sampleData";

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _gameData: any;
  public results: any;

  constructor(
    private _pokerService: PokerEvaluateService
  ) {}

  ngOnInit() {
    this._gameData = sampleData;
    this._pokerService.create(this._gameData);
    this.results = this._pokerService.getResults();

    this.logResults();
  }

  logResults() {
    let roundCount = 0;

    this.results.forEach((round: any) => {
      roundCount++;

      console.log("<<<<<<<< Round {1} >>>>>>>>".replace("{1}", roundCount.toString()));

      round.players.forEach((player) => {
        console.log(player.name, player.hand.getScore());
      });

      console.log("\n\n");
    });

    console.log("Rounds processed: " + roundCount + "\n\n");
  }
}
