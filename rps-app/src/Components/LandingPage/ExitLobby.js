import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

class ExitLobby extends React.Component {
  constructor() {
    super();
    this.state = { show: true };
  }

  render() {
    console.log("modal");
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
            Back to lobby
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ExitLobby;
