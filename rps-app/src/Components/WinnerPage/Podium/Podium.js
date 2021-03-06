import React from "react";
import "./podium.css";

class Podium extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPlaceName: "",
      firstPlaceColour: "",
      secondPlaceName: "",
      secondPlaceColour: "",
      thirdPlaceName: "",
      thirdPlaceColour: "",
      alsoThirdPlaceName: "",
      alsoThirdPlaceColour: "",
    };
  }

  componentDidMount() {
    this.podiumRanksOneAndTwo(this.props.rounds);
    if (this.props.rounds.length !== 1) {
      this.podiumRankThree(this.props.rounds);
      this.alsoPodiumRankThree(this.props.rounds);
    }
  }

  podiumRanksOneAndTwo = (rounds) => {
    const finals = rounds[rounds.length - 1].seeds[0];
    if (finals.score[0] !== 0 || finals.score[1] !== 0) {
      if (finals.score[0] > finals.score[1]) {
        this.setState({
          firstPlaceName: finals.teams[0].name,
          firstPlaceColour: finals.teams[0].bgColor,
          secondPlaceName: finals.teams[1].name,
          secondPlaceColour: finals.teams[1].bgColor,
        });
      } else {
        this.setState({
          firstPlaceName: finals.teams[1].name,
          firstPlaceColour: finals.teams[1].bgColor,
          secondPlaceName: finals.teams[0].name,
          secondPlaceColour: finals.teams[0].bgColor,
        });
      }
    }
  };

  podiumRankThree = (rounds) => {
    const semiFinals = rounds[rounds.length - 2].seeds[0];
    if (semiFinals.score[0] !== 0 || semiFinals.score[1] !== 0) {
      if (semiFinals.score[0] < semiFinals.score[1]) {
        this.setState({
          thirdPlaceName: semiFinals.teams[0].name,
          thirdPlaceColour: semiFinals.teams[0].bgColor,
        });
      } else {
        this.setState({
          thirdPlaceName: semiFinals.teams[1].name,
          thirdPlaceColour: semiFinals.teams[1].bgColor,
        });
      }
    }
  };

  alsoPodiumRankThree = (rounds) => {
    const semiFinals = rounds[rounds.length - 2].seeds[1];
    if (semiFinals.score[0] !== 0 || semiFinals.score[1] !== 0) {
      if (semiFinals.score[0] < semiFinals.score[1]) {
        this.setState({
          alsoThirdPlaceName: semiFinals.teams[0].name,
          alsoThirdPlaceColour: semiFinals.teams[0].bgColor,
        });
      } else {
        this.setState({
          alsoThirdPlaceName: semiFinals.teams[1].name,
          alsoThirdPlaceColour: semiFinals.teams[1].bgColor,
        });
      }
    }
  };

  renderFirstAndSecond() {
    return (
      <div className="first-second">
        <div className="podium__item">
          <p className="podium__city">{this.state.secondPlaceName}</p>
          <div
            className="podium__rank second"
            id="podium-rank-second"
            style={{ backgroundColor: this.state.secondPlaceColour }}
          >
            2
          </div>
        </div>
        <div className="podium__item">
          <p className="podium__city">{this.state.firstPlaceName}</p>
          <div
            className="podium__rank first"
            id="podium-rank-first"
            style={{ backgroundColor: this.state.firstPlaceColour }}
          >
            1
          </div>
        </div>
      </div>
    );
  }

  renderThird() {
    if (this.state.thirdPlaceName !== "") {
      return (
        <div className="podium__item">
          <p className="podium__city">
            {this.state.thirdPlaceName} <br /> {this.state.alsoThirdPlaceName}
          </p>
          <div className="podium__rank third" id="podium-rank-third">
            {" "}
            <div
              className="podium-rank-3a"
              style={{ backgroundColor: this.state.thirdPlaceColour }}
            ></div>
            <p className="three">3</p>
            <div
              className="podium-rank-3b"
              style={{ backgroundColor: this.state.alsoThirdPlaceColour }}
            ></div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container podium" id="podium-container">
        {this.renderFirstAndSecond()}
        {this.renderThird()}
      </div>
    );
  }
}

export default Podium;
