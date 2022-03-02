import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import LandingPage from "./Components/LandingPage/LandingPage.js";
import TournamentBracket from "./Components/TournamentBracket/TournamentBracket.js";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      tournamentId: "",
    };
  }

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
      <Switch>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament playerName={this.state.playerName} />
        </Route>
        <Route
          path="/tournament"
          render={(props) => <TournamentBracket {...props} />}
        />
        <Route
          path="/"
          render={(props) => (
            <LandingPage
              updateTournamentId={this.updateTournamentId}
              tournamentId={this.state.tournamentId}
              {...props}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
