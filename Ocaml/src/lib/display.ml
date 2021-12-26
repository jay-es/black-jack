let print hidden name cards =
  let rec loop cards =
    match cards with
    | [] -> ()
    | first :: rest ->
        print_string (Deck.string_of_card first);
        (* まだ残りがあるならカンマを表示 *)
        if List.length rest > 0 then print_string ", ";
        (* 最初だけ表示の場合は ** を出して終了。そうでなければ再帰 *)
        if hidden then print_string "**" else loop rest
  in
  print_string (name ^ ": ");
  if hidden then print_string "**" else print_int (Deck.sum_cards cards);
  print_string " [";
  loop cards;
  print_endline "]"

(* 二人分の全カード表示 *)
let result my_cards his_cards =
  print false "Me" my_cards;
  print false "He" his_cards

(* 相手は最初の1枚だけ表示 *)
let process my_cards his_cards =
  print false "Me" my_cards;
  print true "He" his_cards
