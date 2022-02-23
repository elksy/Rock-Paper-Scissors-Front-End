import React from "react";
import "./createtournament.css";
import Form from "react-bootstrap/Form";
import TournamentOptions from "./TournamentOptions.js";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
class CreateTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      rounds: "1",
      timeLimit: "10",
      addBots: false,
      type: "knockout",
      redirect: false,
    };
  }

  handleRoundsClick = (event) => {
    event.preventDefault();
    this.setState({ rounds: event.target.value });
  };

  handleTimeClick = (event) => {
    event.preventDefault();
    this.setState({ timeLimit: event.target.value });
  };

  handleAddBots = (event) => {
    event.preventDefault();
    this.setState({ addBots: !this.state.addBots });
  };

  handleTournamentType = (event) => {
    event.preventDefault();
    this.setState({ type: event.target.value });
  };

  startTournament = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/createTournament", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rounds: this.state.rounds,
        timeLimit: this.state.timeLimit,
        addBots: this.state.addBots,
        type: this.state.type,
      }),
    });
    if (response.status === 200) {
      this.setState({ redirect: true });
    }
  };

  displayCreateTournament = () => {
    return (
      <div className="create-tournament-page">
        <header>
          <h1>Create Tournament</h1>
        </header>
        <TournamentOptions
          rounds={this.state.rounds}
          timeLimit={this.state.timeLimit}
          addBots={this.state.addBots}
          type={this.state.type}
          handleRoundsClick={this.handleRoundsClick}
          handleTimeClick={this.handleTimeClick}
          handleAddBots={this.handleAddBots}
          handleTournamentType={this.handleTournamentType}
        />
        <div className="start-btn">
          <Button
            onClick={this.startTournament}
            size="lg"
            variant="outline-dark"
            type="submit"
          >
            Start Tournament
          </Button>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect to="/lobby" />
        ) : (
          this.displayCreateTournament()
        )}
      </div>
    );
  }
}
export default CreateTournament;
