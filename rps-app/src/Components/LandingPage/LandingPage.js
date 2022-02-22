import React from "react";
import "./LandingPage.css";

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page-container">
        <h1>Rock, Paper, Scissors</h1>

        <div className="menu-button-container">
          <button type="submit" className="menu-button">
            Play Game
          </button>
          <button type="submit" className="menu-button">
            Join Tournament
          </button>
          <button type="submit" className="menu-button">
            Create Tournament
          </button>
        </div>
      </div>
    );
  }
}
