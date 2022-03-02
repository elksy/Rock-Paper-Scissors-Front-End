import React from "react";
import { First } from "react-bootstrap/esm/PageItem";
import podium from "./podium.css";

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
    };
  }
  checkForWin = (rounds) => {
    const finals = rounds[rounds.length - 1].seeds[0];
    if (finals.score[0] !== 0 || finals.score[1] !== 0) {
      const winner =
        finals.score[0] > finals.score[1]
          ? finals.teams[0].name
          : finals.teams[1].name;
      this.setState({ winner: winner });
    }
  };

  podiumRanksOneAndTwo = (rounds) => {
    const finals = rounds[rounds.length - 1].seeds[0];
    if (finals.score[0] !== 0 || finals.score[1] !== 0) {
      if (finals.score[0] > finals.score[1]) {
        this.setState({
          firstPlaceName: finals.teams[0].name,
          firstPlaceColour: finals.team[0].bgColor,
          secondPlaceName: finals.teams[1].name,
          secondPlaceColour: finals.team[1].bgColor,
        });
      } else {
        this.setState({
          firstPlaceName: finals.teams[1].name,
          firstPlaceColour: finals.team[1].bgColor,
          secondPlaceName: finals.teams[0].name,
          secondPlaceColour: finals.team[0].bgColor,
        });
      }
    }
  };

  render() {
    return (
      <div class="container podium">
        <div class="podium__item">
          <p class="podium__city">{this.state.secondPlaceName}</p>
          <div
            class="podium__rank second"
            style={{ backgroundColor: this.state.secon }}
          >
            2
          </div>
        </div>
        <div class="podium__item">
          <p class="podium__city"> {this.state.firstPlaceName}</p>
          <div
            className="podium__rank first"
            // key={i}
            style={{ backgroundColor: this.state.firstPlaceColour }}
          >
            1
          </div>
        </div>
        <div class="podium__item">
          <p class="podium__city">Clermont-Ferrand Essentielle</p>
          <div class="podium__rank third">3</div>
        </div>
      </div>
    );
  }
}

export default Podium;
