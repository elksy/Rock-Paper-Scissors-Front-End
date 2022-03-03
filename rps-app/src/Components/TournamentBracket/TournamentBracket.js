import React from "react";
import Winner from "../WinnerPage/Winner.js";
import DisplayBracket from "./DisplayBracket.js";
import GamePage from "../GamePage/GamePage.js";
import SpectateGame from "./SpectateGame/SpectateGame.js";
import "./tournamentBracket.css";
import Chat from "../Chat/Chat.js";

class TournamentBracket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: "",
      startRound: false,
      hasLost: false,
      rounds: [],
      winner: "",
      currentRound: 0,
      tournamentInfo: {},
      uuid: "",
      spectateGame: "",
    };
  }

  componentDidMount() {
    this.setState({
      tournamentInfo: this.props.location.state.tournamentInfo,
      uuid: this.props.location.state.uuid,
    });
    this.createWebsocket();
  }

  createWebsocket = () => {
    const ws = new WebSocket(
      `ws${
        process.env.REACT_APP_WS_ENDPOINT === "localhost:8080" ? `` : `s`
      }://${process.env.REACT_APP_WS_ENDPOINT}/wsTournament/${
        this.props.location.state.tournamentInfo.id
      }`
    );
    ws.onopen = () => {};
    ws.onmessage = async (e) => {
      const data = JSON.parse(e.data);
      if ("bracket" in data) {
        // this.setState({ rounds: rounds });
        this.setState({ rounds: data.bracket });
        this.checkForWin(data.bracket);
      } else if ("command" in data && data.command === "Start Round") {
        this.setState({ startRound: true });
      }
    };
    ws.onclose = () => {
      ws.send(CloseEvent());
    };
    this.setState({ ws: ws });
  };

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

  startRound = () => {
    if (this.state.winner) {
      return <Winner winner={this.state.winner} rounds={this.state.rounds} />;
    } else if (!this.state.hasLost) {
      const [seed, player, opponent] = this.getMatch();
      if (opponent.name === "BYE" && opponent.uuid === "2255") {
        this.endCurrentRound();
      } else {
        return (
          <GamePage
            seedId={seed}
            opponent={opponent}
            player={player}
            round={this.state.currentRound}
            tournamentInfo={this.state.tournamentInfo}
            tournamentWs={this.state.ws}
            updatePlayerLost={this.updatePlayerLost} //call if player has lost
            endCurrentRound={this.endCurrentRound}
            //tournament data
          />
        );
      }
    } else {
      const [player, opponent] = this.getSpectateMatchInfo();
      console.log(player, opponent);
      return (
        <SpectateGame
          seed={this.state.spectateGame}
          player={player}
          opponent={opponent}
          tournamentInfo={this.state.tournamentInfo}
          endSpectating={this.endSpectating}
          tournamentId={this.state.tournamentInfo.id}
        />
      );
    }
  };

  getMatch = () => {
    const roundData = this.state.rounds[this.state.currentRound].seeds;
    const playerMatch = roundData.filter((match) => {
      return (
        match.teams[0].uuid === this.state.uuid ||
        match.teams[1].uuid === this.state.uuid
      );
    });
    const player = this.getPlayer(playerMatch[0].teams);
    const opponent = this.getOpponent(playerMatch[0].teams);
    const result = [playerMatch[0].id, player, opponent];
    return result;
  };

  getPlayer = (teams) => {
    const [player] = teams.filter((team) => {
      return team.uuid === this.state.uuid;
    });
    return player;
  };

  getOpponent = (teams) => {
    const [opponent] = teams.filter((team) => {
      return team.uuid !== this.state.uuid;
    });
    return opponent;
  };

  getSpectateMatchInfo = () => {
    const seeds = this.state.rounds[this.state.currentRound].seeds;
    const match = seeds.filter((seed) => {
      return seed.id === this.state.spectateGame;
    });
    const player = match[0].teams[0];
    const opponent = match[0].teams[1];
    return [player, opponent];
  };

  updatePlayerLost = () => {
    const seed = this.getSeedFromNextRound();
    this.setState({
      hasLost: true,
      spectateGame: seed,
      startRound: false,
      currentRound: this.state.currentRound + 1,
    });
  };

  endCurrentRound = () => {
    this.setState({
      startRound: false,
      currentRound: this.state.currentRound + 1,
    });
  };

  endSpectating = () => {
    const seed = this.getSeedFromNextRound();
    this.setState({
      startRound: false,
      currentRound: this.state.currentRound + 1,
      spectateGame: seed,
    });
  };

  getSeedFromNextRound = () => {
    if (this.state.currentRound < this.state.rounds.length - 1) {
      const seeds = this.state.rounds[this.state.currentRound + 1].seeds;
      return seeds[0].id;
    } else return "";
  };

  displayBracket = () => {
    return (
      <div>
        {this.state.hasLost &&
          `You have been knocked out the tournament! Please Click on a match in the next round that you wish to spectate!
          Currently Selected: ${this.state.spectateGame}`}
        <DisplayBracket
          rounds={this.state.rounds}
          hasLost={this.state.hasLost}
          updateSpectateGame={this.updateSpectateGame}
          gameSelected={this.state.spectateGame}
          possibleSeeds={this.possibleSeeds()}
        />
      </div>
    );
  };

  updateSpectateGame = (id) => {
    this.setState({ spectateGame: id });
  };

  possibleSeeds = () => {
    if (this.state.currentRound < this.state.rounds.length - 1) {
      const seeds = this.state.rounds[this.state.currentRound].seeds;
      const seedIds = seeds.map((seed) => {
        return seed.id;
      });
      return seedIds;
    } else return [""];
  };

  render() {
    return (
      <div>
        <div className="page-wrapper">
          {this.state.startRound ? this.startRound() : this.displayBracket()}
        </div>
        <Chat
          chatWs={this.props.chatWs}
          playerName={this.props.location.state.playerName}
          playerColour={this.props.location.state.playerColour}
          chatMessages={this.props.chatMessages}
        />
      </div>
    );
  }
}

export default TournamentBracket;
