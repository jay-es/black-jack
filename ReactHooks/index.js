const getPoint = arr => arr.reduce((acc, { val }) => acc + val, 0);

const Score = ({ cards, hidden, name, point }) => (
  hidden
    ? <div>{name}: ** [{cards[0] && cards[0].sym + cards[0].num}, **]</div>
    : <div>{name}: {point} [{cards.map(v => v.sym + v.num).join()}]</div>
);

const App = () => {
  const [deck] = React.useState([]);
  const [hisCards, setHisCards] = React.useState([]);
  const [myCards, setMyCards] = React.useState([]);
  const [result, setResult] = React.useState('');

  let hisPoint = getPoint(hisCards);
  let myPoint = getPoint(myCards);

  const decide = () => {
    // 17以上になるまで取る
    while (hisPoint < 17) {
      pick(hisCards, setHisCards);
    }

    judge();
  }

  const judge = () => {
    let result = 'Draw!';

    if (myPoint > 21 || (hisPoint <= 21 && myPoint < hisPoint)) {
      result = 'Lose!';
    } else if (hisPoint > 21 || myPoint > hisPoint) {
      result = 'Win!';
    }

    setResult(result);
  };

  // 1枚ランダムに取得
  const pick = (getter, setter) => {
    const card = deck.splice(Math.random() * deck.length, 1)[0];
    getter.push(card);
    setter([...getter]);

    if (getter === myCards) myPoint = getPoint(myCards);
    if (getter === hisCards) hisPoint = getPoint(hisCards);
  
    // 21点を超えたらバースト
    if (myPoint > 21) {
      judge();
    }
  };

  const reset = () => {
    // カード初期化
    const newDeck = Array.from(Array(52).keys()).map(v => {
      const num = (v % 13) + 1;
      const sym = ['C', 'D', 'H', 'S'][Math.floor(v / 13)];
      return { num, sym, val: Math.min(num, 10) };
    });

    deck.splice(0, deck.length, ...newDeck);
    myCards.splice(0, myCards.length);
    hisCards.splice(0, hisCards.length);
    setResult('');

    // 2枚ずつ引く
    pick(myCards, setMyCards);
    pick(myCards, setMyCards);
    pick(hisCards, setHisCards);
    pick(hisCards, setHisCards);
  };

  React.useEffect(reset, []);

  return (
    <div>
      <button onClick={() => pick(myCards, setMyCards)} disabled={result}>Pick</button>
      <button onClick={() => decide()} disabled={result}>Decide</button>
      <button onClick={() => reset()} disabled={!result}>Reset</button>
      <Score name="me" point={myPoint} cards={myCards} />
      <Score name="he" point={hisPoint} cards={hisCards} hidden={!result} />
      <strong>{result}</strong>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
