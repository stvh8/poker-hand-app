import { Deck } from "./Deck";
import { Hand } from "./Hand";

const cardCount = 5;  // the number of cards per hand

/**
 * defines a player class
 */
export class Player {
  name: string;
  hand: Hand;
}

/**
 * defines a round class
 */
export class Round {
  public readonly deck: Deck;
  public readonly players: Player[] = [];

  /**
   * class constructor
   * @param players - array of player types
   */
  public constructor (players) {
    this.deck = new Deck();
    this.deck.shuffle();

    players.forEach((player) => {
      const playerObj = {
        name: <string>player.name,
        hand: new Hand(player.hand) || this.draw()
      };

      this.players.push(playerObj)
    });

    this.rankPlayers();
  }

  /**
   * builds a random hand of cards
   * @returns {Hand} a hand of random unique cards
   */
  public draw (): Hand {
    const hand: Hand = new Hand();

    for (let i=0; i<cardCount; i++) {
      hand.cards.push(this.deck.draw());
    }

    return hand;
  }

  /**
   * loops through non scoring cards to sort by high card
   * @param a
   * @param b
   */
  private compareNonScoringCards(a, b) {
    const aCards = a.hand.getScore().otherCards.map((o) => o.rank);
    const bCards = b.hand.getScore().otherCards.map((o) => o.rank);
    for (let i=0; i<aCards.length; i++) {
      if (aCards[i] > bCards[i]) {
        return -1;
      } else if (aCards[i]< bCards[i]) {
        return 1;
      }
    }
  }

  /**
   * sorts the players based on their rank descending
   */
  private rankPlayers (): void {
    this.players.sort((a, b) => {
      const aValue = a.hand.getScore().rank.value + a.hand.getScore().scoringCards[0].rank;
      const bValue = b.hand.getScore().rank.value + b.hand.getScore().scoringCards[0].rank;

      if (aValue > bValue){
        return -1;
      } else if ( aValue < bValue) {
        return 1;
      } else {
        return this.compareNonScoringCards(a, b)
      }
    });
  }
}
