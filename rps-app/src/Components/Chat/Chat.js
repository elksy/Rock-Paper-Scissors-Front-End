import React from "react";

class Chat extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
  }
  handleChange = (event) => {
    this.setState({ message: event.target.value });
  };

  sendMessage = (event) => {
    event.preventDefault();
    this.props.chatWs.send(
      JSON.stringify({
        name: this.props.playerName,
        message: this.state.message,
      })
    );
    this.setState({ message: "" });
  };

  displayMessages = () => {
    console.log(this.props.chatMessages);
    const messages = this.props.chatMessages.map((message, key) => {
      return (
        <div className="message" key={key}>
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
          <div>
            {this.displayMessages()}

            <input
              type="text"
              value={this.state.message}
              onChange={this.handleChange}
            />
            <button onClick={this.sendMessage}>Send</button>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}
export default Chat;
