import React from "react";

export default class LandingPage extends React.Component {
	render() {
		return (
			<div className="landing-page-container">
				<h1>Rock, Paper, Scissors</h1>

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
		);
	}
}
