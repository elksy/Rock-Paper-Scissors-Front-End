import React from "react";
import Form from "react-bootstrap/Form";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class ModalComponents {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    const { cookies } = props;
    this.state = {
      playerJoined: cookies.get("sessionId") ? true : false,
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

  newPlayer = (playerName) => {
    const { cookies } = this.props;
    console.log("logged");
    const currentState = this.state.playerJoined;
    if (this.state.playerJoined) {
      cookies.remove("sessionId");
      cookies.remove("playerName");
      this.setState({ playerJoined: !currentState, playerName: "" });
    } else {
      this.setState({ playerJoined: true, user: playerName });
    }
    console.log(cookies.getAll());
  };
}

//move to landing page probably.

export default withCookies(ModalComponents);
