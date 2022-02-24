import React from "react";
import DisplayBracket from "./DisplayBracket.js";
import rounds from "./roundData.js";

import "./tournamentBracket.css";

class TournamentBracket extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ws: "", rounds: [] };
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
      }
    };

    ws.onclose = () => {
      console.log("closing");
      ws.send(CloseEvent());
    };

    this.setState({ ws: ws });
  };

  render() {
    return (
      <div>
        <div className="title">Tournament</div>
        <div className="page-wrapper">
          <DisplayBracket rounds={this.state.rounds} />
          {/* <div>Chat</div> */}
        </div>
      </div>
    );
  }
}

export default TournamentBracket;
