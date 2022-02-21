import React from "react";
import Players from "./Players.js";
import Options from "./Options.js";
import "./lobby.css";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: ["Rob", "Harry", "Mariam", "Kishor"] };
  }
  render() {
    return (
      <div className="lobby">
        <h1>Lobby</h1>
        <div className="lobby-components">
          <Players players={this.state.players} />
          {/* Chat will be imported from another component */}
          <div className="rhs">
            <div className="chat">Chat Box</div>
            <Options />
          </div>
        </div>
      </div>
    );
  }
}
export default Lobby;
