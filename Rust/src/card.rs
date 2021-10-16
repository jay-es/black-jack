use rand::{thread_rng, Rng};

#[derive(Debug)]
pub struct Card {
    mark: char,
    num: u8,
}

impl Card {
    pub fn disp(&self) -> String {
        format!("{}{}", self.mark, self.num)
    }

    pub fn val(&self) -> u8 {
        self.num.min(10)
    }
}

pub struct Deck {
    cards: Vec<Card>,
}

impl Deck {
    /** デッキ作成 */
    pub fn init() -> Self {
        let marks = ['C', 'D', 'H', 'S'];
        let mut cards: Vec<Card> = Vec::new();

        for i in 0..52 {
            let num = (i % 13 + 1) as u8;
            let card = Card {
                mark: marks[i % 4],
                num,
            };
            cards.push(card);
        }

        Self { cards }
    }

    /** デッキから1枚ひく */
    pub fn pick(&mut self) -> Card {
        let index = thread_rng().gen_range(0..self.cards.len());
        self.cards.remove(index)
    }
}
