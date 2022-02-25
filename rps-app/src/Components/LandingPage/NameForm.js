import React from "react";
import Form from "react-bootstrap/Form";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class NameForm extends React.Component {
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

  disableButton = () => {
    if (this.state.playerName.length > 2) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  handleChange = (e) => {
    this.setState({ playerName: e.target.value });
    this.disableButton();
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
          onChange={(e) => this.handleChange(e)}
        />
      </Form.Group>
    );
  }
}

export default withCookies(NameForm);
