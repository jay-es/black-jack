package main

import (
	"fmt"
	"math"
	"math/rand"
	"time"
)

type card struct {
	done  bool
	mark  string
	num   byte
	value byte
}

func (c *card) format() string {
	return fmt.Sprintf("[%s%d]", c.mark, c.num)
}

type cardDeck struct {
	cards [52]card
}

func (cd *cardDeck) init() {
	rand.Seed(time.Now().UnixNano())
	i := 0

	for _, mark := range [4]string{"S", "H", "D", "C"} {
		for n := 1; n <= 13; n++ {
			cd.cards[i] = card{
				done:  false,
				mark:  mark,
				num:   byte(n),
				value: byte(math.Min(float64(n), 10)),
			}
			i++
		}
	}
}

func (cd *cardDeck) pick() (card *card) {
	for card == nil || card.done {
		rnd := rand.Intn(52)
		card = &cd.cards[rnd]
	}

	card.done = true
	return card
}
