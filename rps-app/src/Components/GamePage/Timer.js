import React from "react";

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = { countdown: undefined };
	}

	tick() {
		const current = this.state.countdown;
		if (current === 1) {
			clearInterval(this.timer);
			this.setState({ countdown: "Time up!" });
			this.props.timeUp();
		} else {
			this.setState({ countdown: current - 1 });
		}
	}

	componentDidMount() {
		this.setState({ countdown: this.props.timer });
		this.timer = setInterval(() => this.tick(), 1000);
	}

	render() {
		return (
			<div className="timer">
				{/* Need to finds a way to display the timer */}
				<h1>{`Time Left: ${this.state.countdown}`}</h1>
			</div>
		);
	}
}

export default Timer;
