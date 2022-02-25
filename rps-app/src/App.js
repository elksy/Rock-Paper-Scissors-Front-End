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
      //  playerColor: "",
      playerJoined: cookies.get("sessionId") ? true : false,
    };
  }

  updatePlayerName = (playerName) => {
    this.setState({ playerName: playerName });
    console.log(this.state.playerName);
  };

  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby tournamentId={5} />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament playerName={this.state.playerName} />
        </Route>
        <Route path="/tournament">
          <TournamentBracket />
        </Route>
        {/* <Route path="/winner-page">
               <Winner />
            </Route> */}
        <Route path="/game">
          <GamePage />
        </Route>
        <Route path="/">
          <LandingPage
            updatePlayerName={this.updatePlayerName}
            playerName={this.state.playerName}
          />
        </Route>
      </Switch>
    );
  }
}

export default withCookies(App);
