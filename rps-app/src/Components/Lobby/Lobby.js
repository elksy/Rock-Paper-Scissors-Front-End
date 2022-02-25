import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";
import { Redirect } from "react-router-dom";
import TournamentInfo from "./TournamentInfo.js";
// import { v4 } from "https://deno.land/std/uuid/mod.ts";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validLobby: true,
      ws: "",
      tournamentInfo: {},
      players: [],
      startTournament: false,
    };
  }

  async componentDidMount() {
    // Gets the url path from the browser e.g /lobby/132c-13xfsd-123dasf
    const urlPath = window.location.pathname.split("/");
    // If the try and join /lobby without an id they will be redirected to the main page.
    if (urlPath.length < 3 || urlPath[2] === "") {
      this.setState({ validLobby: false });
    } else {
      // If it is a valid tournament in the server return the tournament data and start the websocket connection.
      const tournamentInfo = await this.getTournamentInfo(urlPath[2]);
      // Need to also check if the user has a cookies set with a sessionId
      if (tournamentInfo.valid) {
        await this.setState({ tournamentInfo: tournamentInfo.data });
        this.createWebsocket();
      } else {
        this.setState({ validLobby: false });
      }
    }
  }

  getTournamentInfo = async (id) => {
    const response = await fetch(
      `http${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/getTournamentInfo/${id}`,
      {
        method: "GET",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  };

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WS_ENDPOINT}/wslobby/${this.state.tournamentInfo.id}`
    );

    ws.onopen = () => {
      const playerData = {
        name: "Rob",
      };
      ws.send(JSON.stringify({ newPlayer: playerData }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("players" in data) {
        this.setState({ players: data });
      } else if ("message" in data) {
        this.setState({ startTournament: true });
      }
    };

    ws.onclose = () => {
      ws.send(CloseEvent());
    };

    this.setState({ ws: ws });
  };

  displayLobby = () => {
    this.state.startTournament && console.log("Started");
    return (
      <div className="lobby">
        <h1>Lobby</h1>
        <div className="lobby-components">
          {this.state.players.players && (
            <Players players={this.state.players} />
          )}

          {/* Chat will be imported from another component */}
          <div className="rhs">
            <div className="info-and-chat">
              <TournamentInfo info={this.state.tournamentInfo} />
              <div className="chat">Chat</div>
            </div>
            <Options ws={this.state.ws} />
          </div>
        </div>
      </div>
    );
  };

  loading = () => {
    return <div>Loading</div>;
  };

  render() {
    // if tournament has started redirect to the bracket page
    return (
      <div>
        {!this.state.validLobby && <Redirect to="/" />}
        {this.state.ws ? this.displayLobby() : this.loading()}
      </div>
    );
  }
}
export default Lobby;
