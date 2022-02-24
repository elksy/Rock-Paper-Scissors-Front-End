import React from "react";
import Timer from "./Timer.js";
import Player from "./Player.js";
import Opponent from "./Opponent.js";
import "./gamepage.css";

class GamePage extends React.Component {
   constructor(props) {
      super(props);
      this.state = { ws: "", opponentChoice: "", opponentName: "", choice: "" };
   }

   componentDidMount() {
      this.createWebsocket();
      const choices = ["rock", "paper", "scissors"];
      const randChoice = Math.floor(Math.random() * choices.length);
      this.setState({ choice: choices[randChoice] });
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
         } else if ("opponentChoice" in data) {
            this.setState({ opponentChoice: data.opponentChoice });
         }
      };

      ws.onclose = () => {
         ws.send(CloseEvent());
      };

      this.setState({ ws: ws });
   };

   sendChoice = () => {
      this.state.ws.send({ choice: this.state.choice });
      console.log(this.state.choice);
   };

   setSelectedChoice = (word) => {
      this.setState({ choice: word });
   };

   render() {
      return (
         <div className="game-page">
            <div className="timer-container">
               <Timer timer={5} timeUp={this.sendChoice} />
            </div>

            {/* <span class="dot"></span> */}
            <div className="game-wrapper">
               <Player
                  playerName={this.props.playerName}
                  setSelectedChoice={(word) => this.setSelectedChoice(word)}
               />

               <div className="vertical-line"></div>

               <Opponent name={this.state.opponentName} choice={this.state.opponentChoice} />
            </div>
         </div>
      );
   }
}
export default GamePage;
