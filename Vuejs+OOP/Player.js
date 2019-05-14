/** @typedef {import('./CardDeck').Card} Card */

export default class Player {
  /** @type {Card[]} */
  cards = [];

  /** @type {number} */
  #point = 0

  init() {
    this.cards = [];
    this.#point = 0;
  }

  /**
   * @param {Card} card
   */
  addCard(card) {
    this.cards.push(card);
    this.#point += card.val;
  }

  get point () {
    return this.#point;
  }
}
