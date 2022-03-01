import React from "react";
import rock from ".//images/rock.png";
import paper from ".//images/paper.png";
import scissors from ".//images/scissors.png";

class Opponent extends React.Component {
  render() {
    return (
      <div className="game">
        <h2>{this.props.name}</h2>
        {/* Display the loading screen or opponents choice */}
        <h1 className="opp-questionmark">?</h1>
        <div className="selection-wrapper">
          <div className="selection-div">
            <img className="selection-image" src={rock} alt="rock" />
          </div>
          <div className="selection-div">
            <img className="selection-image" src={paper} alt="paper" />
          </div>
          <div className="selection-div">
            <img className="selection-image" src={scissors} alt="scissors" />
          </div>
        </div>
      </div>
    );
  }
}

export default Opponent;
