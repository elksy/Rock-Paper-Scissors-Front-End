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
      opponentChoice: "rock",
      playerScore: 0,
      opponentScore: 0,
      roundOutcome: "",
    };
  }

  componentDidMount() {
    this.createWebsocket();
    // const choices = ["rock", "paper", "scissors"];
    // const randChoice = Math.floor(Math.random() * choices.length);
    // this.setState({ choice: choices[randChoice] });
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws://${process.env.REACT_APP_WS_ENDPOINT}/wsgame`
    );

    ws.onopen = () => {
      // console.log("connected");
    };

    ws.onmessage = (e) => {
      // console.log(e);
      const data = JSON.parse(e.data);
      if ("opponentChoice" in data) {
        this.setState({ opponentChoice: data.opponentChoice });
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
      console.log("calculate");
    }
  }
  sendPlayerChoice = () => {
    this.state.ws.send({ choice: this.state.playerChoice });
    // console.log(this.state.playerChoice);
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
    // check for win
    // reset state
    if (this.state.playerScore >= Math.ceil(5 / 2)) {
      //needs round data
      //rounds should be obj in tournamentData
      this.props.tournamentWs.send("result"); //{winner: id, score: [2, 1], seed: 'final'}
      this.props.endCurrentRound();
    } else if (this.state.opponentScore >= Math.ceil(5 / 2)) {
      //needs round data
      //
      this.props.updatePlayerLost();
      this.props.endCurrentRound();
    } else {
      this.setState({ playerChoice: "", opponentChoice: "", roundOutcome: "" });
    }
  };

  playGame = () => {
    return (
      <div>
        <div className="timer-container">
          <Timer timer={10} timeUp={this.sendPlayerChoice} />{" "}
          {/* Need timer data */}
        </div>
        <div className="game-wrapper">
          <Player
            playerName={this.props.playerName}
            setSelectedChoice={(word) => this.setSelectedChoice(word)}
          />

          <div className="vertical-line"></div>

          <Opponent
            name={this.props.opponent}
            choice={this.state.opponentChoice}
          />
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
