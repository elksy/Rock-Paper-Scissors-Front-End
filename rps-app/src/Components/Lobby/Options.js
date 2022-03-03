import React from "react";
import { Button } from "react-bootstrap";

class Options extends React.Component {
  handleStart = (event) => {
    this.props.ws.send(JSON.stringify({ message: "Start Game" }));
  };

  handleLeave = (event) => {
    this.props.leaveLobby();
  };

  handleClose = (event) => {
    this.props.ws.send(JSON.stringify({ message: "Close Lobby" }));
  };

  render() {
    return (
      <div className="options">
        <Button
          className="option-button"
          onClick={this.handleStart}
          variant="success"
          size="lg"
          disabled={
            this.props.numberOfPlayers === 1 ||
            this.props.host !== this.props.userId
          }
        >
          Start Game
        </Button>
        <Button
          variant="warning"
          size="lg"
          className="option-button"
          onClick={this.handleLeave}
        >
          Leave Lobby
        </Button>

        <Button
          variant="danger"
          size="lg"
          className="option-button"
          disabled={this.props.host !== this.props.userId}
          onClick={this.handleClose}
        >
          Close Lobby
        </Button>
      </div>
    );
  }
}

export default Options;
