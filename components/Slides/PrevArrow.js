import React, {Component} from "react";

export default class PrevArrow extends Component {
  render() {
    const {className, onClick} = this.props;

    return <button
      className={`${className} custom-arrow`}
      onClick={onClick}>
      <img src="/static/img/slides/arrow-prev.png" alt="prevArrow" />
    </button>
  }
}