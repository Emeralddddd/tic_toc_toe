import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Jumbotron, Container } from "reactstrap";
import Cell from "./components/Cell";
import Button from "./components/Button";
import Line from "./components/Line";
import Modal from "./components/Modal";
import { addMove, resetGame, savePlayers, clearPlayersState } from "./actions";
import { getStatusMessage, isValidMove, getWinner } from "./utils";
import players from "./reducers/players";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
  }

  render() {
    const game = this;
    const winCells = getWinner(game.props.cells);
    return (
      <div>
        <Modal
          modal={this.state.modal}
          onSubmit={players => {
            this.setState({
              modal: false
            });
            game.props.onSubmitPlayersName(players);
          }}
        />
        <Jumbotron className="liner-Gradient">
          <div>
            <h1 className="display-4">Tic Toc Toe</h1>
            <Line message={game.props.message} />
          </div>
          <div className="grid">
            {game.props.cells.map((value, cell) => (
              <Cell
                key={cell}
                state={value}
                winner={winCells.winner && winCells.winningState.includes(cell)}
                onPress={evt => {
                  game.props.onSetCell(cell, this.props.cells, this.props.move);
                }}
              />
            ))}
          </div>
          <div className="panel">
            <Button
              lable="Reset"
              onPress={evt => {
                game.props.onReset();
              }}
            />
          </div>
          <div className="line">
            <Button
              className="button"
              lable="New Players"
              onPress={() => {
                this.setState({
                  modal: true
                });
                game.props.onClearPlayersState();
              }}
            />
          </div>
          <div>
            <a href="https://github.com/joypatel04/tic_toc_toe"><img style={{position: "absolute", top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" /></a>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    move: state["move"],
    cells: state["cells"],
    players: state["players"],
    message: getStatusMessage(state["cells"], state["move"], state["players"])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCell: (cell, cells, move) => {
      if (isValidMove(cells, cell)) dispatch(addMove(cell, move));
    },
    onReset: () => {
      dispatch(resetGame());
    },
    onSubmitPlayersName: players => {
      return dispatch(savePlayers(players));
    },
    onClearPlayersState:() => {
      return dispatch(clearPlayersState())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
