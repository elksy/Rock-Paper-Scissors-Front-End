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
        <div className="buttons">
          <Button
            onClick={this.handleStart}
            variant="primary"
            size="lg"
            disabled={
              this.props.numberOfPlayers === 1 ||
              this.props.host !== this.props.userId
            }
          >
            Start Game
          </Button>
          <Button variant="danger" size="lg" onClick={this.handleLeave}>
            Leave Lobby
          </Button>
        </div>
        <div className="buttons">
          <Button
            variant="warning"
            size="lg"
            disabled={this.props.host !== this.props.userId}
          >
            Assign New Host
          </Button>
          <Button
            variant="danger"
            size="lg"
            disabled={this.props.host !== this.props.userId}
            onClick={this.handleClose}
          >
            Close Lobby
          </Button>
        </div>
      </div>
    );
  }
}

export default Options;
