import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHisCard, addMyCard, resetGame, setResult } from '../stores/bj';
import Score from './Score';

const ReduxHooks = () => {
  const dispatch = useDispatch();
  const { hisCards, hisPoint, myCards, myPoint, result } = useSelector(v => v);
  const [decided, setDecided] = useState(false);

  const judge = () => {
    let newResult = 'Draw!';

    if (myPoint > 21 || (hisPoint <= 21 && myPoint < hisPoint)) {
      newResult = 'Lose!';
    } else if (hisPoint > 21 || myPoint > hisPoint) {
      newResult = 'Win!';
    }

    dispatch(setResult(newResult));
  };

  // 1枚ランダムに取得
  const pick = () => {
    dispatch(addMyCard());
  };

  // 21点を超えたらバースト
  useEffect(() => {
    if (myPoint > 21) judge();
  }, [myPoint]);

  const decide = () => {
    setDecided(true);

    // 17以上になるまで取る
    if (hisPoint < 17) {
      dispatch(addHisCard());
    } else {
      judge();
    }
  };

  // もう一枚カードを引く
  useEffect(() => {
    if (decided) decide();
  }, [hisCards.length]);

  const reset = () => {
    setDecided(false);
    dispatch(resetGame());

    // 2枚ずつ引く
    dispatch(addMyCard());
    dispatch(addMyCard());
    dispatch(addHisCard());
    dispatch(addHisCard());
  };

  // ClassContainerと重複している
  // useEffect(reset, []);

  return (
    <div>
      <button type="button" onClick={pick} disabled={result}>
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

export default ReduxHooks;
