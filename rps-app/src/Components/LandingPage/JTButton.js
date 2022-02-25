import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NameForm from "./NameForm";
import ColourForm from "./ColourForm";
import TournamentIdForm from "./TournamentIdForm";
import { Link } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class JTButton extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

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
            <TournamentIdForm />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/lobby">
            <Button
              className="example"
              variant="primary"
              type="submit"
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
          Join Tournament
        </Button>
      </div>
    );
  }
}

export default withCookies(JTButton);
