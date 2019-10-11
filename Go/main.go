package main

import (
	"fmt"

	"./card"
	"./player"
)

func main() {
	var cardDeck card.Deck
	me := player.Player{Name: "Player"}
	he := player.Player{Name: "Dealer"}

	cardDeck.Init()
	me.AddCard(cardDeck.Pick())
	me.AddCard(cardDeck.Pick())
	he.AddCard(cardDeck.Pick())
	he.AddCard(cardDeck.Pick())
	he.Display(true)

	for key := ""; key != "n"; {
		me.Display(false)

		fmt.Println("more? y/n")
		fmt.Scan(&key)
		fmt.Println()

		if key == "y" {
			me.AddCard(cardDeck.Pick())

			if me.Score > 21 {
				me.Display(false)
				fmt.Println("LOSE!")
				return
			}
		}
	}

	for he.Score < 17 {
		he.AddCard(cardDeck.Pick())
	}

	me.Display(false)
	he.Display(false)

	if he.Score > 21 || me.Score > he.Score {
		fmt.Println("WIN!")
	} else if he.Score > me.Score {
		fmt.Println("LOSE!")
	} else {
		fmt.Println("DRAW!")
	}
}
