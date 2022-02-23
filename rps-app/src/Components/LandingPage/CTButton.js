import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalComponents from "./ModalComponents";
import { Link } from "react-router-dom";

class CTButton extends React.Component {
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
    this.modalComponents = new ModalComponents();
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = () => {
    this.setState({ redirect: true });
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
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

export default CTButton;
