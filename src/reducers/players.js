const initialState = [];

const players = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PLAYERS":
      return action.players;
    case "CLEAR_PLAYERS_STATE":
      return initialState;
    default:
      return state;
  }
};

export default players;
