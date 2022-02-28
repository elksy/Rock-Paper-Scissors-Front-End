import React from "react";
import Form from "react-bootstrap/Form";
import { CirclePicker } from "react-color";

class ColourForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleColourChange = (e) => {
    this.props.updatePlayerColour(e.target.value);
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="colour-label">Choose a colour</Form.Label>
        <CirclePicker
          className="colour-input"
          id="colour"
          playerColour={this.props.playerColour}
          onChange={this.handleColourChange}
          value={this.props.playerColour}
        />
      </Form.Group>
    );
  }
}

export default ColourForm;
