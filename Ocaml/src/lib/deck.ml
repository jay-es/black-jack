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
