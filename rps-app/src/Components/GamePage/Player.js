import React from "react";
import ChoiceMade from "./ChoiceMade.js";
import rock from ".//images/rock.png";
import paper from ".//images/paper.png";
import scissors from ".//images/scissors.png";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selection: "" };
  }

  updateSelection = (word) => {
    this.setState({ selection: word });
    this.props.setSelectedChoice(word);
  };

  render() {
    return (
      <div className="game">
        <h2>{this.props.playerName}</h2>
        {/* Display the players choice once they have made a selection */}
        <ChoiceMade selection={this.state.selection} />
        <div className="selection-wrapper">
          <div
            className="selection-div"
            onClick={() => this.updateSelection("rock")}
          >
            <img className="selection-image" src={rock} alt="rock" />
          </div>
          <div
            className="selection-div"
            onClick={() => this.updateSelection("paper")}
          >
            <img className="selection-image" src={paper} alt="paper" />
          </div>
          <div
            className="selection-div"
            onClick={() => this.updateSelection("scissors")}
          >
            <img className="selection-image" src={scissors} alt="scissors" />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
