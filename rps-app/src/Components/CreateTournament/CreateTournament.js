import React from "react";
import "./createtournament.css";

class CreateTournament extends React.Component {
  render() {
    return (
      <div className="create-tournament-page">
        <header>
          <h1>Create Tournament</h1>
        </header>
        <div className="num-rounds">
          <h3>Number of Rounds</h3>
          <div className="rounds-btns">
            <button type="submit">1</button>
            <button type="submit">3</button>
            <button type="submit">5</button>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateTournament;
