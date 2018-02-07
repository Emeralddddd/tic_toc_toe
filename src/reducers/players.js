const initialState = {
  list: [],
  won: [0, 0],
  gameFinished: false
};

const players = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PLAYERS":
      return {
        ...state,
        list: action.list
      };
    case "GAME_FINISHED":
      return {
        ...state,
        won: action.won,
        gameFinished: true
      };
    case "CLEAR_PLAYERS_STATE":
      return initialState;
    default:
      return state;
  }
};

export default players;
