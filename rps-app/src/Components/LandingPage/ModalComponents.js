import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class ModalComponents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerColour: undefined,
      showModal: false,
      showJoinModal: false,
      redirect: false,
      disableButton: true,
      tournamentId: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.disableButton();
  };

  disableButton = () => {
    if (this.state.playerName.length > 2) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  formPlayerName = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="username-label">Username</Form.Label>
        <Form.Control
          className="username-input"
          type="text"
          placeholder="Enter nickname"
          value={this.state.username}
          id="email"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  };

  formPickColour = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="colour-label">Choose a colour</Form.Label>
        <Form.Control
          className="colour-input"
          type="color"
          value={this.state.playerColour}
          id="colour"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  };

  formTournamentId = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="tournament-id-label">Tournament ID</Form.Label>
        <Form.Control
          className="tournament-id-input"
          type="text"
          placeholder="Enter Tournament ID"
          value={this.state.tournamentId}
          id="tournament-id"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  };
}

export default ModalComponents;
