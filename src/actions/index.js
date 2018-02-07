export const savePlayers = players => {
  return {
    type: "SAVE_PLAYERS",
    list: players
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

export const gameFinished = (whoWon, players, wonCount) => {
  const playerIndex = players.indexOf(whoWon);
  let newWon = [];
  let newLose = [];
  if (playerIndex === 0) {
    let w = wonCount[0] + 1;
    newWon = [w, wonCount[1]];
  } else {
    let w = wonCount[1] + 1;
    newWon = [wonCount[0], w];
  }
  return {
    type: "GAME_FINISHED",
    won: newWon
  };
};
