import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import React from "react";
import { connect } from "react-redux";
import { Jumbotron, Alert } from "reactstrap";
import Cell from "./components/Cell";
import Button from "./components/Button";
import Line from "./components/Line";
import Modal from "./components/Modal";
import GameStats from "./components/GameStats";
import Text from './components/Text'
import {
  addMove,
  resetGame,
  savePlayers,
  clearPlayersState,
  gameFinished
} from "./actions";
import { getStatusMessage, isValidMove, getWinner, whoWon } from "./utils";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modal2: false,
      visible: false
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    var mapIdtoText = new Map([[0,'公司'],[1,'艺术'],[2,'体育'],[3,'新闻'],[4,'建筑'],[5,'自然'],[6,'动物'],[7,'植物'],[8,'文学']])
    const game = this;
    const {
      cells,
      move,
      message,
      whoWon,
      players,
      wonCount,
      totalCount,
      gameFinished,
      onSubmitPlayersName,
      onSetCell,
      onReset,
      onHardReset,
      onClearPlayersState
    } = game.props;
    const winCells = getWinner(game.props.cells);
    return (
      <div>
        <Modal
          modal={this.state.modal}
          onSubmit={players => {
            this.setState({
              modal: false
            });
            onSubmitPlayersName(players);
          }}
        />
        <Jumbotron className="liner-Gradient">
          <div>
            <h1 className="display-4">Tic Toc Toe</h1>
            <Line message={message} />
          </div>
          <div id="body">
            <div className="grid-box">
              <div className="grid">
                {cells.map((value, cell) => (
                  <Cell
                    key={cell}
                    display={mapIdtoText.get(cell)}
                    state={value}
                    winner={winCells.winner && winCells.winningState.includes(cell)}
                    onPress={evt => {
                      onSetCell(cell, cells, move);
                    }}
                  />
                ))}·
          </div>
            </div>
            <Text
              mapIdtoText = {mapIdtoText}
              onPress={(cell) => {
                onSetCell(cell, cells, move);
              }}
            />
          </div>
          <div className="panel">
            <Button
              disabled={gameFinished}
              lable="Save/Reset"
              onPress={evt => {
                whoWon
                  ? onReset(whoWon, players, wonCount)
                  : this.setState({
                    visible: true
                  });
              }}
            />
          </div>
          <Alert
            className={"line"}
            color="info"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
          >
            <p>
              Please finish this game to save results. You can only save results
              once game is finished. To hard reset press below button.
            </p>
            <Button
              className="button"
              lable="Hard Reset"
              onPress={() => {
                this.setState({
                  visible: false
                });
                onHardReset();
              }}
            />
          </Alert>
          <div className="line">
            <Button
              className="button"
              lable="New Players"
              onPress={() => {
                this.setState({
                  modal: true
                });
                onClearPlayersState();
              }}
            />
          </div>
          <div>
            <a href="https://github.com/joypatel04/tic_toc_toe">
              <img
                style={{ position: "absolute", top: 0, right: 0, border: 0 }}
                src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
                alt="Fork me on GitHub"
                data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
              />
            </a>
          </div>
          {gameFinished && (
            <GameStats
              modal={this.state.modal2}
              players={players}
              winCount={wonCount}
              totalCount={totalCount}
              onClick={() => {
                this.setState({
                  modal2: !this.state.modal2
                });
              }}
            />
          )}
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    move: state.move,
    cells: state.cells,
    players: state.players.list,
    message: getStatusMessage(state.cells, state.move, state.players.list),
    whoWon: whoWon(state.cells, state.players.list),
    wonCount: state.players.won,
    gameFinished: state.players.gameFinished
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onSetCell: (cell, cells, move) => {
      if (isValidMove(cells, cell)) dispatch(addMove(cell, move));
    },
    onReset: (whoWon, players, wonCount) => {
      dispatch(resetGame());
      dispatch(gameFinished(whoWon, players, wonCount));
    },
    onHardReset: () => {
      dispatch(resetGame());
    },
    onSubmitPlayersName: players => {
      return dispatch(savePlayers(players));
    },
    onClearPlayersState: () => {
      return dispatch(clearPlayersState());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
