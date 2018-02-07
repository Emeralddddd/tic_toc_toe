import move from "../reducers/move";

export const getWinner = cells => {
  const winningStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  var winner = undefined;
  var winBlock = undefined;
  winningStates.forEach(winningState => {
    const potentialWinner = cells[winningState[0]];
    if (potentialWinner !== undefined) {
      var hasWonCurrentState = true;
      winningState.forEach(winningCell => {
        if (cells[winningCell] !== potentialWinner) hasWonCurrentState = false;
      });
      if (hasWonCurrentState) { 
        winBlock = winningState; 
        winner = potentialWinner;
      };
    }
  });

  return {
    winningState: winBlock,
    winner
  };
};

const isTie = cells => {
  // No tie when the game is won
  const winner = getWinner(cells);
  if ( winner.winner !== undefined) return false;

  var isTie = true;
  cells.forEach(cell => {
    if (cell === undefined) isTie = false;
  });

  return isTie;
};

export const isValidMove = (cells, cell) => {
  // Invalid move when the cell is not free
  if (cells[cell] !== undefined) return false;

  // Do not update when the game is over
  const w = getWinner(cells);
  if (w.winner !== undefined || isTie(cells)) return false;

  return true;
};

export const getStatusMessage = (cells, move, players) => {
  if (isTie(cells)) return "It is a tie!";

  const symbol = move === "O" ? 0 : 1;

  const w = getWinner(cells);
  if (w.winner !== undefined) {
    const sy = w.winner === "O" ? 0 : 1;
    return `${players[sy]} has won the game!`;
  } else if (players[symbol] === undefined) {
    return "";
  } else {
    return `${players[symbol]}'s turn`;
  }
};
