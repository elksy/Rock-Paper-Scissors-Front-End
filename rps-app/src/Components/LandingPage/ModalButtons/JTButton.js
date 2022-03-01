import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NameForm from "./InputForms/NameForm";
import ColourForm from "./InputForms/ColourForm.js";
import TournamentIdForm from "./InputForms/TournamentIdForm.js";

class JTButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableButton: true,
      tournamentId: "",
    };
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.addPlayer("lobby");
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
          <Form className="form" onSubmit={this.handleSubmit}>
            <NameForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerName={this.props.updatePlayerName}
              playerName={this.props.playerName}
            />
            <ColourForm
              updatePlayerColour={this.props.updatePlayerColour}
              playerColour={this.props.playerColour}
            />
            <TournamentIdForm
              updateTournamentId={this.props.updateTournamentId}
              tournamentId={this.props.tournamentId}
            />
            <Button
              className="example"
              variant="primary"
              type="submit"
              // disabled={this.state.disableButton}
            >
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
