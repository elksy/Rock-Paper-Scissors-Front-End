import React from "react";
import "./createtournament.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
          <div className="time-limit-rounds">
            <h5>Time limit for each round</h5>
            <div className="time-btns">
              <button type="submit">5 sec</button>
              <button type="submit">10 sec</button>
              <button type="submit">15 sec</button>
            </div>
          </div>
          <div className="bot-inc">
            <h5>Fill blank players with bots</h5>
            <div className="box-btns">
              <Form.Check type="checkbox" />
            </div>
          </div>
          <div className="tourn-types">
            <h5>Tournament Type</h5>
            <div className="tourn-btns">
              <button type="submit">Knockout</button>
              <button type="submit">Points</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateTournament;
