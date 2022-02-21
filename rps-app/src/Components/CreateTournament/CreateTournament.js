import React from "react";

class CreateTournament extends React.Component {
  render() {
    return (
      <div className="create-tournament-page">
        <header>Create Tournament</header>
        <div className="num-rounds">
          <h5>Number of Rounds</h5>
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
