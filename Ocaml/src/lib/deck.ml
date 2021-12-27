type card = { suit : string; number : int; value : int }

(* int -> string *)
let suit_of_int n =
  match n mod 4 with 0 -> "C" | 1 -> "D" | 2 -> "H" | _ -> "S"

let%test _ = suit_of_int 0 = "C"

let%test _ = suit_of_int 5 = "D"

(* カード作成 *)
(* int -> card *)
let make_card n =
  let number = (n mod 13) + 1 in
  { suit = suit_of_int n; number; value = min number 10 }

let%test _ = make_card 0 = { suit = "C"; number = 1; value = 1 }

let%test _ = make_card 11 = { suit = "S"; number = 12; value = 10 }

(* Fisher-Yates shuffle *)
let shuffle arr =
  Random.self_init ();
  Array.iteri
    (fun i card ->
      let j = Random.int (Array.length arr - i) + i in
      arr.(i) <- arr.(j);
      arr.(j) <- card)
    arr;
  arr

(* デッキ作成 *)
(* unit -> card list *)
let make_deck () = Array.init 52 make_card |> shuffle |> Array.to_list

(* デッキから1枚引く *)
(* 'a list -> 'a list -> ('a list * 'a list) *)
let pick deck cards =
  match deck with
  | [] -> raise (Failure "もう引けない")
  | first :: rest -> (rest, cards @ [ first ])

let%test _ =
  let deck, cards = pick [ 0; 1; 2 ] [] in
  deck = [ 1; 2 ] && cards = [ 0 ]

let%test _ =
  let deck, cards = pick [ 1; 2 ] [ 0 ] in
  deck = [ 2 ] && cards = [ 0; 1 ]

(* デッキ、手札の作成 *)
(* unit -> card list * card list * card list *)
let init () =
  let deck = make_deck () in
  let deck, my_cards = pick deck [] in
  let deck, my_cards = pick deck my_cards in
  let deck, his_cards = pick deck [] in
  let deck, his_cards = pick deck his_cards in
  (deck, my_cards, his_cards)

let%test _ =
  let deck, my_cards, his_cards = init () in
  List.length deck = 48 && List.length my_cards = 2 && List.length his_cards = 2

(* カード表示 *)
(* card -> string *)
let string_of_card card =
  match card with { suit; number; _ } -> suit ^ string_of_int number

let%test _ = string_of_card { suit = "C"; number = 1; value = 1 } = "C1"

let%test _ = string_of_card { suit = "S"; number = 12; value = 10 } = "S12"

(* カード点数合計 *)
(* card list -> int *)
let rec sum_cards cards =
  match cards with [] -> 0 | { value; _ } :: rest -> value + sum_cards rest

let%test _ =
  sum_cards
    [
      { suit = "C"; number = 1; value = 1 };
      { suit = "S"; number = 12; value = 10 };
    ]
  = 11

(* バーストしてるか *)
(* card list -> bool *)
let is_busted cards = sum_cards cards > 21

let%test _ = is_busted [ { suit = ""; number = 0; value = 21 } ] = false

let%test _ = is_busted [ { suit = ""; number = 0; value = 22 } ] = true

(* 勝敗判定 *)
type state = Lose | Win | Draw

let judge my_cards his_cards =
  let my_score = sum_cards my_cards in
  let his_score = sum_cards his_cards in
  if is_busted my_cards then Lose
  else if is_busted his_cards || my_score > his_score then Win
  else if his_score > my_score then Lose
  else Draw

let%test _ =
  judge
    [ { suit = ""; number = 0; value = 22 } ]
    [ { suit = ""; number = 0; value = 21 } ]
  = Lose

let%test _ =
  judge
    [ { suit = ""; number = 0; value = 20 } ]
    [ { suit = ""; number = 0; value = 21 } ]
  = Lose

let%test _ =
  judge
    [ { suit = ""; number = 0; value = 21 } ]
    [ { suit = ""; number = 0; value = 22 } ]
  = Win

let%test _ =
  judge
    [ { suit = ""; number = 0; value = 21 } ]
    [ { suit = ""; number = 0; value = 20 } ]
  = Win

let%test _ =
  judge
    [ { suit = ""; number = 0; value = 21 } ]
    [ { suit = ""; number = 0; value = 21 } ]
  = Draw

let judge_str my_cards his_cards =
  match judge my_cards his_cards with
  | Win -> "You Won!"
  | Lose -> "You Lost!"
  | Draw -> "Draw!"
