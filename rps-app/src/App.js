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
      chatWs: "",
      chatMessages: [{ name: "server", message: "Welcome to chat!" }],
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

  createChatWebsocket = (tournamentId) => {
    const ws = new WebSocket(
      `ws${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/wschat/${tournamentId}`
    );

    ws.onopen = () => {};

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("message" in data) {
        let messages = this.state.chatMessages;
        console.log(messages);
        messages.unshift(data);
        console.log(messages);
        this.setState({ chatMessages: messages });
      }
    };

    ws.onclose = () => {
      console.log("closing");
    };

    this.setState({ chatWs: ws });
  };

  render() {
    return (
      <Switch>
        <Route path="/lobby">
          <Lobby
            chatWs={this.state.chatWs}
            chatMessages={this.state.chatMessages}
            createChatWebsocket={this.createChatWebsocket}
          />
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
            updateTournamentId={this.updateTournamentId}
            tournamentId={this.state.tournamentId}
          />
        </Route>
      </Switch>
    );
  }
}

export default App;
