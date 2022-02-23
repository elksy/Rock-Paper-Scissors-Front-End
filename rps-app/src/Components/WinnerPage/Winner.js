import React from "react";
import "./winner.css";
import { Button } from "react-bootstrap";

class Winner extends React.Component {
  render() {
    return (
      <div className="winner-page">

        <header className="header">
          <h1>Tournament Complete!</h1>
        </header>
        <main>
          <div className="winner-comps">
            <div className="winners-div">
              <div className="winners-area">Winners Podium</div>
              <div className="losers-area">Losers!</div>
            </div>

            <div className="chat-comp">Chat</div>
          </div>
          <div className="winner-page-btns">
            <Button className="btn-primary">Play Again</Button>
            <Button input="button">Leave</Button>
            <Button input="button">End Tournament</Button>
          </div>
        </main>
      </div>
    );
  }
}

export default Winner;
