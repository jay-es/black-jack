use rand::{thread_rng, Rng};

#[derive(Clone, Copy, Debug)]
struct Card {
    mark: char,
    num: u8,
    val: u8,
}

impl Card {
    fn disp(self) -> String {
        format!("{}{}", self.mark, self.num)
    }
}

type Deck = Vec<Card>;

/** デッキ作成 */
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

/** デッキから1枚ひく */
fn pick_card(deck: &mut Deck) -> Card {
    let index = thread_rng().gen_range(0..deck.len());
    deck.remove(index)
}

/** カードの合計点数を計算 */
fn get_point(cards: &[Card]) -> u8 {
    cards.iter().map(|x| x.val).sum::<u8>()
}

/** カードを表示用の文字列に */
fn join_cards(cards: &[Card]) -> String {
    cards
        .iter()
        .map(|x| x.disp())
        .collect::<Vec<String>>()
        .join(" ")
}

/** 場を表示 */
fn show_table(my_cards: &[Card], his_cards: &[Card], done: bool) {
    print!("Mine: {} [{}]", get_point(my_cards), join_cards(my_cards));

    print!("  His: ");
    if done {
        print!("{} [{}]", get_point(his_cards), join_cards(his_cards));
    } else {
        print!("** [{} **]", his_cards[0].disp());
    }

    println!();
}

fn main() {
    let mut deck = make_deck();
    let mut my_cards = vec![pick_card(&mut deck), pick_card(&mut deck)];
    let mut his_cards = vec![pick_card(&mut deck), pick_card(&mut deck)];

    show_table(&my_cards, &his_cards, false);
    show_table(&my_cards, &his_cards, true);
}
