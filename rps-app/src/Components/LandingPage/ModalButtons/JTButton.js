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
              playerColour={this.props.playerColour}
              tournamentId={this.state.tournamentId}
            />
            <ColourForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerColour={this.props.updatePlayerColour}
              playerColour={this.props.playerColour}
              playerName={this.props.playerName}
              tournamentId={this.state.tournamentId}
            />
            <TournamentIdForm
              updateTournamentId={this.props.updateTournamentId}
              tournamentId={this.props.tournamentId}
            />
            <div className="modal-button">
              <Button
                className="modal-button"
                variant="primary"
                type="submit"
                disabled={this.state.disableButton}
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
          Play Game
        </Button>
      </div>
    );
  }
}

export default JTButton;
