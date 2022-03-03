import React from "react";
import Form from "react-bootstrap/Form";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNameChange = (e) => {
    this.props.updatePlayerName(e.target.value);
    this.disableButton(e.target.value);
  };

  disableButton = (playerName) => {
    if (playerName.length > 2 && this.props.playerColour) {
      this.props.updateDisabledButton(false);
    } else {
      this.props.updateDisabledButton(true);
    }
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="username-label">Username</Form.Label>
        <Form.Control
          data-testid="username-input-area"
          className="username-input"
          type="text"
          placeholder="Enter nickname"
          value={this.props.playerName}
          id="email"
          onChange={this.handleNameChange}
        />
      </Form.Group>
    );
  }
}

export default NameForm;
