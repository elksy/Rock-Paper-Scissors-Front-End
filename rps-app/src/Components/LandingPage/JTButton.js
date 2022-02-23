import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class JTButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerColour: "",
      showModal: false,
      showJoinModal: false,
      redirect: false,
      disableButton: true,
    };
  }
  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.disableButton();
  };

  handleSubmit = () => {
    this.setState({ redirect: true });
  };

  disableButton = () => {
    if (this.state.playerName.length > 2) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  viewModal = () => {
    return (
      <Modal
        show={this.state.showModal}
        onHide={() => {
          this.handleModal();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Nickname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label className="username-label">Username</Form.Label>
              <Form.Control
                className="username-input"
                type="text"
                placeholder="Enter nickname"
                // value={this.state.username}
                id="email"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="colour-label">Choose a colour</Form.Label>
              <Form.Control
                className="colour-input"
                type="color"
                // value={this.state.playerColour}
                id="colour"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="tournament-id-label">
                Tournament ID
              </Form.Label>
              <Form.Control
                className="tournament-id-input"
                type="text"
                placeholder="Enter Tournament ID"
                // value={this.state.username}
                id="tournament-id"
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <Button className="example" variant="primary" type="submit">
              Start Game
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  render() {
    return (
      <div>
        {this.viewModal()}
        <Button
          type="submit"
          className="btn btn-primary"
          onClick={() => {
            this.handleModal();
          }}
        >
          Join Tournament
        </Button>
      </div>
    );
  }
}

export default JTButton;
