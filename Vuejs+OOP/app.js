import CardDeck from './CardDeck.js'
import Player from './Player.js'

const [STR_WIN, STR_LOSE, STR_DRAW] = ['Win', 'Lose', 'Draw'];

new Vue({
  el: '#app',
  data: {
    cardDeck: new CardDeck(),
    me: new Player(),
    he: new Player(),
    resultStr: '',
  },
  created() {
    this.reset();
  },
  methods: {
    // 1枚引いて自分の手札に入れる
    getCard() {
      this.me.addCard(this.cardDeck.pick());

      // 21点を超えたらバースト
      if (this.me.point > 21) {
        this.resultStr = STR_LOSE;
      }
    },
    reset() {
      // カード初期化
      this.cardDeck.init();

      // 2枚ずつ引く
      this.me.init();
      this.me.addCard(this.cardDeck.pick());
      this.me.addCard(this.cardDeck.pick());

      this.he.init();
      this.he.addCard(this.cardDeck.pick());
      this.he.addCard(this.cardDeck.pick());

      this.resultStr = '';
    },
    decide() {
      // 17以上になるまで取る
      while (this.he.point < 17) {
        this.he.addCard(this.cardDeck.pick());
      }

      this.resultStr = this.judge(this.me.point, this.he.point);
    },
    judge(mine, his) {
      if (mine > his || his > 21) {
        return STR_WIN;
      } else if (mine < his) {
        return STR_LOSE;
      } else {
        return STR_DRAW;
      }
    },
  },
});
