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
    console.log("submit");
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
            <ColourForm
              updatePlayerColour={this.updatePlayerColour}
              playerColour={this.state.playerColour}
            />
            {/* <Modal.Footer> */}
            <Link to="/create-tournament" onClick={this.handleSubmit}>
              <Button
                className="example"
                variant="primary"
                type="button"

                // disabled={is.props.disableButton}
              >
                Start Game
              </Button>
            </Link>
            {/* </Modal.Footer> */}
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
