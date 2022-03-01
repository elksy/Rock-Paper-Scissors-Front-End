import React from "react";
import Timer from "./Timer.js";
import Player from "./Player.js";
import Opponent from "./Opponent.js";
import "./gamepage.css";
import WinnerMessage from "./WinnerMessage.js";
import LoserMessage from "./LoserMessage.js";
import DrawMessage from "./DrawMessage.js";

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

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WS_ENDPOINT}/wsgame/${this.props.tournamentInfo.id}/${this.props.seedId}`
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

    ws.onclose = () => {
      ws.send(CloseEvent());
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
    let randChoice = "";
    if (!this.state.playerChoice) {
      const choices = ["rock", "paper", "scissors"];
      randChoice = choices[Math.floor(Math.random() * choices.length)];
    }

    this.state.ws.send(
      JSON.stringify({
        player: this.props.player.uuid,
        opponent: this.props.opponent.uuid,
        choice: this.state.playerChoice ? this.state.playerChoice : randChoice,
      })
    );
  };

  setSelectedChoice = (word) => {
    this.setState({ playerChoice: word });
  };

  showOutcomeMessage = () => {
    const { roundOutcome } = this.state;
    if (roundOutcome === "win") {
      return <WinnerMessage restartGame={this.restartGame} />;
    } else if (roundOutcome === "loss") {
      return <LoserMessage restartGame={this.restartGame} />;
    } else {
      return <DrawMessage restartGame={this.restartGame} />;
    }
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
        roundOutcome: "win",
      });
    } else {
      this.setState({
        opponentScore: this.state.opponentScore + 1,
        roundOutcome: "loss",
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
      ); //{winner: id, score: [2, 1], seed: 'final'}
      //  { winner: uuid, round: index, roundMatch: index, score: [score,score]}
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
          <Timer
            timer={this.props.tournamentInfo.timeLimit}
            timeUp={this.sendPlayerChoice}
          />{" "}
          {/* Need timer data */}
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
