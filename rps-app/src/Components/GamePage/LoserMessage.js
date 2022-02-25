import React from "react";

class LoserMessage extends React.Component {
  componentDidMount() {
    setTimeout(this.props.restartGame, 5000);
  }

  render() {
    return <div>Loser!</div>;
  }
}
export default LoserMessage;
