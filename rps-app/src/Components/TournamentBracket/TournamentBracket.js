import React from "react";
import Winner from "../WinnerPage/Winner.js";
import DisplayBracket from "./DisplayBracket.js";
import rounds from "./roundData.js";

import "./tournamentBracket.css";

class TournamentBracket extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ws: "", rounds: [], winner: "" };
  }

  componentDidMount() {
    this.setState({ rounds: rounds });
    this.createWebsocket();
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WS_ENDPOINT}/wsTournament`
    );

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("rounds" in data) {
        this.setState({ rounds: data.bracket });
        this.checkForWin(data.bracket);
      }
    };

    ws.onclose = () => {
      console.log("closing");
      ws.send(CloseEvent());
    };

    this.setState({ ws: ws });
  };

  checkForWin(rounds) {
    //this would need to change if there are more than one rounds in each bracket
    const finals = rounds[rounds.length - 1].seeds[0];
    if (finals.score[0] === 1 || finals.score[1] === 1) {
      const winner = finals.teams[finals.score[0] ? 0 : 1].name;
      this.setState({ winner });
    }
  }

  render() {
    return (
      <div>
        <div className="title">Tournament</div>
        <div className="page-wrapper">
          {this.state.winner ? (
            <Winner winner={this.state.winner} />
          ) : (
            <DisplayBracket rounds={this.state.rounds} />
          )}

          {/* <div>Chat</div> */}
        </div>
      </div>
    );
  }
}

export default TournamentBracket;
