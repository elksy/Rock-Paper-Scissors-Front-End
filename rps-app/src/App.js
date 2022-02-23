import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import LandingPage from "./Components/LandingPage/LandingPage";
import Winner from "./Components/WinnerPage/Winner";
import { Switch, Route } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";
import TournamentBracket from "./Components/TournamentBracket/TournamentBracket.js";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      username: "",
      isLoggedIn: cookies.get("sessionId") ? true : false,
    };
  }

  logIn = (username) => {
    const { cookies } = this.props;
    console.log("logged");
    const currentState = this.state.isLoggedIn;
    if (this.state.isLoggedIn) {
      console.log("removed");
      cookies.remove("sessionId");
      cookies.remove("user_id");
      cookies.remove("email");
      this.setData();
      this.setState({ isLoggedIn: !currentState, username: "" });
    } else {
      this.setState({ isLoggedIn: true, user: username });
    }
    console.log(cookies.getAll());
  };

  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby tournamentId={5} />
        </Route>
        <Route path="/create-tournament">
          <CreateTournament />
        </Route>
        <Route path="/tournament">
          <TournamentBracket />
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

export default withCookies(App);
