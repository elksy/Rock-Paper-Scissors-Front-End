import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import NameForm from "./InputForms/NameForm.js";
import ColourForm from "./InputForms/ColourForm.js";

class CTButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
    };
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = (e) => {
    this.props.addPlayer();
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
          <Modal.Title>Choose a name and a colour!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form aria-label="form" className="form" onSubmit={this.handleSubmit}>
            <NameForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerName={this.props.updatePlayerName}
              playerName={this.props.playerName}
            />
            <ColourForm />
            <Link to="/create-tournament" onClick={this.handleSubmit}>
              <Button
                className="example"
                variant="primary"
                type="button"
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