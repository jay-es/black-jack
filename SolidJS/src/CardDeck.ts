export class Card {
  readonly val: number;

  constructor(readonly mark: string, readonly num: number) {
    this.val = Math.min(num, 10);
  }
}

export default class CardDeck {
  private cards: Card[] = [];

  init(): void {
    this.cards = [];

    const marks = ["S", "H", "D", "C"];
    marks.forEach((mark) => {
      for (let num = 1; num <= 13; num++) {
        this.cards.push(new Card(mark, num));
      }
    });
  }

  // 1枚ランダムに取得
  pick(): Card {
    const n = Math.floor(Math.random() * this.cards.length);
    return this.cards.splice(n, 1)[0];
  }
}
