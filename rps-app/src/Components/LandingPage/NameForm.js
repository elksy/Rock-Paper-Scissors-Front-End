import React from "react";
import Form from "react-bootstrap/Form";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleNameChange = (e) => {
    this.disableButton();
    this.props.updatePlayerName(e.target.value);
  };

  disableButton = () => {
    if (this.state.playerName.length > 2) {
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
