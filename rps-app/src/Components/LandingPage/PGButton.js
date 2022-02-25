import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NameForm from "./NameForm";
import ColourForm from "./ColourForm";

class PGButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      playerColour: undefined,
      showModal: false,
      showJoinModal: false,
      redirect: false,
      disableButton: true,
      tournamentId: "",
    };
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ redirect: true, playerJoined: true });
    const { playerName, playerColour } = this.state;
    if (playerName && playerColour) {
      this.setState({ [e.target.id]: e.target.value });
    }
    this.props.addPlayer(this.state.playerName, this.state.playerColour);
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
          <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
            <NameForm />
            <ColourForm />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="example"
            variant="primary"
            type="submit"
            disabled={this.state.disableButton}
          >
            Start Game
          </Button>
        </Modal.Footer>
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
          Play Game
        </Button>
      </div>
    );
  }
}

export default PGButton;
