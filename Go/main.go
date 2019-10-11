package main

import "fmt"

func main() {
	var cardDeck cardDeck
	me := player{name: "Player"}
	he := player{name: "Dealer"}

	cardDeck.init()
	me.addCard(cardDeck.pick())
	me.addCard(cardDeck.pick())
	he.addCard(cardDeck.pick())
	he.addCard(cardDeck.pick())
	he.display(true)

	for key := ""; key != "n"; {
		me.display(false)

		fmt.Println("more? y/n")
		fmt.Scan(&key)
		fmt.Println()

		if key == "y" {
			me.addCard(cardDeck.pick())

			if me.score > 21 {
				me.display(false)
				fmt.Println("LOSE!")
				return
			}
		}
	}

	for he.score < 17 {
		he.addCard(cardDeck.pick())
	}

	me.display(false)
	he.display(false)

	if he.score > 21 || me.score > he.score {
		fmt.Println("WIN!")
	} else if he.score > me.score {
		fmt.Println("LOSE!")
	} else {
		fmt.Println("DRAW!")
	}
}
