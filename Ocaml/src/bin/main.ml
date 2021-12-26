open Mylib

let () =
  let _deck, my_cards, his_cards = Deck.init () in
  Display.process my_cards his_cards
