import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countdown: undefined };
  }

  componentDidMount() {
    this.setState({ countdown: this.props.timer });
    this.timer = setInterval(() => this.tick(), 1000);
  }

  tick() {
    const current = this.state.countdown;
    if (current === 1) {
      clearInterval(this.timer);
      this.setState({ countdown: "Time up!" });
    } else {
      this.setState({ countdown: current - 1 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="timer">
        <span className="dot">
          <h1
            className={`timer-number ${
              this.state.countdown < 4 ? "make-text-red" : null
            }`}
          >
            {this.state.countdown}
          </h1>
        </span>
      </div>
    );
  }
}

export default Timer;
