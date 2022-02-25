import React from "react";
import Form from "react-bootstrap/Form";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
    };
  }

  handleNameChange = (e) => {
    this.setState({ playerName: e.target.value });
    this.disableButton();
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
          value={this.state.playerName}
          id="email"
          onChange={(e) => this.handleNameChange(e)}
        />
      </Form.Group>
    );
  }
}

export default NameForm;
