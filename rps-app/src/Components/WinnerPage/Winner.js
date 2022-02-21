import React from "react";
import "./winner.css";

class Winner extends React.Component {
  render() {
    return (
      <div className="winner-page">
        <h1>Winner Page</h1>
        <div>Winners area</div>
        <div className="chat-comp">Chat component</div>
        <div className="winner-page-btns">
          <button input="button">Play Again</button>
          <button input="button">Leave</button>
          <button input="button">End Tournament</button>
        </div>
      </div>
    );
  }
}

export default Winner;
