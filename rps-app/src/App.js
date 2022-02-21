import React from "react";
import Lobby from "./Components//Lobby/Lobby.js";
import "./App.css";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Lobby />
        <CreateTournament />
      </div>
    );
  }
}

export default App;
