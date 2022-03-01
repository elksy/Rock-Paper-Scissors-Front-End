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
      playerName: "",
      playerColour: "",
    };
  }

  addPlayer = async () => {
    console.log("Add Player");
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
    if (response.status === 200) {
      this.setState({ redirectToLobby: true });
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
        <div>
          <div className="landing-page-container">
            <h1>Rock, Paper, Scissors Tournament 🪨📄✂️</h1>
            <Header showPlayerName={this.props.playerName} />
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
