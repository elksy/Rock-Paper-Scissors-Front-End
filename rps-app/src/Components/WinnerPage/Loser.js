import React from "react";
import "./Loser.css";

class Loser extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="loser" style={{ backgroundColor: this.props.bgColor }}>
        <p className="loser-name">😢 {this.props.name} 😢</p>
      </div>
    );
  }
}
export default Loser;
