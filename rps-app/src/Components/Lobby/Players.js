import React from "react";
import { Button } from "react-bootstrap";

class Players extends React.Component {
  displayPlayers = () => {
    // console.log(this.props.players.players);
    const players = this.props.players.players.map((player, i) => {
      return (
        <div
          className="player"
          key={i}
          style={{ backgroundColor: player.bgColor }}
        >
          {player.name}{" "}
          {this.props.host === this.props.userId &&
          this.props.host !== player.uuid ? (
            <Button size="sm" onClick={() => this.kickPlayer(player.uuid)}>
              Kick Player
            </Button>
          ) : null}
        </div>
      );
    });
    return players;
  };

  kickPlayer = (player) => {
    this.props.leaveLobby(player);
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
