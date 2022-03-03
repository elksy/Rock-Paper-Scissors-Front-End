import React from "react";
import "./LandingPage.css";
import PGButton from "./ModalButtons/PGButton.js";
import JTButton from "./ModalButtons/JTButton.js";
import CTButton from "./ModalButtons/CTButton.js";
import ExitLobby from "./ExitLobby.js";
import Header from "../Header/Header.js";
import { Redirect } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showJoinModal: false,
      redirectToLobby: false,
      redirectToCreateTournament: false,
      playerName: "",
      playerColour: "",
      leaveReason: "",
      disableButton: false,
    };
  }

  componentDidMount() {
    const { location, history } = this.props;
    if (location.state && "leaveReason" in location.state) {
      this.setState({ leaveReason: location.state.leaveReason });
    }
    history.replace();
  }

  addPlayer = async (location) => {
    const endpoint = `http${
      process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
    }://${process.env.REACT_APP_WS_ENDPOINT}/sessions`;
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerName: this.state.playerName,
        playerColour: this.state.playerColour,
      }),
    });
    const jsonResponse = await response.json();

    document.cookie = `sessionId=${jsonResponse.sessionId};expires=${jsonResponse.expiryDate};SameSite:None;Secure`;
    document.cookie = `playerName=${jsonResponse.playerName};expires=${jsonResponse.expiryDate};SameSite:None;Secure`;
    document.cookie = `playerColour=${jsonResponse.playerColour};expires=${jsonResponse.expiryDate};SameSite:None;Secure`;
    if (response.status === 200 && location === "lobby") {
      this.setState({ redirectToLobby: true });
    } else if (response.status === 200 && location === "createTournament") {
      this.setState({ redirectToCreateTournament: true });
    }
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  updatePlayerName = (playerName) => {
    this.setState({ playerName: playerName });
    if (playerName.includes(" ")) {
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
    }
  };

  updatePlayerColour = (playerColour) => {
    this.setState({ playerColour: playerColour.hex });
  };

  updateTournamentId = (tournamentId) => {
    this.setState({ tournamentId: tournamentId });
  };

  render() {
    return (
      <div>
        {this.state.redirectToLobby && (
          <Redirect to={`/lobby/${this.props.tournamentId}`} />
        )}
        {this.state.redirectToCreateTournament && (
          <Redirect to={`/create-tournament/`} />
        )}

        <div>
          <div className="landing-page-container">
            <div className="landing-div">
              <h1 className="landing-title">
                Rock, Paper, Scissors Tournament 🪨📄✂️
              </h1>
            </div>
            <div className="menu-button-container">
              <JTButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.updatePlayerName}
                playerName={this.state.playerName}
                updatePlayerColour={this.updatePlayerColour}
                playerColour={this.state.playerColour}
                updateTournamentId={this.props.updateTournamentId}
                tournamentId={this.props.tournamentId}
                disableButton={this.state.disableButton}
              />
              <CTButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.updatePlayerName}
                playerName={this.state.playerName}
                updatePlayerColour={this.updatePlayerColour}
                playerColour={this.state.playerColour}
                disableButton={this.state.disableButton}
              />
            </div>
          </div>
        </div>
        {this.state.leaveReason && (
          <ExitLobby message={this.state.leaveReason} />
        )}
      </div>
    );
  }
}

export default LandingPage;
