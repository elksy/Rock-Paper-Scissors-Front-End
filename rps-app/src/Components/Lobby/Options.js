import React from "react";
import { Button } from "react-bootstrap";

class Options extends React.Component {
  render() {
    return (
      <div className="options">
        <div className="buttons">
          <Button variant="primary" size="lg">
            Start Game
          </Button>
          <Button variant="danger" size="lg">
            Leave Lobby
          </Button>
        </div>
        <div className="buttons">
          <Button variant="warning" size="lg">
            Assign New Host
          </Button>
          <Button variant="danger" size="lg">
            Close Lobby
          </Button>
        </div>
      </div>
    );
  }
}

export default Options;
