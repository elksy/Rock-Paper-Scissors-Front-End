import React from "react";
import { Button } from "react-bootstrap";

class TournamentInfo extends React.Component {
  handleClick = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(this.props.info.id);
  };

  render() {
    return (
      <div className="tournament-info">
        <p className="player-title">Tournament Info</p>
        <p>Players: ({this.props.numberOfPlayers}/16)</p>
        <div className="tournament-id">
          <p>ID: {this.props.info.id}</p>
          <Button
            id="copy-btn"
            variant="outline-primary"
            onClick={this.handleClick}
          >
            Copy
          </Button>
        </div>

        <p>Rounds per game: {this.props.info.rounds}</p>
        <p>Time Limit per game: {this.props.info.timeLimit}</p>
        <p>Tournament Type: {this.props.info.type}</p>
      </div>
    );
  }
}

export default TournamentInfo;
