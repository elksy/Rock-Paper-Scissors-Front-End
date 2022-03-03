import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getDataFromCookies();
  }

  getDataFromCookies() {
    const cookies = document.cookie;
    const regex = new RegExp("(^| )playerName=([^;]+)");
    if (regex.test(cookies)) {
      const result = cookies.match(regex)[2];
      this.setState({ playerName: result });
    }
  }

  render() {
    return (
      <div className="header-div">
        <p>Welcome {this.state.playerName}</p>
      </div>
    );
  }
}

export default Header;
