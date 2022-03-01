import React from "react";
import { Button } from "react-bootstrap";

class Players extends React.Component {
  displayPlayers = () => {
    const players = this.props.players.players.map((player, i) => {
      return (
        <div
          className="player"
          key={i}
          style={{ backgroundColor: player.bgColor }}
        >
          {player.name}{" "}
          {this.props.host === this.props.userId ? (
            <Button size="sm">Kick Player</Button>
          ) : null}
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
