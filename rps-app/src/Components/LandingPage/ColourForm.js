import React from "react";
import Form from "react-bootstrap/Form";

class ColourForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerColour: undefined,
    };
  }

  handleColourChange = (e) => {
    this.setState({ playerColour: e.target.value });
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
        <Form.Label className="colour-label">Choose a colour</Form.Label>
        <Form.Control
          className="colour-input"
          type="color"
          value={this.state.playerColour}
          id="colour"
          onChange={(e) => this.handleColourChange(e)}
        />
      </Form.Group>
    );
  }
}

export default ColourForm;
