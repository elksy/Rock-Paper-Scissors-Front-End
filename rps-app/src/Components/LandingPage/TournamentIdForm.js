import React from "react";
import Form from "react-bootstrap/Form";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class TournamentIdForm extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor(props) {
    const { cookies } = props;
    super(props);
    this.state = {
      playerName: "",
      playerColour: undefined,
      showModal: false,
      showJoinModal: false,
      redirect: false,
      disableButton: true,
      tournamentId: "",
      playerJoined: cookies.get("sessionId") ? true : false,
    };
  }

  handleChange = (e) => {
    this.setState({ playerJoined: e.target.value });
    this.disableButton();
  };

  disableButton = () => {
    if (this.state.playerName.length > 2) {
      this.setState({ disableButton: !this.disableButton });
    } else {
      this.setState({ disableButton: true });
    }
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

export default withCookies(TournamentIdForm);
