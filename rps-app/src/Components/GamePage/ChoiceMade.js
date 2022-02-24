import React from "react";
import rock from ".//images/rock.png";
import paper from ".//images/paper.png";
import scissors from ".//images/scissors.png";

class ChoiceMade extends React.Component {
   loadImage = () => {
      if (this.props.selection === "rock") {
         return <img className="selected-image" src={rock} alt="rock" />;
      } else if (this.props.selection === "paper") {
         return <img className="selected-image" src={paper} alt="paper" />;
      } else if (this.props.selection === "scissors") {
         return <img className="selected-image" src={scissors} alt="scissors" />;
      }
   };

   render() {
      return <div className="selected-div">{this.loadImage()}</div>;
   }
}

export default ChoiceMade;
