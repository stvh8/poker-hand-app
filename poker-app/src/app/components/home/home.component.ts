import { Component, OnInit } from '@angular/core';
import { PokerEvaluateService } from "../../providers/poker-evaluate/poker-evaluate.service";

import { sampleData } from "../../providers/poker-evaluate/lib/poker-lib/sampleData";

import { Card } from "../../providers/poker-evaluate/lib/poker-lib/lib/Card";
import { Round } from "../../providers/poker-evaluate/lib/poker-lib/lib/Round";
import { Hand } from '../../providers/poker-evaluate/lib/poker-lib/lib/Hand';

// used for calculating images
const SuitCodes = ["S", "C", "H", "D"];
const RankCodes = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private _gameData: any;
  public results: any;
  public fileToUpload: any;
  public dataInput: string = "";

  constructor(
    private _pokerService: PokerEvaluateService
  ) {}

  ngOnInit() {}

  /**
   * runs the ui evaluation using data within library
   */
  runEmbeddedData() {
    this._gameData = sampleData;
    this._pokerService.create(this._gameData);
    this.results = this._pokerService.getResults();

    this.logResults();
  }

  /**
   * fires on change of data input field
   * @param ev
   */
  doDataInputChange(ev: any) {
    this.dataInput = ev.target.value;
    try {
      console.log("data input", this.dataInput);
      this._gameData = JSON.parse(this.dataInput);
    } catch (err) {
      alert("Error parsing JSON\n" + err.message);
      return;
    }
  }

  /**
   * runs the ui evaluation using data within library
   */
  runUploadedData() {
    this._pokerService.create(this._gameData);
    this.results = this._pokerService.getResults();

    this.logResults();
  }

  /**
   * logs out results to console
   */
  logResults() {
    let roundCount = 0;

    this.results.forEach((round: Round) => {
      roundCount++;

      console.log("<<<<<<<< Round {1} >>>>>>>>".replace("{1}", roundCount.toString()));

      round.players.forEach((player) => {
        console.log(player.name, player.hand.getScore());
      });

      console.log("\n\n");
    });

    console.log("Rounds processed: " + roundCount + "\n\n");
  }

  /**
   * tests if card is a member of the scoring cards
   * @param hand - the hand with the scoring cards
   * @param card - the card to be tested against
   */
  isScoringCard(hand: Hand, card: Card): boolean {
    const scoringCard = hand.getScore().scoringCards
      .filter((item) => item.rank === card.rank && item.suit === card.suit);
    return !!scoringCard.length;
  }

  /**
   * get a card image name
   * @param card
   */
  getCardImage(card: Card): string {
    let img = "";

    img += RankCodes[card.rank-1];
    img += SuitCodes[card.suit];
    img += '.png';

    return img;
  }
}
