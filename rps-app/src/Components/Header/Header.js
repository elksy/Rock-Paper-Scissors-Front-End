import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="header-div">
        <p>Welcome {this.props.showPlayerName}</p>
      </div>
    );
  }
}

export default Header;
