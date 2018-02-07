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
import { getStatusMessage, isValidMove } from "./utils";
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
            <Line message={this.props.message} />
          </div>
          <div className="grid">
            {this.props.cells.map((value, cell) => (
              <Cell
                key={cell}
                state={value}
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
