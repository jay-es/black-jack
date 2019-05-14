export class Card {
  /**
   * @param {string} mark
   * @param {number} num
   */
  constructor(mark, num) {
    this.mark = mark;
    this.num = num;
    this.val = Math.min(num, 10);
  }
}

export default class CardDeck {
  /** @type {Card[]} */
  cards = [];

  init() {
    this.cards = [];

    const marks = ['S', 'H', 'D', 'C'];
    marks.forEach((mark) => {
      for (let num = 1; num <= 13; num++) {
        this.cards.push(new Card(mark, num));
      }
    });
  }

  // 1枚ランダムに取得
  pick() {
    const n = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(n, 1)[0];
  }
}
