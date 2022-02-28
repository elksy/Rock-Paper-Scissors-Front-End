import React from "react";
import Form from "react-bootstrap/Form";

class TournamentIdForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentId: "",
    };
  }

  handleTournIdChange = (e) => {
    this.props.updateTournamentId(e.target.value);
  };

  render() {
    return (
      <Form.Group className="mb-3">
        <Form.Label className="tournament-id-label">Tournament ID</Form.Label>
        <Form.Control
          className="tournament-id-input"
          type="text"
          placeholder="Enter Tournament ID"
          value={this.props.tournamentId}
          id="tournament-id"
          onChange={this.handleTournIdChange}
        />
      </Form.Group>
    );
  }
}

export default TournamentIdForm;
