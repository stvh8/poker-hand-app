import { Card } from "./Card";

/**
 * defines a hand rank
 */
export interface HandRank {
  name: string,
  value: number
}

/**
 * defines a hand score
 */
export interface Score {
  rank: HandRank,
  scoringCards: Card[],
  otherCards: Card[]
}

/**
 * defines the various types of ranks
 */
let Ranks: {
  [x: string]: HandRank
} = {
  // ROYAL_FLUSH: {
  //   name: 'Royal Flush'
  // },
  // STRAIGHT_FLUSH: {
  //   name: 'Straight Flush'
  // },
  // FOUR_OF_A_KIND: {
  //   name: 'Four of a Kind'
  // },
  // FULL_HOUSE: {
  //   name: 'Full House'
  // },
  FLUSH: {
    name: 'Flush',
    value: 4000
  },
  // STRAIGHT: {
  //   name: 'Straight'
  // },
  THREE_OF_A_KIND: {
    name: 'Three of a Kind',
    value: 3000
  },
  // TWO_PAIR: {
  //   name: 'Two Pair'
  // },
  TWO_OF_A_KIND: {
    name: 'Two of a Kind',
    value: 2000
  },
  HIGH_CARD: {
    name: 'High Card',
    value: 1000
  }
};

/**
 * logical grouping object for kinds
 */
export interface KindsGroup {
  cards: Card[];
  rank: number;
}

/**
 * defines a kinds class
 */
class Kinds {
  private kinds: {
    [rank: number]: Card[],
  };

  /**
   * receives a hand and groups like cards
   * @param cards
   */
  public constructor (cards: Card[]) {
    this.kinds = {};

    cards.forEach(c => {
      let r = c.rank;

      if (this.kinds[r] === undefined) this.kinds[r] = [];

      this.kinds[r].push(c);
    });
  }

  /**
   * determines if a grouping of type exists
   * @param numOfKinds
   */
  public has (numOfKinds: number): KindsGroup | false {
    let kg = this.all(numOfKinds);

    if (kg) return kg[0];

    return false;
  }

  /**
   * evals the number of different kinds
   * @param numOfKinds
   */
  public all (numOfKinds: number): KindsGroup[] | false {
    let result: KindsGroup[] = [];

    // get the ranks keys and sort descending
    const ranks = Object.keys(this.kinds).sort((a, b) => {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });

    for (let rank of ranks) {
      if (this.kinds[rank].length === numOfKinds) {
        result.push({
          cards: this.kinds[rank],
          rank: +rank,
        });
      }
    }

    if (result.length === 0) return false;

    return result;
  }
}

/**
 * defines a hand class
 */
export class Hand {
  public readonly cards: Card[]; // the cards in the hand

  /**
   * creates a hand object
   * @param cards - an array of card objects
   */
  public constructor (cards?: Card[]) {
    if (cards !== undefined) {
      this.cards = cards;
    } else {
      this.cards = [];
    }

    // sort the cards by rank
    this.cards.sort((a, b) => {
      if (a.rank < b.rank) {
        return 1;
      } else if (a.rank > b.rank) {
        return -1;
      } else {
        return 0;
      }
    })
  }

  /**
   * evals if a flush
   */
  private isFlush (): boolean {
    let suit = this.cards[0].suit;

    return this.cards.every(c => c.suit === suit);
  }

  /**
   * determines a hand score
   * supports flush, three of a kind, 2 of a kind, and high card rules
   */
  public getScore (): Score {
    let kinds = new Kinds(this.cards);

    let has3 = kinds.has(3),
      has2 = kinds.has(2);

    if (this.isFlush()) {
      return {
        rank: Ranks.FLUSH,
        scoringCards: this.cards,
        otherCards: []
      };
    }

    if (has3) {
      return {
        rank: Ranks.THREE_OF_A_KIND,
        scoringCards: has3.cards,
        otherCards: this.cards.filter((item) => item.rank !== (<KindsGroup>has3).cards[0].rank)
      };
    }

    if (has2) {
      return {
        rank: Ranks.TWO_OF_A_KIND,
        scoringCards: has2.cards,
        otherCards: this.cards.filter((item) => item.rank !== (<KindsGroup>has2).cards[0].rank)
      };
    }

    return {
      rank: Ranks.HIGH_CARD,
      scoringCards: [this.cards[0]],
      otherCards: []
    };
  }
}
