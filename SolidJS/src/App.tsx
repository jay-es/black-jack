import { Component, createMemo, createSignal, onMount, Show } from "solid-js";
import CardDeck, { Card } from "./CardDeck";
import styles from "./App.module.css";
import { Score } from "./Score";

const [STR_WIN, STR_LOSE, STR_DRAW] = ["Win", "Lose", "Draw"];

// 点数計算
const getPoint = (arr: Card[]) => arr.reduce((acc, { val }) => acc + val, 0);

const judge = (mine: number, his: number) => {
  if (mine > his || his > 21) {
    return STR_WIN;
  } else if (mine < his) {
    return STR_LOSE;
  } else {
    return STR_DRAW;
  }
};

const App: Component = () => {
  const cardDeck = new CardDeck();
  const [myCards, setMyCards] = createSignal<Card[]>([]);
  const [hisCards, setHisCards] = createSignal<Card[]>([]);
  const [resultStr, setResultStr] = createSignal("");

  const myPoint = createMemo(() => getPoint(myCards()));
  const hisPoint = createMemo(() => getPoint(hisCards()));

  const reset = () => {
    // カード初期化
    cardDeck.init();

    // 2枚ずつ引く
    setMyCards([cardDeck.pick(), cardDeck.pick()]);
    setHisCards([cardDeck.pick(), cardDeck.pick()]);

    setResultStr("");
  };

  // 1枚引いて自分の手札に入れる
  const getCard = () => {
    setMyCards((v) => [...v, cardDeck.pick()]);

    // 21点を超えたらバースト
    if (myPoint() > 21) {
      setResultStr(STR_LOSE);
    }
  };

  const decide = () => {
    // 17以上になるまで取る
    while (hisPoint() < 17) {
      setHisCards((v) => [...v, cardDeck.pick()]);
    }

    setResultStr(judge(myPoint(), hisPoint()));
  };

  onMount(reset);

  return (
    <>
      <button onClick={() => getCard()} disabled={!!resultStr()}>
        Pick
      </button>
      <button onClick={() => decide()} disabled={!!resultStr()}>
        Decide
      </button>
      <button onClick={() => reset()}>Reset</button>
      <br />

      <Score name="Mine" point={myPoint()} cards={myCards()} hidden={false} />
      <Score
        name="His"
        point={hisPoint()}
        cards={hisCards()}
        hidden={!resultStr()}
      />
      <br />

      <Show when={resultStr()}>
        <div>
          <strong>{resultStr}.</strong>
        </div>
      </Show>
    </>
  );
};

export default App;
