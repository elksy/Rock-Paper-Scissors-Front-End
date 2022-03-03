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
              className="option-btn"
              onClick={this.props.handleRoundsClick}
              value="1"
              variant={
                this.props.rounds === "1" ? "success" : "outline-success"
              }
            >
              1
            </Button>
            <Button
              className="option-btn"
              onClick={this.props.handleRoundsClick}
              value="3"
              variant={
                this.props.rounds === "3" ? "success" : "outline-success"
              }
            >
              3
            </Button>
            <Button
              className="option-btn"
              onClick={this.props.handleRoundsClick}
              value="5"
              variant={
                this.props.rounds === "5" ? "success" : "outline-success"
              }
            >
              5
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Time Limit: </h3>
          <div className="option-btns">
            <Button
              className="option-btn"
              onClick={this.props.handleTimeClick}
              value="5"
              variant={
                this.props.timeLimit === "5" ? "success" : "outline-success"
              }
            >
              5
            </Button>
            <Button
              className="option-btn"
              onClick={this.props.handleTimeClick}
              value="10"
              variant={
                this.props.timeLimit === "10" ? "success" : "outline-success"
              }
            >
              10
            </Button>
            <Button
              className="option-btn"
              onClick={this.props.handleTimeClick}
              value="15"
              variant={
                this.props.timeLimit === "15" ? "success" : "outline-success"
              }
            >
              15
            </Button>
          </div>
        </div>

        <div className="tournament-option">
          <h3>Add Bots: </h3>
          <div className="option-btns">
            <Button
              className="option-btn"
              onClick={this.props.handleAddBots}
              variant={this.props.addBots ? "success" : "outline-success"}
            >
              Yes
            </Button>
            <Button
              className="option-btn"
              onClick={this.props.handleAddBots}
              variant={!this.props.addBots ? "success" : "outline-success"}
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
              className="type-btns"
              variant={
                this.props.type === "knockout" ? "success" : "outline-success"
              }
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
