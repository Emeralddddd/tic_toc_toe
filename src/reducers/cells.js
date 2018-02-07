const initialState = [
  undefined, undefined, undefined,
  undefined, undefined, undefined,
  undefined, undefined, undefined
];

const cells = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MOVE":
      return state.map((item, cell) => {
        return cell === action.cell ? action.player : item;
      });
    case "RESET":
      return initialState;
    case "CLEAR_PLAYERS_STATE":
      return initialState;  
    default:
      return state;
  }
};

export default cells;
