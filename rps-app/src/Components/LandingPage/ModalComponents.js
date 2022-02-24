import React from "react";
import Form from "react-bootstrap/Form";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class ModalComponents extends React.Component {
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

  async getSession() {
    try {
      const response = await fetch("http://localhost:8080/sessions", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      return await json.success;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  setData = (data, compareData) => {
    console.log("changed");
    console.log(data, compareData);
    this.setState({
      results: data ? [...data] : [],
      compareResults: compareData ? [...compareData] : [],
    });
  };

  newPlayer = (user_name) => {
    const { cookies } = this.props;
    console.log("logged");
    const currentState = this.state.playerJoined;
    if (this.state.playerJoined) {
      cookies.remove("sessionId");
      cookies.remove("user_name");
      this.setData();
      this.setState({ playerJoined: !currentState, user_name: "" });
    } else {
      this.setState({ playerJoined: true, user: user_name });
    }
    console.log(cookies.getAll());
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.disableButton();
  };

  disableButton = () => {
    if (this.state.playerName.length > 2) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  formPlayerName = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="username-label">Username</Form.Label>
        <Form.Control
          className="username-input"
          type="text"
          placeholder="Enter nickname"
          value={this.state.username}
          id="email"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  };

  formPickColour = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="colour-label">Choose a colour</Form.Label>
        <Form.Control
          className="colour-input"
          type="color"
          value={this.state.playerColour}
          id="colour"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  };

  formTournamentId = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="tournament-id-label">Tournament ID</Form.Label>
        <Form.Control
          className="tournament-id-input"
          type="text"
          placeholder="Enter Tournament ID"
          value={this.state.tournamentId}
          id="tournament-id"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  };
}

export default withCookies(ModalComponents);
