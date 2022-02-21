import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import { Switch, Route, Redirect } from "react-router-dom";

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
      </Switch>
    );
  }
}

export default App;
