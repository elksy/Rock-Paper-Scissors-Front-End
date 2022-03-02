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
      <Form.Group className="name-input">
        <Form.Label className="form-title">Username</Form.Label>
        <Form.Control
          data-testid="username-input-area"
          type="text"
          placeholder="Enter nickname"
          value={this.props.playerName}
          onChange={this.handleNameChange}
        />
      </Form.Group>
    );
  }
}

export default NameForm;
