import React from 'react';
import Slider from "react-slick";
import slides from './slides'
import NextArrow from '../Slides/NextArrow'
import PrevArrow from '../Slides/PrevArrow'

export default class Carousel extends React.Component {
  render() {
    const categoryId = this.props.categoryId;
    const subcategory = this.props.subcategory;

    let filteredSlides = [];

    if (subcategory) {
      // Subcategory page
      filteredSlides = slides.filter(slide => slide.subcategory === subcategory.name)
      if (!filteredSlides.length) {
        filteredSlides = slides.filter(slide => slide.categoryId === categoryId)
      }

    } else if (categoryId) {
      // Category page
      filteredSlides = slides.filter(slide => slide.categoryId === categoryId)
    } else {
      // Frontpage
      filteredSlides = slides.filter(slide => slide.frontpageOrdering).sort((a, b) => {
        return a.frontpageOrdering - b.frontpageOrdering
      })
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
      autoplay: false,
      autoplaySpeed: 3000,
    };

    return <div className="cyber-slider container" id="banner-slider">
      <Slider {...settings}>
        {filteredSlides.map(slide => <div key={slide.id} className="cyber-slide">
          {slide.component}
        </div>)}
      </Slider>
    </div>;
  }
}
