import React from "react";

import { Bracket, Seed, SeedItem, SeedTeam } from "react-brackets";

class DisplayBracket extends React.Component {
  handleClick = (id) => {
    if (this.props.hasLost && this.props.possibleSeeds.includes(id)) {
      this.props.updateSpectateGame(id);
    }
  };

  customSeed = ({ seed, breakpoint }) => {
    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 30 }}>
        <SeedItem
          style={{
            background: "white",
            width: "20rem",
            border:
              this.props.gameSelected === seed.id ? "green 5px solid" : "",
          }}
          onClick={() => this.handleClick(seed.id)}
        >
          <div>
            <SeedTeam
              style={{
                color: seed.teams[0].textColor,
                background: seed.teams[0].bgColor,
              }}
            >
              <div className="seed-item">
                <div>{seed.teams[0]?.name || "NO TEAM "}</div>
                <div>{seed.score[0]}</div>
              </div>
            </SeedTeam>
            <SeedTeam
              style={{
                color: seed.teams[1].textColor,
                background: seed.teams[1].bgColor,
              }}
            >
              <div className="seed-item">
                <div>{seed.teams[1]?.name || "NO TEAM "}</div>
                <div>{seed.score[1]}</div>
              </div>{" "}
            </SeedTeam>
          </div>
        </SeedItem>
      </Seed>
    );
  };

  render() {
    return (
      <div>
        <Bracket
          rounds={this.props.rounds}
          renderSeedComponent={this.customSeed}
          bracketClassName="bracket"
          roundClassName="rounds"
          mobileBreakpoint={0}
        />
      </div>
    );
  }
}
export default DisplayBracket;
