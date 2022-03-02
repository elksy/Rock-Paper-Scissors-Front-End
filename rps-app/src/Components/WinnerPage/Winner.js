import React from "react";
import "./winner.css";
import { Button } from "react-bootstrap";
import Podium from "./Podium/Podium.js";

class Winner extends React.Component {
  render() {
    return (
      <div className="winner-page">
        <header className="winner-title">
          <h1 className="winner-title">Tournament Complete!</h1>
        </header>
        <main>
          <div className="winner-comps">
            <div className="winners-div">
              <div className="winners-area">
                Winners Podium <br />
                {this.props.winner}
                <Podium />
              </div>

              <div className="losers-area">Losers!</div>
            </div>

            <div className="chat-comp"></div>
          </div>
          <div className="winner-page-btns">
            <Button className="winner-btns">Play Again</Button>
            <Button className="winner-btns">Leave</Button>
            <Button className="winner-btns">End Tournament</Button>
          </div>
        </main>
      </div>
    );
  }
}

export default Winner;
