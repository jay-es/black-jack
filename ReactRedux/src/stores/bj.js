// Action Types
const ADD_HIS = 'bj/SET_HIS';
const ADD_MINE = 'bj/SET_MINE';
const RESET_GAME = 'bj/INIT';
const SET_RESULT = 'bj/SET_RESULT';

const getInitialState = () => ({
  deck: Array.from(Array(52).keys()).map(v => {
    const num = (v % 13) + 1;
    const sym = ['C', 'D', 'H', 'S'][Math.floor(v / 13)];
    return { num, sym, val: Math.min(num, 10) };
  }),
  hisCards: [],
  hisPoint: 0,
  myCards: [],
  myPoint: 0,
  result: '',
});

// Reducer
export default function bjReducer(state = getInitialState(), action) {
  const { deck, hisCards, myCards } = state;
  let card;

  switch (action.type) {
    case ADD_HIS:
      [card] = deck.splice(Math.random() * deck.length, 1);
      hisCards.push(card);

      return {
        ...state,
        deck,
        hisCards,
        hisPoint: hisCards.reduce((acc, { val }) => acc + val, 0),
      };
    case ADD_MINE:
      [card] = deck.splice(Math.random() * deck.length, 1);
      myCards.push(card);

      return {
        ...state,
        deck,
        myCards,
        myPoint: myCards.reduce((acc, { val }) => acc + val, 0),
      };
    case RESET_GAME:
      return getInitialState();
    case SET_RESULT:
      return {
        ...state,
        result: action.val,
      };
    default:
      return state;
  }
}

// Action Creaters
export const addHisCard = () => ({ type: ADD_HIS });
export const addMyCard = () => ({ type: ADD_MINE });
export const resetGame = () => ({ type: RESET_GAME });
export const setResult = val => ({ type: SET_RESULT, val });
