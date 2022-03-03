import React from "react";
import PlayerTimer from "./PlayerTimer.js";
import Player from "./Player.js";
import Opponent from "./Opponent.js";
import "./gamepage.css";
import OutcomeMessage from "./OutcomeMessage.js";

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: "",
      playerChoice: "",
      opponentChoice: "",
      playerScore: 0,
      opponentScore: 0,
      roundOutcome: "",
    };
  }

  componentDidMount() {
    this.createWebsocket();
  }
  componentWillUnmount() {
    console.log("before");

    this.state.ws.close();
    console.log("umounting");
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/wsgame/${
        this.props.tournamentInfo.id
      }/${this.props.seedId}`
    );

    ws.onopen = () => {};

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("move" in data) {
        if (data.move.player === this.props.opponent.uuid) {
          this.setState({ opponentChoice: data.move.choice });
        }
      }
    };

    this.setState({ ws: ws });
  };

  componentDidUpdate() {
    if (
      this.state.opponentChoice &&
      this.state.playerChoice &&
      !this.state.roundOutcome
    ) {
      this.calculateScore();
    }
  }
  sendPlayerChoice = () => {
    let randomChoice;
    if (!this.state.playerChoice) {
      randomChoice = ["rock", "paper", "scissors"][
        Math.floor(Math.random() * 3)
      ];
      this.setState({ playerChoice: randomChoice });
    }

    this.state.ws.send(
      JSON.stringify({
        player: this.props.player.uuid,
        opponent: this.props.opponent.uuid,
        choice: this.state.playerChoice
          ? this.state.playerChoice
          : randomChoice,
      })
    );
  };

  setSelectedChoice = (word) => {
    this.setState({ playerChoice: word });
  };

  showOutcomeMessage = () => {
    return (
      <OutcomeMessage
        outcome={this.state.roundOutcome}
        didPlayerWin={this.props.player.name === this.state.roundOutcome}
        playerChoice={this.state.playerChoice}
        opponentChoice={this.state.opponentChoice}
        restartGame={this.restartGame}
      />
    );
  };

  calculateScore = () => {
    const { playerChoice, opponentChoice } = this.state;
    if (playerChoice === opponentChoice) {
      this.setState({ roundOutcome: "draw" });
    } else if (
      (playerChoice === "scissors" && opponentChoice === "paper") ||
      (playerChoice === "paper" && opponentChoice === "rock") ||
      (playerChoice === "rock" && opponentChoice === "scissors")
    ) {
      this.setState({
        playerScore: this.state.playerScore + 1,
        roundOutcome: this.props.player.name,
      });
    } else {
      this.setState({
        opponentScore: this.state.opponentScore + 1,
        roundOutcome: this.props.opponent.name,
      });
    }
  };

  restartGame = () => {
    if (
      this.state.playerScore >= Math.ceil(this.props.tournamentInfo.rounds / 2)
    ) {
      this.props.tournamentWs.send(
        JSON.stringify({
          result: {
            winner: this.props.player.uuid,
            seedId: this.props.seedId,
            round: this.props.round,
            playerScore: this.state.playerScore,
            opponentScore: this.state.opponentScore,
          },
        })
      );
      this.props.endCurrentRound();
    } else if (
      this.state.opponentScore >=
      Math.ceil(this.props.tournamentInfo.rounds / 2)
    ) {
      this.props.updatePlayerLost();
    } else {
      this.setState({ playerChoice: "", opponentChoice: "", roundOutcome: "" });
    }
  };

  playGame = () => {
    return (
      <div>
        <div className="timer-container">
          <PlayerTimer
            timer={this.props.tournamentInfo.timeLimit}
            timeUp={this.sendPlayerChoice}
          />
        </div>
        <div className="game-wrapper">
          <Player
            name={this.props.player.name}
            setSelectedChoice={(word) => this.setSelectedChoice(word)}
          />

          <div className="vertical-line"></div>

          <Opponent
            name={this.props.opponent.name}
            choice={this.state.opponentChoice}
          />
        </div>
        <div>
          <p>
            Score: {this.state.playerScore} - {this.state.opponentScore}
          </p>
          <p>Best of {this.props.tournamentInfo.rounds}</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="game-page">
        {this.state.roundOutcome ? this.showOutcomeMessage() : this.playGame()}
      </div>
    );
  }
}
export default GamePage;
