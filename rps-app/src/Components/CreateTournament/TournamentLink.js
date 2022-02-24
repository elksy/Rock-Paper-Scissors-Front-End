import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

class TournamentLink extends React.Component {
  constructor() {
    super();
    this.state = { copied: false };
  }

  handleClick = (event) => {
    navigator.clipboard.writeText(this.props.link);
    this.setState({ copied: true });
  };

  displayCopiedMsg = () => {
    return (
      <Alert variant="success">
        The link was successfully copied to your clipboard!
      </Alert>
    );
  };

  render() {
    return (
      <Modal show={this.props.show} centered size="lg">
        <Modal.Header>
          <Modal.Title>Here Is Your Tournament Link!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Send this link out to your friends!</h5>
          <div className="copy-link">
            <Form.Control
              id="link"
              type="text"
              value={this.props.link}
              readOnly
            />
            <Button
              id="copy-btn"
              variant="outline-dark"
              onClick={this.handleClick}
            >
              Copy Link
            </Button>
          </div>
          {this.state.copied && this.displayCopiedMsg()}
        </Modal.Body>
        <Modal.Footer>
          <Link to="/lobby">
            <Button size="lg" id="join-btn" variant="outline-dark">
              Join the Lobby!
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TournamentLink;
