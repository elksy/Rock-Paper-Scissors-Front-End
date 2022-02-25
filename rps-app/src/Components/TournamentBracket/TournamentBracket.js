import React from "react";
import Winner from "../WinnerPage/Winner.js";
import DisplayBracket from "./DisplayBracket.js";
import rounds from "./roundData.js";
import GamePage from "../GamePage/GamePage.js";

import "./tournamentBracket.css";

class TournamentBracket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: "",
      tournamentId: "",
      startRound: false,
      hasLost: false,
      rounds: [],
      winner: "",
      currentRound: 0,
    };
  }

  componentDidMount() {
    this.setState({ rounds: rounds, tournamentId: this.props.tournamentId });
    this.createWebsocket();
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WS_ENDPOINT}/wsTournament`
    );

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("rounds" in data) {
        this.setState({ rounds: rounds });
        // this.setState({ rounds: data.bracket });
        //this.checkForWin(data.bracket);
      } else if ("command" in data && data.command === "Start Round") {
        this.setState({ startRound: true });
        console.log("starting round");
      }
    };

    ws.onclose = () => {
      console.log("closing");
      ws.send(CloseEvent());
    };

    this.setState({ ws: ws });
  };

  startRound = () => {
    //this.checkForWin(this.state.rounds);
    if (this.state.winner) {
      return <Winner winner={this.state.winner} />;
    }
    if (!this.state.hasLost) {
      const [seed, player, opponent] = this.getMatch();

      return (
        <GamePage
          seed={seed}
          opponent={opponent}
          playerName={player}
          tournamentWs={this.state.ws}
          updatePlayerLost={this.updatePlayerLost} //call if player has lost
          endCurrentRound={this.endCurrentRound}
          //tournament data
        />
      );
    } else {
      <DisplayBracket rounds={this.state.rounds} />;
    }
  };

  getMatch = () => {
    const roundData = this.state.rounds[this.state.currentRound].seeds;
    const playerMatch = roundData.filter((match) => {
      return (
        match.teams[0].uuid === this.props.uuid ||
        match.teams[1].uuid === this.props.uuid
      );
    });
    const player = this.getPlayer(playerMatch.teams);
    const opponent = this.getOpponent(playerMatch.teams);
    const result = [playerMatch.id, player, opponent];
    return result;
  };

  getPlayer = (teams) => {
    const [player] = teams.filter((team) => {
      return team.uuid === this.props.uuid;
    });
    return player;
  };

  getOpponent = (teams) => {
    const [opponent] = teams.filter((team) => {
      return team.uuid !== this.props.uuid;
    });
    return opponent;
  };

  updatePlayerLost = () => {
    this.setState({ hasLost: true });
  };

  endCurrentRound = () => {
    this.setState({ startRound: false });
  };

  checkForWin(rounds) {
    //this would need to change if there are more than one rounds in each bracket
    const finals = rounds[rounds.length - 1].seeds[0];
    const winner =
      finals.score[0] > finals.score[1]
        ? finals.teams[0].name
        : finals.teams[1].name;
    this.setState({ winner });
  }

  render() {
    return (
      <div>
        <div className="title">Tournament</div>
        <div className="page-wrapper">
          {this.state.startRound ? (
            this.startRound()
          ) : (
            <DisplayBracket rounds={this.state.rounds} />
          )}
        </div>
        <button
          onClick={(e) => this.setState({ startRound: !this.state.startRound })}
        >
          Click Me
        </button>
      </div>
    );
  }
}

export default TournamentBracket;
