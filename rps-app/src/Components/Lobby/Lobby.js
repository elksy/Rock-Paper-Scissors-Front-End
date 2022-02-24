import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";
import { Redirect } from "react-router-dom";

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
      const tournamentInfo = await this.getTournamentInfo(urlPath[2]);
      // If it is a valid tournament in the server return the tournament data and start the websocket connection.
      if (tournamentInfo.valid) {
        this.createWebsocket();
        // Get this data using a fetch request
        const data = { host: 1234, rounds: 3 };
        this.setState({ tournamentInfo: data });
      } else {
        this.setState({ validLobby: false });
      }
    }
  }

  getTournamentInfo = async (id) => {
    const response = await fetch(
      `http://localhost:8080/getTounamentInfo/${id}`,
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
    const ws = new WebSocket("ws://localhost:8080/wslobby");

    ws.onopen = () => {
      ws.send(JSON.stringify({ name: "rob" }));
      // ws.send(JSON.stringify({ name: this.props.name}))
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("players" in data) {
        this.setState({ players: data });
      } else if ("message" in data) {
        console.log("starting");
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
            <div className="chat">
              Rounds: {this.state.tournamentInfo.rounds}
              <br />
              tournament id: {this.props.tournamentId}
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
        {/* {!this.state.validLobby && <Redirect to="/" />} */}
        {this.state.ws ? this.displayLobby() : this.loading()}
      </div>
    );
  }
}
export default Lobby;
