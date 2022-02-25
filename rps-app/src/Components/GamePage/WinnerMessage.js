import React from "react";

class WinnerMessage extends React.Component {
  componentDidMount() {
    setTimeout(this.props.restartGame, 5000);
  }

  render() {
    return <div>Winner!</div>;
  }
}
export default WinnerMessage;
