import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";
import { Redirect } from "react-router-dom";
import TournamentInfo from "./TournamentInfo.js";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validLobby: true,
      uuid: "",
      ws: "",
      tournamentInfo: {},
      players: [],
      startTournament: false,
    };
  }

  async componentDidMount() {
    const cookies = document.cookie;
    const re = /sessionId=(.*);?/;
    if (re.test(cookies)) {
      const uuid = cookies.match(re)[1];
      this.setState({ uuid: uuid });
    } else {
      this.setState({ validLobby: false });
    }
    // Gets the url path from the browser e.g /lobby/132c-13xfsd-123dasf
    const urlPath = window.location.pathname.split("/");
    // If the try and join /lobby without an id they will be redirected to the main page.
    if (urlPath.length < 3 || urlPath[2] === "") {
      this.setState({ validLobby: false });
    } else {
      // If it is a valid tournament in the server return the tournament data and start the websocket connection.
      const tournamentInfo = await this.getTournamentInfo(urlPath[2]);
      // Need to also check if the user has a cookies set with a sessionId
      console.log(tournamentInfo);
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
    console.log(this.state.tournamentInfo);
    const ws = new WebSocket(
      `ws${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/wslobby/${
        this.state.tournamentInfo.id
      }`
    );

    ws.onopen = () => {
      const playerData = {
        name: this.props.name || this.state.uuid.substring(0, 4),
        uuid: this.state.uuid,
        bgColor: this.props.colour || "blue",
        textColor: this.props.colour || "black",
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
            <Options
              ws={this.state.ws}
              numberOfPlayers={
                "players" in this.state.players
                  ? this.state.players.players.length
                  : 1
              }
            />
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
        {this.state.startTournament && (
          <Redirect
            to={{
              pathname: `/tournament`,
              state: {
                uuid: this.state.uuid,
                tournamentInfo: this.state.tournamentInfo,
              },
            }}
            uuid={this.state.uuid}
            tournamentInfo={this.state.tournamentInfo}
          />
        )}
        {!this.state.validLobby && <Redirect to="/" />}
        {this.state.ws ? this.displayLobby() : this.loading()}
      </div>
    );
  }
}
export default Lobby;
