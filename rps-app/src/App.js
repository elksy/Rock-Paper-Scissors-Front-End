import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament />
        </Route>
      <Route path="/landing-page">
          <LandingPage />
        </Route>
      </Switch>
    );
  }
}

export default App;
