import React, {Component} from "react";
import prevArrow from "../../static/img/slides/arrow-prev.png"

import './PrevArrow.css'

export default class PrevArrow extends Component {
  render() {
    const {className, onClick} = this.props;

    return <button
      className={`${className} custom-arrow`}
      onClick={onClick}>
      <img src={prevArrow} alt="prevArrow" />
    </button>
  }
}