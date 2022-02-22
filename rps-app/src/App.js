import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage";
import Winner from "./Components/WinnerPage/Winner";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ws: "", players: [] };
  }

  createWebsocket = () => {
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => {
      console.log("connected");
      ws.send(JSON.stringify({ playername: "rob" }));
    };

    ws.onmessage = (e) => {};

    ws.onclose = () => {
      console.log("disconnected");
    };

    this.setState({ ws: ws });
  };

  componentDidMount() {
    // this.createWebsocket();
  }

  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby
            ws={this.state.ws}
            createWebsocket={this.createWebsocket}
            tournamentId={5}
            playerName="Rob"
          />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
        <Route path="/winner-page">
          <Winner />
        </Route>
      </Switch>
    );
  }
}

export default App;
