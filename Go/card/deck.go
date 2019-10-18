package card

import (
	"math"
	"math/rand"
	"time"
)

var deck [52]Card

func init() {
	rand.Seed(time.Now().UnixNano())
	i := 0

	for _, mark := range [4]string{"S", "H", "D", "C"} {
		for n := 1; n <= 13; n++ {
			deck[i] = Card{
				done:  false,
				mark:  mark,
				num:   byte(n),
				Value: byte(math.Min(float64(n), 10)),
			}
			i++
		}
	}
}

func Pick() (card *Card) {
	for card == nil || card.done {
		rnd := rand.Intn(52)
		card = &deck[rnd]
	}

	card.done = true
	return card
}
