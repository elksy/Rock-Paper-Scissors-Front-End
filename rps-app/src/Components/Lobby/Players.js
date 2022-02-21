import React from "react";
import { Button } from "react-bootstrap";

class Players extends React.Component {
  displayPlayers = () => {
    const players = this.props.players.map((player) => {
      return (
        <div className="player">
          {player} <Button size="sm">Kick Player</Button>
        </div>
      );
    });
    return players;
  };

  render() {
    return (
      <div className="players">
        <h2>Players</h2>
        {this.displayPlayers()}
      </div>
    );
  }
}

export default Players;
