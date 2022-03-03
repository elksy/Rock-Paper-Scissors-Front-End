import React from "react";
import "./createtournament.css";
import TournamentOptions from "./TournamentOptions.js";
import TournamentLink from "./TournamentLink.js";
import Header from "../Header/Header.js";
import { Button } from "react-bootstrap";

class CreateTournament extends React.Component {
  constructor() {
    super();
    this.state = {
      rounds: "1",
      timeLimit: "10",
      addBots: false,
      type: "knockout",
      displayTournamentLink: false,
      link: "",
    };
  }

  componentDidMount() {
    const cookies = document.cookie;
    const regex = new RegExp("(^| )sessionId=([^;]+)");
    if (regex.test(cookies)) {
      const result = cookies.match(regex)[2];
      this.setState({ hostUuid: result });
    }
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

    const response = await fetch(
      `http${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/createTournament`,
      {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          host: this.state.hostUuid,
          rounds: this.state.rounds,
          timeLimit: this.state.timeLimit,
          addBots: this.state.addBots,
          type: this.state.type,
        }),
      }
    );
    if (response.status === 200) {
      const json = await response.json();
      this.setState({ link: json.tournamentId, displayTournamentLink: true });
    }
  };

  render() {
    return (
      <div className="create-tournament-page">
        <div className="create-tournament-title-div">
          <p id="create-tournament-title">Create Tournament</p>
          <Header />
        </div>
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
        <div className="start-btn-div">
          <Button
            onClick={this.startTournament}
            size="lg"
            variant="outline-success"
            type="button"
          >
            Start Tournament
          </Button>
          {this.state.displayTournamentLink && (
            <TournamentLink
              show={this.state.displayTournamentLink}
              link={this.state.link}
            />
          )}
        </div>
      </div>
    );
  }
}
export default CreateTournament;
