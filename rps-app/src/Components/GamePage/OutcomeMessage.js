import React from "react";
import rock from ".//images/rock.png";
import paper from ".//images/paper.png";
import scissors from ".//images/scissors.png";
import "./outcomeMessage.css";

class OutcomeMessage extends React.Component {
  componentDidMount() {
    setTimeout(this.props.restartGame, 6000);
  }

  displayDraw = () => {
    return <div>Draw!</div>;
  };

  displayWinner = () => {
    return <div>Winner {this.props.outcome}!</div>;
  };

  getWinningImage = (choice) => {
    if (choice === "rock") {
      return <img className="rock-win" src={rock} alt="rock" />;
    } else if (choice === "paper") {
      return <img className="paper-win" src={paper} alt="paper" />;
    } else if (choice === "scissors") {
      return <img className="scissors-win" src={scissors} alt="scissors" />;
    }
  };

  getLosingImage = (choice) => {
    if (choice === "rock") {
      return <img className="rock-loss" src={rock} alt="rock" />;
    } else if (choice === "scissors") {
      return <img className="scissors-loss" src={scissors} alt="scissors" />;
    } else if (choice === "paper") {
      return (
        <div>
          <div className="paper-loss-top">
            <img className="paper-loss" src={paper} alt="paper" />
          </div>
          <div className="paper-loss-bottom">
            <img
              className="paper-loss paper-loss-bottom-image"
              src={paper}
              alt="paper"
            />
          </div>
        </div>
      );
    }
  };

  showDraw = (choice) => {
    if (choice === "rock") {
      return (
        <div className="outcome-images">
          <img className="rock-win" src={rock} alt="rock" />
          <img className="rock-win-reverse" src={rock} alt="rock" />
        </div>
      );
    } else if (choice === "paper") {
      return (
        <div className="outcome-images">
          <img className="paper-win" src={paper} alt="paper" />
          <img className="paper-win-reverse" src={paper} alt="paper" />
        </div>
      );
    } else if (choice === "scissors") {
      return (
        <div className="outcome-images">
          <img className="scissors-win" src={scissors} alt="scissors" />
          <img className="scissors-win-reverse" src={scissors} alt="scissors" />
        </div>
      );
    }
  };

  displayPlayerWin = () => {
    return (
      <div className="outcome-images">
        {this.getWinningImage(this.props.playerChoice)}
        {this.getLosingImage(this.props.opponentChoice)}
      </div>
    );
  };

  displayPlayerLost = () => {
    return (
      <div className="outcome-images-reversed">
        {this.getWinningImage(this.props.opponentChoice)}
        {this.getLosingImage(this.props.playerChoice)}
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="outcome-title">
          {this.props.outcome === "draw"
            ? this.displayDraw()
            : this.displayWinner()}
        </div>
        {this.props.outcome === "draw"
          ? this.showDraw(this.props.playerChoice)
          : this.props.didPlayerWin
          ? this.displayPlayerWin()
          : this.displayPlayerLost()}
      </div>
    );
  }
}
export default OutcomeMessage;
