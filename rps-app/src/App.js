import React from "react";
import "./App.css";
import Lobby from "./Components//Lobby/Lobby.js";
import LandingPage from "./Components/LandingPage/LandingPage.js";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import TournamentBracket from "./Components/TournamentBracket/TournamentBracket.js";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      tournamentId: "",
      chatWs: "",
      chatMessages: [
        { name: "Server", message: "Welcome to chat!", color: "black" },
      ],
    };
    this.ping = undefined;
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

    ws.onopen = () => {
      this.ping = setInterval(this.sendPing, 45000);
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("message" in data) {
        let messages = this.state.chatMessages;
        messages.unshift(data);
        if (messages.length > 25) {
          messages = messages.slice(0, 25);
        }
        this.setState({ chatMessages: messages });
      }
    };

    ws.onclose = () => {
      clearInterval(this.ping);
    };

    this.setState({ chatWs: ws });
  };

  sendPing = () => {
    this.state.chatWs.send(JSON.stringify({ ping: "ping" }));
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
        <Route
          path="/create-tournament"
          render={(props) => {
            if (document.cookie.indexOf("sessionId=") !== -1) {
              return <CreateTournament playerName={this.state.playerName} />;
            } else {
              return <Redirect to="/" />;
            }
          }}
        ></Route>
        <Route
          path="/tournament"
          render={(props) => {
            if (document.cookie.indexOf("sessionId=") !== -1) {
              return (
                <TournamentBracket
                  {...props}
                  chatWs={this.state.chatWs}
                  chatMessages={this.state.chatMessages}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
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
