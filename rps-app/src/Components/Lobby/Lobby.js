import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentInfo: {},
      startTournament: false,
    };
  }

  async componentDidMount() {
    await this.props.createWebsocket();
    // const response = await fetch(
    //   `http://localhost:8080/tournament/${this.props.tournamentId}`
    // ); // who host is, tournament settings, id
    // const data = response.json();
    const data = { host: 1234, rounds: 3 };
    this.setState({ tournamentInfo: data });

    this.props.ws.onmessage = (e) => {
      if (e.data === "Start the game") {
        this.setState({ startTournament: true });
      }
    };
  }

  displayLobby = () => {
    this.state.startTournament && console.log("Started");
    return (
      <div className="lobby">
        <h1>Lobby</h1>
        <div className="lobby-components">
          <Players players={this.state.players} />
          {/* Chat will be imported from another component */}
          <div className="rhs">
            <div className="chat">
              Rounds: {this.state.tournamentInfo.rounds}
              <br />
              tournament id: {this.props.tournamentId}
            </div>
            <Options ws={this.props.ws} />
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
    return <div>{this.props.ws ? this.displayLobby() : this.loading()}</div>;
  }
}
export default Lobby;
