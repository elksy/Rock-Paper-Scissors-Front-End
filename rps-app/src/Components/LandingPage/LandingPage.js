import React from "react";
import "./LandingPage.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.showModal}
          onHide={() => {
            this.handleModal();
          }}
          class="modal-dialog modal-dialog-centered"
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Nickname</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="form" /* onSubmit={(e) => this.handleSubmit(e)} */>
              <Form.Group className="mb-3">
                <Form.Label className="username-label">Username</Form.Label>
                <Form.Control
                  className="username-input"
                  type="text"
                  placeholder="Enter nickname"
                  // value={this.state.username}
                  id="email"
                  // onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>
              <Button className="example" variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <div>
          <div className="landing-page-container">
            <h1>Rock, Paper, Scissors</h1>

            <div className="menu-button-container">
              <Button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  this.handleModal();
                }}
              >
                Play Game
              </Button>
              <Button type="submit" className="btn btn-primary">
                Join Tournament
              </Button>
              <Button type="submit" className="btn btn-primary">
                Create Tournament
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
