import React from "react";
import Timer from "./Timer.js";
import Player from "./Player.js";
import Opponent from "./Opponent.js";
import "./gamepage.css";

class GamePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ws: "", opponentChoice: "", opponentName: "" };
	}

	componentDidMount() {
		this.createWebsocket();
		// Get this data using a fetch request
		const data = { host: 1234, rounds: 3 };
		this.setState({ tournamentInfo: data });
	}

	createWebsocket = () => {
		const ws = new WebSocket("ws://localhost:8080/wsgame");

		ws.onopen = () => {
			console.log("connected");
		};

		ws.onmessage = (e) => {
			console.log(e);
			const data = JSON.parse(e.data);
			if ("opponentName" in data) {
				console.log(data);
				this.setState({ opponentName: data.opponentName });
			}
		};

		ws.onclose = () => {
			ws.send(CloseEvent());
		};

		this.setState({ ws: ws });
	};

	sendAction = () => {
		this.state.ws.send({ action: "test" });
	};

	render() {
		return (
			<div className="game-page">
				<Timer timer={20} timeUp={this.sendAction} />
				<div className="game-wrapper">
					<Player />
					<Opponent name={this.state.opponentName} choice={this.state.opponentChoice} />
				</div>
			</div>
		);
	}
}
export default GamePage;
