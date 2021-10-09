use rand::{thread_rng, Rng};
use std::io;

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

/** 勝敗判定 */
fn judge<'a>(my_cards: &'a [Card], his_cards: &'a [Card]) -> &'a str {
    let my_points = get_point(my_cards);
    let his_points = get_point(his_cards);

    if my_points > 21 {
        "Lost"
    } else if his_points > 21 || my_points > his_points {
        "Won"
    } else if my_points < his_points {
        "Lost"
    } else {
        "Draw"
    }
}

/** 場を表示 */
fn show_table(my_cards: &[Card], his_cards: &[Card], done: bool) {
    print!("Mine: {} [{}]", get_point(my_cards), join_cards(my_cards));

    print!("  His: ");
    if done {
        println!("{} [{}]", get_point(his_cards), join_cards(his_cards));
        println!("{}", judge(my_cards, his_cards));
    } else {
        println!("** [{} **]", his_cards[0].disp());
    }
}

fn main() {
    let mut deck = make_deck();
    let mut my_cards = vec![pick_card(&mut deck), pick_card(&mut deck)];
    let mut his_cards = vec![pick_card(&mut deck), pick_card(&mut deck)];

    let lost = loop {
        show_table(&my_cards, &his_cards, false);
        println!("pick? Y/n");

        let mut input = String::new();
        io::stdin().read_line(&mut input).ok();
        let input = input.trim().to_lowercase();

        // n なら抜ける
        if input == "n" {
            break false;
        }
        // 空白と y 以外ならもう一度
        if !input.is_empty() && input != "y" {
            continue;
        }

        my_cards.push(pick_card(&mut deck));

        // 21 点超えたらプレイヤーの負け
        if get_point(&my_cards) > 21 {
            break true;
        }
    };

    // プレイヤーの負けが確定していなければディーラーのターン
    if !lost {
        loop {
            // 17点以上なら抜ける
            if get_point(&his_cards) >= 17 {
                break;
            }

            his_cards.push(pick_card(&mut deck));
        }
    }

    show_table(&my_cards, &his_cards, true);
}
