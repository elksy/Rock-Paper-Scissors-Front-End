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
    console.log(this.props.chatMessages);
    const messages = this.props.chatMessages.map((message, key) => {
      return (
        <div className="message" key={key} style={{ color: message.color }}>
          {message.name}: {message.message}
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
            {/* <h3 className="chat-title">Tournament Chat</h3> */}
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
