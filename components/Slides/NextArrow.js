import React, {Component} from "react";

import './NextArrow.css'

export default class NextArrow extends Component {
  render() {
    const {className, onClick} = this.props;

    return <button
      className={`${className} custom-arrow`}
      onClick={onClick}>
      <img src="/static/img/slides/arrow-next.png"  alt="nextArrow" />
    </button>
  }
}