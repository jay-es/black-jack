<script>
	import CardDeck from "../../Vuejs+OOP/CardDeck";
	import Score from "./Score.svelte";

	const [STR_WIN, STR_LOSE, STR_DRAW] = ['Win', 'Lose', 'Draw'];
	const cardDeck = new CardDeck()
	let myCards = []
	let hisCards = []
	let resultStr = ''

	const reset = () => {
		// カード初期化
		cardDeck.init();

		// 2枚ずつ引く
		myCards = [cardDeck.pick(), cardDeck.pick()]
		hisCards = [cardDeck.pick(), cardDeck.pick()]

		resultStr = '';
	}

	// 点数計算
	const getPoint = arr => arr.reduce((acc, { val }) => acc + val, 0);

	// 1枚引いて自分の手札に入れる
	const getCard = () => {
		myCards = [...myCards, cardDeck.pick()]

		// 21点を超えたらバースト
		if (getPoint(myCards) > 21) {
			resultStr = STR_LOSE;
		}
	}

	const decide = () => {
		// 17以上になるまで取る
		while (getPoint(hisCards) < 17) {
			hisCards = [...hisCards, cardDeck.pick()]
		}

		resultStr = judge(getPoint(myCards), getPoint(hisCards));
	}

	const judge = (mine, his) => {
		if (mine > his || his > 21) {
		return STR_WIN;
		} else if (mine < his) {
		return STR_LOSE;
		} else {
		return STR_DRAW;
		}
	}

	$: myPoint = getPoint(myCards)
	$: hisPoint = getPoint(hisCards)
	$: {
		reset()
	}
</script>

<main>
	<button on:click={getCard} disabled={!!resultStr}>Pick</button>
	<button on:click={decide} disabled={!!resultStr}>Decide</button>
	<button on:click={reset}>Reset</button>
	<br>

	<Score name="Mine" point={myPoint} cards={myCards} hidden={false} />
	<Score name="His" point={hisPoint} cards={hisCards} hidden={!resultStr} />
	<br>

	{#if resultStr}
		<div>
			<strong>{ resultStr }.</strong>
		</div>
	{/if}
</main>

<!-- <style>
	main {
		text-align: center;
		padding: 1em;
		/* max-width: 240px; */
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->
