package main

import (
	"fmt"

	"./card"
	"./player"
)

func main() {
	me := player.Player{Name: "Player"}
	he := player.Player{Name: "Dealer"}

	me.AddCard(card.Pick())
	me.AddCard(card.Pick())
	he.AddCard(card.Pick())
	he.AddCard(card.Pick())
	he.Display(true)

	for key := ""; key != "n"; {
		me.Display(false)

		fmt.Println("more? y/n")
		fmt.Scan(&key)
		fmt.Println()

		if key == "y" {
			me.AddCard(card.Pick())

			if me.Score > 21 {
				me.Display(false)
				fmt.Println("LOSE!")
				return
			}
		}
	}

	for he.Score < 17 {
		he.AddCard(card.Pick())
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
