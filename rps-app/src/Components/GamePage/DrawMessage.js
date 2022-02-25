import React from "react";

class DrawMessage extends React.Component {
  componentDidMount() {
    setTimeout(this.props.restartGame, 5000);
  }

  render() {
    return <div>Draw!</div>;
  }
}
export default DrawMessage;
