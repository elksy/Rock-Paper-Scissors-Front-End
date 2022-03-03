import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";
import { Redirect } from "react-router-dom";
import TournamentInfo from "./TournamentInfo.js";
import Chat from "../Chat/Chat.js";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validLobby: true,
      sessionId: "",
      playerName: "",
      playerColour: "",
      ws: "",
      tournamentInfo: {},
      players: [],
      startTournament: false,
      leaveReason: "",
    };
  }

  async componentDidMount() {
    this.getDataFromCookies("sessionId");
    this.getDataFromCookies("playerName");
    this.getDataFromCookies("playerColour");

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
        this.setState({ tournamentInfo: tournamentInfo.data });
        this.createWebsocket(tournamentInfo.data);
        // this.props.createChatWebsocket(tournamentInfo.data.id);
      } else {
        this.setState({ validLobby: false });
      }
    }
  }

  componentWillUnmount() {
    if (this.state.ws) {
      if (this.state.leaveReason === "") {
        this.state.ws.close(3000, "Game started");
      } else {
        this.state.ws.close(4000, "Leaving lobby");
      }
    }
  }

  getDataFromCookies(section) {
    const cookies = document.cookie;
    const regex = new RegExp("(^| )" + section + "=([^;]+)");
    if (regex.test(cookies)) {
      const result = cookies.match(regex)[2];
      this.setState({ [section]: result });
    } else {
      this.setState({ validLobby: false });
    }
  }

  getTournamentInfo = async (id) => {
    const response = await fetch(
      `http${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/getTournamentInfo/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  };

  createWebsocket = (tournamentInfo) => {
    const ws = new WebSocket(
      `ws${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/wslobby/${tournamentInfo.id}`
    );

    ws.onopen = () => {
      const playerData = {
        name: this.state.playerName || "Anon",
        uuid: this.state.sessionId,
        bgColor: this.state.playerColour || "blue",
        textColor: this.props.colour || "black",
      };
      ws.send(JSON.stringify({ newPlayer: playerData }));
    };

    // ws.onclose = (e) => {
    //   if (this.state.leaveReason === "") {
    //     this.state.ws.close(4000, "Leaving lobby");
    //   }
    // };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("players" in data) {
        this.setState({ players: data });
      } else if ("message" in data && data.message === "Game Full") {
        this.setState({
          leaveReason: "Lobby is full!",
          validLobby: false,
        });
      } else if ("message" in data && data.message === "Start Game") {
        this.setState({ startTournament: true });
      } else if ("message" in data && data.message === "Kick Player") {
        this.setState({
          leaveReason: "You have been kicked.",
          validLobby: false,
        });
      } else if ("message" in data && data.message === "Close Lobby") {
        this.setState({
          leaveReason: "Lobby has been closed.",
          validLobby: false,
        });
      }
    };
    this.setState({ ws: ws });
  };

  kickPlayer = (player) => {
    this.state.ws.send(JSON.stringify({ makeLeave: player }));
  };

  leaveLobby = () => {
    this.setState({
      validLobby: false,
      leaveReason: "You have left the lobby",
    });
  };

  displayLobby = () => {
    return (
      <div className="lobby">
        <div className="lobby-title-div">
          <h1 className="lobby-title">Lobby</h1>
        </div>

        <div className="lobby-components">
          {this.state.players.players && (
            <Players
              players={this.state.players}
              userId={this.state.sessionId}
              host={this.state.tournamentInfo.host}
              kickPlayer={this.kickPlayer}
            />
          )}
          <div className="rhs">
            <div className="info-and-chat">
              <TournamentInfo
                info={this.state.tournamentInfo}
                numberOfPlayers={
                  "players" in this.state.players
                    ? this.state.players.players.length
                    : 1
                }
              />
              <div className="chat">Chat</div>
              {/* <Chat
                chatWs={this.props.chatWs}
                chatMessages={this.props.chatMessages}
                playerName={this.state.playerName}
                playerColour={this.state.playerColour}
              /> */}
            </div>
            <Options
              ws={this.state.ws}
              numberOfPlayers={
                "players" in this.state.players
                  ? this.state.players.players.length
                  : 1
              }
              host={this.state.tournamentInfo.host}
              userId={this.state.sessionId}
              leaveLobby={this.leaveLobby}
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
                uuid: this.state.sessionId,
                playerName: this.state.playerName,
                playerColour: this.state.playerColour,
                tournamentInfo: this.state.tournamentInfo,
              },
            }}
            // uuid={this.state.sessionId}
            // tournamentInfo={this.state.tournamentInfo}
          />
        )}
        {!this.state.validLobby && (
          <Redirect
            to={{
              pathname: "/",
              state: {
                leaveReason: this.state.leaveReason,
              },
            }}
          />
        )}
        {this.state.ws ? this.displayLobby() : this.loading()}
      </div>
    );
  }
}
export default Lobby;
