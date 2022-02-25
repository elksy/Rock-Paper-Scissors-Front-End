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

  handleColourChange = (colour) => {
    this.setState({ playerColour: colour.hex });
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="colour-label">Choose a colour</Form.Label>
        <CirclePicker
          className="colour-input"
          id="colour"
          color={this.state.playerColour}
          onChange={this.handleColourChange}
          value={this.state.playerColour}
        />
      </Form.Group>
    );
  }
}

export default ColourForm;
