import React from "react";
import "./LandingPage.css";
import PGButton from "./PGButton";
import JTButton from "./JTButton";
import CTButton from "./CTButton";
import Header from "./Header";
import { Redirect } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showJoinModal: false,
      redirectToLobby: false,
    };
  }

  addPlayer = async (playerName, playerColour) => {
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
        playerName: playerName,
        playerColour: playerColour,
      }),
    });
    if (response.status === 200) {
      this.setState({ redirectToLobby: true });
    }
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {

    return (
      <div>
        {this.state.redirectToLobby && (
          <Redirect to={`/lobby/${this.props.tournamentId}`} />
        )}
        <div>
          <div className="landing-page-container">
            <h1>Rock, Paper, Scissors</h1>

            <div className="menu-button-container">
              <PGButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.props.updatePlayerName}
                playerName={this.props.playerName}
                updatePlayerColour={this.updatePlayerColour}
                playerColour={this.state.playerColour}
              />
              <JTButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.props.updatePlayerName}
                playerName={this.props.playerName}
                updatePlayerColour={this.props.updatePlayerColour}
                playerColour={this.props.playerColour}
                updateTournamentId={this.props.updateTournamentId}
                tournamentId={this.props.tournamentId}
              />
              <CTButton
                addPlayer={this.addPlayer}
                updatePlayerName={this.props.updatePlayerName}
                playerName={this.props.playerName}
                updatePlayerColour={this.props.updatePlayerColour}
                playerColour={this.props.playerColour}
                updateTournamentId={this.props.updateTournamentId}
                tournamentId={this.props.tournamentId}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
