const Score = ({ cards, hidden, name, point }) => (
  hidden
    ? <div>{name}: ** [{cards[0] && cards[0].sym + cards[0].num}, **]</div>
    : <div>{name}: {point} [{cards.map(v => v.sym + v.num).join()}]</div>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      deck: [],
      hisCards: [],
      myCards: [],
      result: '',
    };
  }

  get hisPoint() {
    return this.state.hisCards.reduce((acc, { val }) => acc + val, 0);
  }

  get myPoint() {
    return this.state.myCards.reduce((acc, { val }) => acc + val, 0);
  }  

  decide() {
    // 17以上になるまで取る
    while (this.hisPoint < 17) {
      this.pick(this.state.hisCards);
    }

    this.judge();
  }

  judge() {
    const [myPoint, hisPoint] = [this.myPoint, this.hisPoint];
    let result = 'Draw!';

    if (myPoint > 21 || (hisPoint <= 21 && myPoint < hisPoint)) {
      result = 'Lose!';
    } else if (hisPoint > 21 || myPoint > hisPoint) {
      result = 'Win!';
    }

    this.setState({ result });
  }

  // 1枚ランダムに取得
  pick(arr) {
    const deck = this.state.deck;
    const card = deck.splice(Math.random() * deck.length, 1)[0];
    arr.push(card);
    this.setState({ deck });

    // 21点を超えたらバースト
    if (this.myPoint > 21) {
      this.judge();
    }
  }

  reset() {
    // カード初期化
    const deck = Array.from(Array(52).keys()).map(v => {
      const num = (v % 13) + 1;
      const sym = ['C', 'D', 'H', 'S'][Math.floor(v / 13)];
      return { num, sym, val: Math.min(num, 10) };
    });

    this.setState({
      deck,
      hisCards: [],
      myCards: [],
      result: '',
    });

    // 2枚ずつ引く
    setTimeout(() => {
      this.pick(this.state.myCards);
      this.pick(this.state.myCards);
      this.pick(this.state.hisCards);
      this.pick(this.state.hisCards);
    });
  }

  componentDidMount() {
    this.reset();
  }

  render() {
    const { hisCards, myCards, result } = this.state;

    return (
      <div>
        <button onClick={() => this.pick(myCards)} disabled={result}>Pick</button>
        <button onClick={() => this.decide()} disabled={result}>Decide</button>
        <button onClick={() => this.reset()} disabled={!result}>Reset</button>
        <Score name="me" point={this.myPoint} cards={myCards} />
        <Score name="he" point={this.hisPoint} cards={hisCards} hidden={!result} />
        <strong>{result}</strong>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
