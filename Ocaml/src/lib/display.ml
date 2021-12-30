let build_text hidden name cards =
  let rec loop cards =
    match cards with
    | [] -> ""
    | first :: rest ->
        Deck.string_of_card first
        (* まだ残りがあるならカンマを表示 *)
        ^ (if List.length rest > 0 then ", " else "")
        (* 最初だけ表示の場合は ** を出して終了。そうでなければ再帰 *)
        ^ if hidden then "**" else loop rest
  in
  name ^ ": "
  ^ (if hidden then "**" else string_of_int (Deck.sum_cards cards))
  ^ " [" ^ loop cards ^ "]"

(* 二人分の全カード表示 *)
let result my_cards his_cards =
  build_text false "Me" my_cards ^ "\n" ^ build_text false "He" his_cards

(* 相手は最初の1枚だけ表示 *)
let process my_cards his_cards =
  build_text false "Me" my_cards ^ "\n" ^ build_text true "He" his_cards
