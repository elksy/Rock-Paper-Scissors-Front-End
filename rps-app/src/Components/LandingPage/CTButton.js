import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import NameForm from "./NameForm";
import ColourForm from "./ColourForm";

class CTButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
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
    this.props.updatePlayerName(this.state.playerName);
    console.log(this.state.playerName);
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
            <NameForm
              updateDisabledButton={(bool) =>
                this.setState({ disableButton: bool })
              }
              updatePlayerName={this.props.updatePlayerName}
              playerName={this.props.playerName}
            />
            <ColourForm
              updatePlayerColour={this.updatePlayerColour}
              playerColour={this.state.playerColour}
            />
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
          Create Tournament
        </Button>
      </div>
    );
  }
}

export default CTButton;
