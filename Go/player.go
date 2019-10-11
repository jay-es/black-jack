package main

import "fmt"

type player struct {
	cards []*card
	name  string
	score byte
}

func (p *player) addCard(card *card) {
	p.score += card.value
	p.cards = append(p.cards, card)
}

func (p *player) display(mask bool) {
	if mask {
		fmt.Printf("%s %d? %s [**]\n", p.name, p.cards[0].value, p.cards[0].format())
	} else {
		cardStr := ""

		for _, card := range p.cards {
			cardStr += card.format() + " "
		}

		fmt.Printf("%s %d %s\n", p.name, p.score, cardStr)
	}
}
