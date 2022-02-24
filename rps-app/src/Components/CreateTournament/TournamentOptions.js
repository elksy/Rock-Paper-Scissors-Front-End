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
              onClick={this.props.handleRoundsClick}
              value="1"
              variant={this.props.rounds === "1" ? "dark" : "outline-dark"}
            >
              1
            </Button>
            <Button
              onClick={this.props.handleRoundsClick}
              value="3"
              variant={this.props.rounds === "3" ? "dark" : "outline-dark"}
            >
              3
            </Button>
            <Button
              onClick={this.props.handleRoundsClick}
              value="5"
              variant={this.props.rounds === "5" ? "dark" : "outline-dark"}
            >
              5
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Time Limit: </h3>
          <div className="option-btns">
            <Button
              onClick={this.props.handleTimeClick}
              value="5"
              variant={this.props.timeLimit === "5" ? "dark" : "outline-dark"}
            >
              5
            </Button>
            <Button
              onClick={this.props.handleTimeClick}
              value="10"
              variant={this.props.timeLimit === "10" ? "dark" : "outline-dark"}
            >
              10
            </Button>
            <Button
              onClick={this.props.handleTimeClick}
              value="15"
              variant={this.props.timeLimit === "15" ? "dark" : "outline-dark"}
            >
              15
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Add Bots: </h3>
          <div className="option-btns">
            <Button
              onClick={this.props.handleAddBots}
              variant={this.props.addBots ? "dark" : "outline-dark"}
            >
              Yes
            </Button>
            <Button
              onClick={this.props.handleAddBots}
              variant={!this.props.addBots ? "dark" : "outline-dark"}
            >
              No
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Tournament Type: </h3>
          <div className="option-btns">
            <Button
              onClick={this.props.handleTournamentType}
              value="knockout"
              id="type-btns"
              variant={this.props.type === "knockout" ? "dark" : "outline-dark"}
            >
              Knockout
            </Button>
            <Button
              onClick={this.props.handleTournamentType}
              value="round-robin"
              id="type-btns"
              variant={
                this.props.type === "round-robin" ? "dark" : "outline-dark"
              }
            >
              Round-robin
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default TournamentOptions;
