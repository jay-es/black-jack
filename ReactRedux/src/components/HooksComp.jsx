import React, { useEffect, useState } from 'react';
import Score from './Score';

const getPoint = arr => arr.reduce((acc, { val }) => acc + val, 0);

const HooksComp = () => {
  const [deck] = useState([]);
  const [hisCards, setHisCards] = useState([]);
  const [myCards, setMyCards] = useState([]);
  const [result, setResult] = useState('');

  let hisPoint = getPoint(hisCards);
  let myPoint = getPoint(myCards);

  const judge = () => {
    let newResult = 'Draw!';

    if (myPoint > 21 || (hisPoint <= 21 && myPoint < hisPoint)) {
      newResult = 'Lose!';
    } else if (hisPoint > 21 || myPoint > hisPoint) {
      newResult = 'Win!';
    }

    setResult(newResult);
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

  const decide = () => {
    // 17以上になるまで取る
    while (hisPoint < 17) {
      pick(hisCards, setHisCards);
    }

    judge();
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

  useEffect(reset, []);

  return (
    <div>
      <button type="button" onClick={() => pick(myCards, setMyCards)} disabled={result}>
        Pick
      </button>
      <button type="button" onClick={decide} disabled={result}>
        Decide
      </button>
      <button type="button" onClick={reset} disabled={!result}>
        Reset
      </button>
      <Score name="me" point={myPoint} cards={myCards} />
      <Score name="he" point={hisPoint} cards={hisCards} hidden={!result} />
      <p className="result">{result}</p>
    </div>
  );
};

export default HooksComp;
