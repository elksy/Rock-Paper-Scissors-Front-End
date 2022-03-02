import React from "react";
import podium from "./podium.css";

class Podium extends React.Component {
  render() {
    return (
      <div class="container podium">
        <div class="podium__item">
          <p class="podium__city">Annecy</p>
          <div class="podium__rank second">2</div>
        </div>
        <div class="podium__item">
          <p class="podium__city">Saint-Gervais</p>
          <div class="podium__rank first">1</div>
        </div>
        <div class="podium__item">
          <p class="podium__city">Clermont-Ferrand Essentielle</p>
          <div class="podium__rank third">3</div>
        </div>
      </div>
    );
  }
}

export default Podium;
