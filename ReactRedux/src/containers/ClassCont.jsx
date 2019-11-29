import React from 'react';
import { connect } from 'react-redux';
import Score from '../components/Score';
import { addHisCard, addMyCard, resetGame, setResult } from '../stores/bj';

class ClassContainer extends React.Component {
  componentDidMount() {
    this.reset();
  }

  decide() {
    // 17以上になるまで取る
    if (this.props.bj.hisPoint >= 17) {
      this.judge();
      return;
    }

    this.props.addHisCard();
    setTimeout(() => {
      this.decide();
    });
  }

  judge() {
    const { myPoint, hisPoint } = this.props.bj;
    let result = 'Draw!';

    if (myPoint > 21 || (hisPoint <= 21 && myPoint < hisPoint)) {
      result = 'Lose!';
    } else if (hisPoint > 21 || myPoint > hisPoint) {
      result = 'Win!';
    }

    this.props.setResult(result);
  }

  // 1枚ランダムに取得
  pick() {
    this.props.addMyCard();

    setTimeout(() => {
      // 21点を超えたらバースト
      if (this.props.bj.myPoint > 21) {
        this.judge();
      }
    });
  }

  reset() {
    this.props.resetGame();

    // 2枚ずつ引く
    setTimeout(() => {
      this.props.addMyCard();
      this.props.addMyCard();
      this.props.addHisCard();
      this.props.addHisCard();
    });
  }

  render() {
    const { hisCards, hisPoint, myCards, myPoint, result } = this.props.bj;

    return (
      <div>
        <button type="button" onClick={() => this.pick()} disabled={result}>
          Pick
        </button>
        <button type="button" onClick={() => this.decide()} disabled={result}>
          Decide
        </button>
        <button type="button" onClick={() => this.reset()} disabled={!result}>
          Reset
        </button>
        <Score name="me" point={myPoint} cards={myCards} />
        <Score name="he" point={hisPoint} cards={hisCards} hidden={!result} />
        <p className="result">{result}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { bj: state };
};

const mapDispatchToProps = dispatch => ({
  addHisCard: () => dispatch(addHisCard()),
  addMyCard: () => dispatch(addMyCard()),
  resetGame: () => dispatch(resetGame()),
  setResult: v => dispatch(setResult(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassContainer);
