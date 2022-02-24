import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalComponents from "./ModalComponents";

class JTButton extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      playerName: "",
      playerColour: undefined,
      showModal: false,
      showJoinModal: false,
      redirect: false,
      disableButton: true,
      tournamentId: "",
      playerJoined: cookies.get("sessionId") ? true : false,
    };
    this.modalComponents = new ModalComponents();
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = async (e) => {
    this.setState({ redirect: true, playerJoined: true });

    e.preventDefault();
    const { playerName, playerColour } = this.state;
    if (playerName && playerColour) {
      this.setState({ [e.target.id]: e.target.value });
    }
  };

  newPlayer = () => {
    const { cookies } = this.props;
    console.log("logged");
    const currentState = this.state.playerJoined;
    if (this.state.playerJoined) {
      this.setState({ playerJoined: !currentState, playerName: "" });
    } else {
      this.setState({ playerJoined: true, playerName: this.state.playerName });
    }
    console.log(cookies.getAll());
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
            {this.modalComponents.formPlayerName()}
            {this.modalComponents.formPickColour()}
            {this.modalComponents.formTournamentId()}
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
          Join Tournament
        </Button>
      </div>
    );
  }
}

export default JTButton;
