type card = { suit : string; number : int; value : int }

(* int -> string *)
let suit_of_int n =
  match n mod 4 with 0 -> "C" | 1 -> "D" | 2 -> "H" | _ -> "S"

(* カード作成 *)
(* int -> card *)
let make_card n =
  let number = (n mod 13) + 1 in
  { suit = suit_of_int n; number; value = min number 10 }

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

(* カード点数合計 *)
(* card list -> int *)
let rec sum_cards cards =
  match cards with [] -> 0 | { value; _ } :: rest -> value + sum_cards rest
