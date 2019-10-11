package player

import (
	"fmt"

	card "../card"
)

type Player struct {
	cards []*card.Card
	Name  string
	Score byte
}

func (p *Player) AddCard(card *card.Card) {
	p.Score += card.Value
	p.cards = append(p.cards, card)
}

func (p *Player) Display(mask bool) {
	if mask {
		fmt.Printf("%s %d? %s [**]\n", p.Name, p.cards[0].Value, p.cards[0])
	} else {
		cardStr := ""

		for _, card := range p.cards {
			cardStr += fmt.Sprintf("%s ", card)
		}

		fmt.Printf("%s %d %s\n", p.Name, p.Score, cardStr)
	}
}
