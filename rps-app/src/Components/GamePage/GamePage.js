import React from "react";
import Timer from "./Timer.js";
import Player from "./Player.js";
import Opponent from "./Opponent.js";
import "./gamepage.css";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opponentChoice: "" };
  }
  render() {
    return (
      <div className="game-page">
        <Timer />
        <div className="game-wrapper">
          <Player />
          <Opponent choice={this.state.opponentChoice} />
        </div>
      </div>
    );
  }
}
export default GamePage;
