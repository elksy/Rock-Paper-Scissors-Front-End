import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import LandingPage from "./Components/LandingPage/LandingPage";
import Winner from "./Components/WinnerPage/Winner";
import TournamentBracket from "./Components/TournamentBracket/TournamentBracket.js";
import GamePage from "./Components/GamePage/GamePage";
import { Switch, Route } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      playerName: "",
      playerColour: "",
      playerJoined: cookies.get("sessionId") ? true : false,
      sessionId: cookies.get("sessionId") || "",
    };
  }

  updatePlayerName = (playerName) => {
    this.setState({ playerName: playerName });
  };

  updatePlayerColour = (playerColour) => {
    this.setState({ playerColour: playerColour.hex });
  };

  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby uuid={this.state.sessionId} />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament playerName={this.state.playerName} />
        </Route>
        <Route
          path="/tournament"
          render={(props) => <TournamentBracket {...props} />}
        />
        <Route path="/">
          <LandingPage
            updatePlayerName={this.updatePlayerName}
            playerName={this.state.playerName}
            updatePlayerColour={this.updatePlayerColour}
            playerColour={this.state.playerColour}
          />
        </Route>
      </Switch>
    );
  }
}

export default withCookies(App);
