use rand::{thread_rng, Rng};
use std::io;

#[derive(Debug)]
struct Card {
    mark: char,
    num: u8,
}

impl Card {
    fn disp(&self) -> String {
        format!("{}{}", self.mark, self.num)
    }

    fn val(&self) -> u8 {
        self.num.min(10)
    }
}

struct Deck {
    cards: Vec<Card>,
}

impl Deck {
    /** デッキ作成 */
    fn init() -> Deck {
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

        Deck { cards }
    }

    /** デッキから1枚ひく */
    fn pick(&mut self) -> Card {
        let index = thread_rng().gen_range(0..self.cards.len());
        self.cards.remove(index)
    }
}

#[derive(Debug)]
struct Player {
    point: u8,
    cards: Vec<Card>,
}

impl Player {
    fn init(card1: Card, card2: Card) -> Player {
        Player {
            point: card1.val() + card2.val(),
            cards: vec![card1, card2],
        }
    }

    /** 手札追加 */
    fn add(&mut self, card: Card) {
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
}

/** 勝敗判定 */
fn judge(my_points: u8, his_points: u8) -> &'static str {
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
fn show_table(me: &Player, him: &Player, done: bool) {
    print!("Mine: {} [{}]", me.point, me.join_cards());

    print!("  His: ");
    if done {
        println!("{} [{}]", him.point, him.join_cards());
        println!("{}", judge(me.point, him.point));
    } else {
        println!("** [{} **]", him.cards[0].disp());
    }
}

fn main() {
    let mut deck = Deck::init();
    let mut me = Player::init(deck.pick(), deck.pick());
    let mut him = Player::init(deck.pick(), deck.pick());

    let lost = loop {
        show_table(&me, &him, false);
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

        me.add(deck.pick());

        // 21 点超えたらプレイヤーの負け
        if me.point > 21 {
            break true;
        }
    };

    // プレイヤーがバーストしていなければディーラーのターン
    if !lost {
        loop {
            // 17点以上なら抜ける
            if him.point >= 17 {
                break;
            }

            him.add(deck.pick());
        }
    }

    show_table(&me, &him, true);
}
