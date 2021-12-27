type card

val pick : card list -> card list -> card list * card list
(** 1枚引く *)

val init : unit -> card list * card list * card list
(** デッキ、手札の作成 *)

val string_of_card : card -> string
(** カード表示 *)

val sum_cards : card list -> int
(** カード点数合計 *)

val is_busted : card list -> bool
(** バーストしてるか *)

val judge_str : card list -> card list -> string
(** 勝敗判定  *)
