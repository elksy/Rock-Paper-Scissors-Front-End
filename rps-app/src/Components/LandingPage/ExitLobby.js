import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class ExitLobby extends React.Component {
  constructor() {
    super();
    this.state = { show: true };
  }

  render() {
    return (
      <Modal show={this.state.show} centered size="lg">
        <Modal.Header>
          <Modal.Title>⚠️Lobby warning⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{this.props.message}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="lg"
            id="join-btn"
            variant="outline-dark"
            onClick={() => this.setState({ show: false })}
          >
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ExitLobby;
