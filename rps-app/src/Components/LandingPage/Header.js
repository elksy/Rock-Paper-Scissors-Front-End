import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header-buttons">
        <div id="home-logout-btn">
          <p>Welcome {this.props.showPlayerName}</p>
        </div>
      </div>
    );
  }
}

export default Header;
