import React from "react";
import { Button } from "react-bootstrap";

class TournamentOptions extends React.Component {
  render() {
    return (
      <>
        <div className="tournament-option">
          <h3>Number of Rounds: </h3>
          <div className="option-btns">
            <Button
              id={this.props.rounds === "1" ? "selected" : "not-selected"}
              className="option-btn"
              onClick={this.props.handleRoundsClick}
              value="1"
            >
              1
            </Button>
            <Button
              id={this.props.rounds === "3" ? "selected" : "not-selected"}
              className="option-btn"
              onClick={this.props.handleRoundsClick}
              value="3"
            >
              3
            </Button>
            <Button
              id={this.props.rounds === "5" ? "selected" : "not-selected"}
              className="option-btn"
              onClick={this.props.handleRoundsClick}
              value="5"
            >
              5
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Time Limit: </h3>
          <div className="option-btns">
            <Button
              id={this.props.timeLimit === "5" ? "selected" : "not-selected"}
              className="option-btn"
              onClick={this.props.handleTimeClick}
              value="5"
            >
              5
            </Button>
            <Button
              id={this.props.timeLimit === "10" ? "selected" : "not-selected"}
              className="option-btn"
              onClick={this.props.handleTimeClick}
              value="10"
            >
              10
            </Button>
            <Button
              id={this.props.timeLimit === "15" ? "selected" : "not-selected"}
              className="option-btn"
              onClick={this.props.handleTimeClick}
              value="15"
            >
              15
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Tournament Type: </h3>
          <div className="option-btns">
            <Button
              id={this.props.type === "knockout" ? "selected" : "not-selected"}
              onClick={this.props.handleTournamentType}
              value="knockout"
              className="type-btns"
            >
              Knockout
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default TournamentOptions;
