import React from "react";

class OutcomeMessage extends React.Component {
  componentDidMount() {
    setTimeout(this.props.restartGame, 5000);
  }

  displayDraw = () => {
    return (
      <div>
        <h1>Draw!</h1>
      </div>
    );
  };

  displayWinner = () => {
    return (
      <div>
        <h1>Winner {this.props.outcome}</h1>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.props.outcome === "draw"
          ? this.displayDraw()
          : this.displayWinner()}
      </div>
    );
  }
}
export default OutcomeMessage;
