package card

import (
	"math"
	"math/rand"
	"time"
)

type Deck struct {
	cards [52]Card
}

func (deck *Deck) Init() {
	rand.Seed(time.Now().UnixNano())
	i := 0

	for _, mark := range [4]string{"S", "H", "D", "C"} {
		for n := 1; n <= 13; n++ {
			deck.cards[i] = Card{
				done:  false,
				mark:  mark,
				num:   byte(n),
				Value: byte(math.Min(float64(n), 10)),
			}
			i++
		}
	}
}

func (deck *Deck) Pick() (card *Card) {
	for card == nil || card.done {
		rnd := rand.Intn(52)
		card = &deck.cards[rnd]
	}

	card.done = true
	return card
}
