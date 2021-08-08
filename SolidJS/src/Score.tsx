import { Component, Show } from "solid-js";
import { Card } from "./CardDeck";

type Props = {
  name: string;
  hidden: boolean;
  cards: Card[];
  point: number;
};

export const Score: Component<Props> = (props) => {
  // オブジェクトから切り離すとリアクティビティが失われる
  // const point = props.point;

  // 関数なら追跡される
  const point = () => props.point;

  return (
    <span>
      {props.name}:
      <Show
        when={props.hidden}
        fallback={
          <>
            {point} [{props.cards.map((v) => v.mark + v.num).join()}]
          </>
        }
      >
        ** [{props.cards[0] && props.cards[0].mark + props.cards[0].num}, **]
      </Show>
      {/* <Switch>
        <Match when={props.hidden}>
          ** [{props.cards[0] && props.cards[0].mark + props.cards[0].num}, **]
        </Match>
        <Match when>
          {point} [{props.cards.map((v) => v.mark + v.num).join()}]
        </Match>
      </Switch> */}
    </span>
  );
};
