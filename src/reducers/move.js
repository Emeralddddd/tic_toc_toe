const initialState = "O";

const move = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVE":
      return state === "O" ? "X" : "O";
    case "RESET":
      return initialState;
    case "CLEAR_PLAYERS_STATE":
      return initialState;  
    default:
      return state;
  }
};

export default move;
