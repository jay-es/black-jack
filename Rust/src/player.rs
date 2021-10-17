use crate::card::Card;

#[derive(Debug)]
pub struct Player {
    point: u8,
    cards: Vec<Card>,
}

impl Player {
    pub fn init(card1: Card, card2: Card) -> Self {
        Self {
            point: card1.val() + card2.val(),
            cards: vec![card1, card2],
        }
    }

    pub fn point(&self) -> u8 {
        self.point
    }

    /** 手札追加 */
    pub fn add(&mut self, card: Card) {
        self.point += card.val();
        self.cards.push(card);
    }

    /** カードを表示用の文字列に */
    fn join_cards(&self) -> String {
        self.cards
            .iter()
            .map(|x| x.disp())
            .collect::<Vec<String>>()
            .join(" ")
    }

    /** 手札を表示 */
    pub fn show(&self, hidden: bool) -> String {
        if hidden {
            format!("** [{} **]", self.cards[0].disp())
        } else {
            format!("{} [{}]", self.point, self.join_cards())
        }
    }
}
