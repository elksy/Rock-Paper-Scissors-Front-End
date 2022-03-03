import React from "react";
import Timer from "./Timer.js";
import Opponent from "../../GamePage/Opponent";
import "./spectateGame.css";
import OutcomeMessage from "../../GamePage/OutcomeMessage.js";

class SpectateGame extends React.Component {
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
    this.state.ws.close();
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/wsgame/${
        this.props.tournamentInfo.id
      }/${this.props.seed}`
    );

    ws.onopen = () => {};

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if ("move" in data) {
        if (data.move.player === this.props.player.uuid) {
          this.setState({ playerChoice: data.move.choice });
        } else if (data.move.player === this.props.opponent.uuid) {
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

  restartGame = () => {
    if (
      this.state.playerScore >=
        Math.ceil(this.props.tournamentInfo.rounds / 2) ||
      this.state.opponentScore >=
        Math.ceil(this.props.tournamentInfo.rounds / 2)
    ) {
      this.props.endSpectating();
    } else {
      this.setState({ playerChoice: "", opponentChoice: "", roundOutcome: "" });
    }
  };

  playGame = () => {
    return (
      <div>
        <div className="timer-container">
          <Timer timer={this.props.tournamentInfo.timeLimit} />
        </div>
        <div className="game-wrapper">
          <Opponent name={this.props.player.name} />

          <div className="vertical-line"></div>

          <Opponent name={this.props.opponent.name} />
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
export default SpectateGame;
