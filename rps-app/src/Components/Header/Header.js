import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const headerstyle = {
      background: `${this.props.playerColour}`,
      padding: "1rem 8rem 1rem",
      width: "65vw",
      margin: "2rem auto",
      color: "black",
      fontWeight: "bold",
      borderRadius: "20px",
    };

    return (
      <div className="header-div" style={headerstyle}>
        <p>Welcome {this.props.showPlayerName}</p>
      </div>
    );
  }
}

export default Header;
