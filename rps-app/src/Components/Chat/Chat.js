import React from "react";
import "./chat.css";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }
  handleChange = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessage = () => {
    this.props.chatWs.send(
      JSON.stringify({
        name: this.props.playerName,
        message: this.state.message,
        color: this.props.playerColour,
      })
    );
    this.setState({ message: "" });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  displayMessages = () => {
    const messages = this.props.chatMessages.map((message, key) => {
      return (
        <div className="message" key={key}>
          <span style={{ color: message.color }}>{message.name}:</span>{" "}
          {message.message}
        </div>
      );
    });
    return messages;
  };

  render() {
    return (
      <div>
        {this.props.chatWs ? (
          <div className="chat">
            <input
              type="text"
              className="chat-input"
              placeholder="Hit enter to send chat!"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />

            {this.displayMessages()}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}
export default Chat;
