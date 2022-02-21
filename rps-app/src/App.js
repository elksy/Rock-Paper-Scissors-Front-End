import React from "react";
import Lobby from "./Components//Lobby/Lobby.js";
import "./App.css";
import CreateTournament from "./Components/CreateTournament/CreateTournament.js";
import LandingPage from "./Components/LandingPage/LandingPage";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Lobby />
				<CreateTournament />
				<LandingPage />
			</div>
		);
	}
}

export default App;
