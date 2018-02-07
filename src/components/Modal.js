import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class EnterNamesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      touched: {
        player1: false,
        player2: false
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal && !this.props.modal) {
      this.clearState();
    }
  }

  clearState() {
    this.setState({
      player1: "",
      player2: "",
      touched: {
        player1: false,
        player2: false
      }
    });
  }

  handleSubmit = () => {
    if (!this.canBeSubmitted()) {
      return;
    }
    const { player1, player2 } = this.state;
    this.props.onSubmit([player1, player2]);
  };

  validate(player1, player2) {
    return {
      player1: player1.length === 0,
      player2: player2.length === 0
    };
  }

  handlePlayer1Change = evt => {
    this.setState({ player1: evt.target.value });
  };

  handlePlayer2Change = evt => {
    this.setState({ player2: evt.target.value });
  };

  canBeSubmitted() {
    const errors = this.validate(this.state.player1, this.state.player2);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  render() {
    const { isEnabled, player1, player2 } = this.state;
    const errors = this.validate(player1, player2);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          className={this.props.className}
        >
          <ModalHeader>
            Please Enter Player's Name
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleEmail">Player 1</Label>
              <Input
                className={shouldMarkError("player1") ? "error" : ""}
                type="text"
                name="player1"
                id="player1"
                placeholder="Enter Player 1 Name"
                value={player1}
                onChange={evt => this.handlePlayer1Change(evt)}
                onBlur={this.handleBlur("player1")}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Player 2</Label>
              <Input
                className={shouldMarkError("player1") ? "error" : ""}
                type="text"
                name="player2"
                id="player12"
                placeholder="Enter Player 2 Name"
                value={player2}
                onChange={evt => this.handlePlayer2Change(evt)}
                onBlur={this.handleBlur("player2")}
                required
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={isEnabled}
              color="primary"
              onClick={this.handleSubmit}
            >
              Submit
            </Button>
            {"  "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EnterNamesModal;
