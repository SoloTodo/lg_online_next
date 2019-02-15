import React, {Component} from "react";
import nextArrow from "../../static/img/slides/arrow-next.png"

import './NextArrow.css'

export default class NextArrow extends Component {
  render() {
    const {className, onClick} = this.props;

    return <button
      className={`${className} custom-arrow`}
      onClick={onClick}>
      <img src={nextArrow}  alt="nextArrow" />
    </button>
  }
}