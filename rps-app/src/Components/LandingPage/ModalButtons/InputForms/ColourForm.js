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
      <Form.Group className="colour-picker">
        <Form.Label className="form-title">Choose a colour</Form.Label>
        <CirclePicker
          color={this.props.playerColour}
          onChange={this.updatePlayerColour}
          value={this.props.playerColour}
        />
      </Form.Group>
    );
  }
}

export default ColourForm;
