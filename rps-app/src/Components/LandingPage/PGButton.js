import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NameForm from "./NameForm";
import ColourForm from "./ColourForm";

class PGButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = () => {
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="example" variant="primary" type="submit">
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
