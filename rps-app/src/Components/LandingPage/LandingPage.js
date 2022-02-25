import React from "react";
import "./LandingPage.css";
import PGButton from "./PGButton";
import JTButton from "./JTButton";
import CTButton from "./CTButton";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class LandingPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    const { cookies } = props;
    super(props);
    this.state = {
      playerName: "",
      playerColour: undefined,
      showModal: false,
      showJoinModal: false,
      playerJoined: cookies.get("sessionId") ? true : false,
    };
  }

  async addPlayer(playerName, playerColour) {
    const endpoint = "https://localhost:8080/sessions";
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerName: playerName,
        playerColour: playerColour,
      }),
    });
    return response;
  }

  playerSession = () => {
    const { cookies } = this.props;
    console.log("logged");
    if (this.state.playerJoined) {
      cookies.remove("sessionId");
      cookies.remove("playerName");
      this.setState({
        playerName: this.state.playerName,
        playerColour: this.state.playerColour,
      });
    }
    console.log(cookies.getAll());
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div>
        <div>
          <div className="landing-page-container">
            <h1>Rock, Paper, Scissors</h1>

            <div className="menu-button-container">
              <PGButton playerSession={() => this.playerSession()} />
              <JTButton playerSession={() => this.playerSession()} />
              <CTButton playerSession={() => this.playerSession()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(LandingPage);
