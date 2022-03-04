import React from "react";
import "./winner.css";
import { Button } from "react-bootstrap";
import Podium from "./Podium/Podium.js";

import { Redirect } from "react-router-dom";

class Winner extends React.Component {
  constructor() {
    super();
    this.state = { leave: false };
    this.timeout = undefined;
  }

  componentDidMount() {
    this.timeout = setTimeout(this.endTournament, 30000);
  }

  componentWillUnmount() {
    if (!this.state.leave) {
      this.endTournament();
    }
  }

  endTournament = () => {
    // send close info to webcsocket
    this.props.tournamentWs.close();
    this.props.chatWs.close();
    this.setState({ leave: true });
    clearTimeout(this.timeout);
  };

  render() {
    return (
      <div className="winner-page">
        <header className="winner-title">
          <h1 className="winner-title">Tournament Complete!</h1>
        </header>
        <main>
          <div className="winner-comps">
            <div className="winners-div">
              <div className="winners-area">
                <p className="winners-podium-title"> Winners Podium </p>
                <Podium winner={this.props.winner} rounds={this.props.rounds} />
              </div>

              <div className="losers-area" rounds={this.props.rounds}>
                Losers!
                {this.listOfLosers(this.props.rounds)}
              </div>
            </div>

            <div className="chat-comp"></div>
          </div>
          <div className="winner-page-btns">
            <Button onClick={this.endTournament} className="winner-btns">
              Leave
            </Button>
          </div>
          {this.state.leave && (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  leaveReason: "The tournament has concluded",
                },
              }}
            />
          )}
        </main>
      </div>
    );
  }

  listOfLosers(rounds) {
    if (rounds.length < 3) {
      return [];
    } else {
      const losers = [];
      const topFourUuid = [];
      for (const match of rounds[rounds.length - 2].seeds) {
        topFourUuid.push(match.teams[0].uuid);
        topFourUuid.push(match.teams[1].uuid);
      }
      for (const match of rounds[0].seeds) {
        if (
          topFourUuid.includes(match.teams[0].uuid) ||
          match.teams[0].uuid === "2255"
        ) {
        } else {
          losers.push(match.teams[0].name);
        }
        if (
          topFourUuid.includes(match.teams[1].uuid) ||
          match.teams[1].uuid === "2255"
        ) {
        } else {
          losers.push(match.teams[1].name);
        }
      }
      return losers;
    }
  }
}

export default Winner;
