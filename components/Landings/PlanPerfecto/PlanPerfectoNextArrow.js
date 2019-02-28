import React from "react";

export default class PlanPerfectoNextArrow extends React.Component {
  render() {
    const {className, onClick} = this.props;

    return <button
      className={`${className}`}
      onClick={onClick}>

      <img src="/static/landings/plan_perfecto/planperfecto_mobile_arrow_right.png" alt="Next arrow" />
    </button>
  }
}