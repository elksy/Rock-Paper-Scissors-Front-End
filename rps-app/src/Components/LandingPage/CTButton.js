import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

class CTButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
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
    // if (this.state.redirect) {
    //   return <Redirect to="/create-tournament" />;
    // }
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
        class="modal-dialog modal-dialog-centered"
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Nickname</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="form">
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
            <Link to="/create-tournament">
              <Button
                className="example"
                variant="primary"
                type="submit"
                onSubmit={(e) => {
                  this.handleSubmit(e);
                }}
                disabled={this.state.disableButton}
              >
                Start Game
              </Button>
            </Link>
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
          Create Tournament
        </Button>
      </div>
    );
  }
}

export default CTButton;
