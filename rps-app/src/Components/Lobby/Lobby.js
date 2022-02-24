import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: "",
      tournamentInfo: {},
      players: [],
      startTournament: false,
    };
  }

  componentDidMount() {
    this.createWebsocket();
    // Get this data using a fetch request
    const data = { host: 1234, rounds: 3 };
    this.setState({ tournamentInfo: data });
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WS_ENDPOINT}/wslobby`
    );

    ws.onopen = () => {
      ws.send(JSON.stringify({ name: "rob" }));
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
    return <div>{this.state.ws ? this.displayLobby() : this.loading()}</div>;
  }
}
export default Lobby;
