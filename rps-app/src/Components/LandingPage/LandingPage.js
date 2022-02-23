import React from "react";
import "./LandingPage.css";
import PGButton from "./PGButton";
import JTButton from "./JTButton";
import CTButton from "./CTButton";

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showJoinModal: false,
    };
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <div>
        <div>
          <div className="landing-page-container">
            <h1>Rock, Paper, Scissors</h1>

            <div className="menu-button-container">
              <PGButton />
              <JTButton />
              <CTButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
