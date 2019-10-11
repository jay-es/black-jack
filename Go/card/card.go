package card

import (
	"fmt"
)

type Card struct {
	done  bool
	mark  string
	num   byte
	Value byte
}

func (card *Card) String() string {
	return fmt.Sprintf("[%s%d]", card.mark, card.num)
}
