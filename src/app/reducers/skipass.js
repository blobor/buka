const initialState = {
  cardNumber: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CARD_NUMBER_CHANGE':
      return {
        ...state,
        cardNumber: action.cardNumber
      };
    default:
      return state;
  }
}
