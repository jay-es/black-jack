mod card;
mod player;

use crate::card::Deck;
use crate::player::Player;
use std::io;

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
    println!("Mine: {}  His: {}", me.show(false), him.show(!done));

    if done {
        println!("{}", judge(me.point(), him.point()));
    }
}

fn main() {
    let mut deck = Deck::new();
    let mut me = Player::new(deck.pick(), deck.pick());
    let mut him = Player::new(deck.pick(), deck.pick());

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
        if me.point() > 21 {
            break true;
        }
    };

    // プレイヤーがバーストしていなければディーラーのターン
    if !lost {
        loop {
            // 17点以上なら抜ける
            if him.point() >= 17 {
                break;
            }

            him.add(deck.pick());
        }
    }

    show_table(&me, &him, true);
}
