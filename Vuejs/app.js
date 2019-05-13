const [STR_WIN, STR_LOSE, STR_DRAW] = ['Win', 'Lose', 'Draw'];

new Vue({
  el: '#app',
  data: {
    cardDeck: [],
    myCards: [],
    hisCards: [],
    resultStr: '',
  },
  computed: {
    myPoint() {
      return this.myCards.reduce(this.sumCards, 0);
    },
    hisPoint() {
      return this.hisCards.reduce(this.sumCards, 0);
    },
  },
  created() {
    this.reset();
  },
  methods: {
    sumCards: (acc, { val }) => acc + val,
    // 1枚引いて自分の手札に入れる
    getCard() {
      const card = this.pickCard()
      this.myCards.push(card);

      // 21点を超えたらバースト
      if (this.myPoint > 21) {
        this.resultStr = STR_LOSE;
      }
    },
    // 1枚ランダムに取得
    pickCard() {
      const n = Math.floor(Math.random() * this.cardDeck.length);
      return this.cardDeck.splice(n, 1)[0];
    },
    reset() {
      // カード初期化
      this.cardDeck = [];
      const marks = ['S', 'H', 'D', 'C'];
      marks.forEach((mark) => {
        for (let num = 1; num <= 13; num++) {
          const val = Math.min(num, 10)
          this.cardDeck.push({ mark, num, val });
        }
      });

      // 2枚ずつ引く
      this.myCards = [this.pickCard(), this.pickCard()];
      this.hisCards = [this.pickCard(), this.pickCard()];

      this.resultStr = '';
    },
    decide() {
      // 17以上になるまで取る
      while (this.hisPoint < 17) {
        const card = this.pickCard()
        this.hisCards.push(card);
      }

      this.resultStr = this.judge(this.myPoint, this.hisPoint);
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
