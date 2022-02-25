import React from "react";
import Form from "react-bootstrap/Form";

class TournamentIdForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
    };
  }

  handleChange = (e) => {
    this.setState({ playerJoined: e.target.value });
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="tournament-id-label">Tournament ID</Form.Label>
        <Form.Control
          className="tournament-id-input"
          type="text"
          placeholder="Enter Tournament ID"
          value={this.state.tournamentId}
          id="tournament-id"
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  }
}

export default TournamentIdForm;
