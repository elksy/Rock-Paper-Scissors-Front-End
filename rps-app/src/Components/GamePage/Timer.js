import React from "react";

class Timer extends React.Component {
	constructor() {
		super();
		this.state = {
			seconds: 0,
		};
	}
	componentDidMount() {
		this.setState({ seconds: this.props.timer });
		const sec = this.state.seconds - 1;
		setTimeout(() => this.setState({ seconds: sec }), 1000);
	}
	componentDidUpdate() {
		if (this.state.seconds > 0) {
			const sec = this.state.seconds - 1;
			setTimeout(() => this.setState({ seconds: sec }), 1000);
		} else if (this.state.seconds !== "Time up!") {
			this.setState({ seconds: "Time up!" });
		}
	}
	render() {
		return (
			<div className="timer">
				{/* Need to finds a way to display the timer */}
				<h1>{`Time Left: ${this.state.seconds}`}</h1>
			</div>
		);
	}
}

export default Timer;
