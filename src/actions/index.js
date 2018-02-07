export const savePlayers = players => {
  return {
    type: "SAVE_PLAYERS",
    players: players
  };
};

export const clearPlayersState = () => {
  return {
    type: "CLEAR_PLAYERS_STATE"
  };
};

export const addMove = (cell, player) => {
  return {
    type: "ADD_MOVE",
    cell: cell,
    player: player
  };
};

export const resetGame = () => {
  return {
    type: "RESET"
  };
};
