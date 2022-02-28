import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import LandingPage from "./Components/LandingPage/LandingPage";
import TournamentBracket from "./Components/TournamentBracket/TournamentBracket.js";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby tournamentId={5} />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament playerName={this.state.playerName} />
        </Route>
        <Route
          path="/tournament"
          render={(props) => <TournamentBracket {...props} />}
        />
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    );
  }
}

export default App;
