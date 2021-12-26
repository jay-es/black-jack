type card

(** デッキ作成 *)
val make_deck: unit -> card list
(** カード表示 *)
val string_of_card: card -> string
(** カード点数合計 *)
val sum_cards: card list -> int

