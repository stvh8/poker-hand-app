/**
 * enum of card suits
 */
export enum Suit {
  Spades,
  Clubs,
  Hearts,
  Diamonds,
}

/**
 * defines a card class
 */
export class Card {
  public readonly rank: number;
  public readonly suit: number;

  /**
   * creates a single card instance
   * @param rank - the card rank (ace through king)
   * @param suit - the card suit
   */
  public constructor (rank: number, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  // the friendly rank names
  private static rankNames = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'Jack',
    'Queen',
    'King',
    'Ace',
  ];

  /**
   * returns a friendly rank name
   * @returns {string} the card rank
   */
  public get rankName (): string {
    return Card.rankNames[this.rank - 1];
  }

  /**
   * returns a friendly suit name
   * @returns {string} the card suit
   */
  public get suitName (): string {
    return Suit[this.suit];
  }

  /**
   * return a verbose card name
   * @returns {string} the card name
   */
  public get name (): string {
    return this.rankName + ' of ' + this.suitName;
  }

  /**
   * returns a card image code
   * @returns {string} the code for a card
   */
  public get imageName (): string {
    let s: string, r: string;

    if (this.rank === 1 || this.rank > 10) {
      r = this.rankName.charAt(0);
    } else {
      r = this.rank + '';
    }

    s = this.suitName.charAt(0);

    return r + s;
  }
}
