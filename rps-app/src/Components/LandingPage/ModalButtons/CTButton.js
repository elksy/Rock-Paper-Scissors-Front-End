import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";
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
    e.preventDefault();
    this.props.addPlayer("createTournament");
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
          <Form
            aria-label="form"
            className="landing-form"
            onSubmit={this.handleSubmit}
          >
            <NameForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerName={this.props.updatePlayerName}
              playerName={this.props.playerName}
              playerColour={this.props.playerColour}
            />
            <ColourForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerColour={this.props.updatePlayerColour}
              playerColour={this.props.playerColour}
              playerName={this.props.playerName}
            />

            {this.props.disableButton && (
              <Alert variant="warning">Name cannot contain spaces!</Alert>
            )}
            <div className="modal-button">
              <Button
                variant="primary"
                type="submit"
              disabled={this.state.disableButton || this.props.disableButton}
            >
              Start Game
            </Button>
 </div>
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
          type="button"
          variant="dark"
          id="landing-page-btn"
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
