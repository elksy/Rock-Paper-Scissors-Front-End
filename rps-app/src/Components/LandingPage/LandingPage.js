import React from "react";
import "./LandingPage.css";
import PGButton from "./ModalButtons/PGButton.js";
import JTButton from "./ModalButtons/JTButton.js";
import CTButton from "./ModalButtons/CTButton.js";
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
    };
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
              <PGButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.props.updatePlayerName}
                playerName={this.props.playerName}
              />
              <JTButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.updatePlayerName}
                playerName={this.state.playerName}
                updatePlayerColour={this.updatePlayerColour}
                playerColour={this.state.playerColour}
                updateTournamentId={this.props.updateTournamentId}
                tournamentId={this.props.tournamentId}
              />
              <CTButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.updatePlayerName}
                playerName={this.state.playerName}
                updatePlayerColour={this.updatePlayerColour}
                playerColour={this.state.playerColour}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
