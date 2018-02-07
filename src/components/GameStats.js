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
  Input,
  Table
} from "reactstrap";

const GameStats = ({ modal, className, onClick, players, winCount }) => {
  return (
    <div>
      <Button color="danger" onClick={onClick}>
        Game States
      </Button>
      <Modal isOpen={modal} className={className} toggle={this.toggle}>
        <ModalHeader toggle={onClick}>Game States</ModalHeader>
        <ModalBody>
          <Table>
            <thead>
              <tr>
                <th scope="row">Players</th>
                <th>{players[0]}</th>
                <th>{players[1]}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">TOTAL WINs</th>
                <td>{winCount[0]}</td>
                <td>{winCount[1]}</td>
              </tr>
              <tr>
                <th scope="row">TOTAL LOSEs</th>
                <td>{winCount[1]}</td>
                <td>{winCount[0]}</td>
              </tr>
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GameStats;
