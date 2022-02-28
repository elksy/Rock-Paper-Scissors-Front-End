import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NameForm from "./NameForm";
import ColourForm from "./ColourForm";
import TournamentIdForm from "./TournamentIdForm";
import { Link } from "react-router-dom";

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
          <Form className="form" onSubmit={this.handleSubmit}>
            <NameForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerName={this.props.updatePlayerName}
              playerName={this.props.playerName}
            />
            <ColourForm />
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
