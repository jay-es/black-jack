use rand::{thread_rng, Rng};

#[derive(Debug)]
struct Card {
    mark: char,
    num: u8,
    val: u8,
}

type Deck = Vec<Card>;

fn make_deck() -> Deck {
    let marks = ['C', 'D', 'H', 'S'];
    let mut cards: Deck = Vec::new();

    for i in 0..52 {
        let num = (i % 13 + 1) as u8;

        let card = Card {
            mark: marks[i % 4],
            num,
            val: num.min(10),
        };
        cards.push(card);
    }

    cards
}

fn pick_card(deck: &mut Deck) -> Card {
    let index = thread_rng().gen_range(0..deck.len());
    deck.remove(index)
}

fn main() {
    let mut deck = make_deck();
    println!("{:?}", pick_card(&mut deck));
    println!("{:?}", pick_card(&mut deck));
    println!("input: {}", deck.len());
}
