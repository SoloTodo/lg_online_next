import React from "react";


export default class PlanPerfectoPrevArrow extends React.Component {
  render() {
    const {className, onClick} = this.props;

    return <button
      className={`${className}`}
      onClick={onClick}>

      <img src="/static/landings/plan_perfecto/planperfecto_mobile_arrow_left.png" alt="prevArrow" />
    </button>
  }
}