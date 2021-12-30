open Mylib

(* プレイヤーのカードを引く *)
let rec my_turn deck my_cards his_cards =
  print_endline (Display.process my_cards his_cards ^ "\npick? Y/n");
  let input = String.lowercase_ascii (read_line ()) in
  (* n なら終了 *)
  if input = "n" then (deck, my_cards, his_cards)
  else
    let deck, my_cards = Deck.pick deck my_cards in
    (* バーストしてたら終了 *)
    if Deck.is_busted my_cards then (deck, my_cards, his_cards)
    else my_turn deck my_cards his_cards

(* ディーラーがカードを引く *)
let rec his_turn deck his_cards =
  (* 17 以上なら終了 *)
  if Deck.sum_cards his_cards >= 17 then (deck, his_cards)
  else
    let deck, his_cards = Deck.pick deck his_cards in
    his_turn deck his_cards

(* メイン *)
let () =
  let deck, my_cards, his_cards = Deck.init () in
  let deck, my_cards, his_cards = my_turn deck my_cards his_cards in
  let _, his_cards =
    if Deck.is_busted my_cards then (deck, his_cards)
    else his_turn deck his_cards
  in
  print_endline
    (Deck.judge my_cards his_cards ^ "\n" ^ Display.result my_cards his_cards)
