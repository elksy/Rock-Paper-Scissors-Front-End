import React from "react";
import Form from "react-bootstrap/Form";
import { CirclePicker } from "react-color";

class ColourForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerColour: "#fff",
    };
  }

  updatePlayerColour = async (playerColour) => {
    await this.props.updatePlayerColour(playerColour);
    if (this.props.playerColour && this.props.playerName.length > 2) {
      this.props.updateDisabledButton(false);
    } else {
      this.props.updateDisabledButton(true);
    }
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="colour-label">Choose a colour</Form.Label>
        <CirclePicker
          className="colour-input"
          id="colour"
          color={this.props.playerColour}
          onChange={this.updatePlayerColour}
          value={this.props.playerColour}
        />
      </Form.Group>
    );
  }
}

export default ColourForm;
