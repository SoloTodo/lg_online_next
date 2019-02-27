import React from 'react'
import {connect} from 'react-redux'

import Slider from "react-slick";
import NextArrow from "../../Slides/NextArrow";
import PrevArrow from "../../Slides/PrevArrow";

import DidVideoSlide from "./DidVideoSlide";
import { isServer } from '../../../react-utils/utils'

import './DidVideoSlideCarousel.css'

class DidVideoSlideCarousel extends React.Component {
  render() {
    let slidesToShow = 5;

    const conversionTuple = [
      [575, 1],
      [767, 2],
      [991, 3],
      [1199, 4],
    ];

    const pageWidth = isServer ? 600 : window.innerWidth;

    for (const entry of conversionTuple) {
      if (pageWidth <= entry[0]) {
        slidesToShow = entry[1];
        break;
      }
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      nextArrow: <NextArrow/>,
      prevArrow: <PrevArrow/>,
      autoplay: false,
      autoplaySpeed: 3000,
      // variableWidth: true,
      // centerMode: true
    };

    const slidesData = [
      {
        thumbnail: '/static/landings/did/yt_oportunidad_perdida.png',
        caption: 'LG Instaview Door in Door - Oportunidad perdida.',
        youtubeId: 'B5hKJDUs_Hw'
      },
      {
        thumbnail: '/static/landings/did/yt_popularidad_perdida.png',
        caption: 'LG Instaview Door in Door - Popularidad perdida.',
        youtubeId: 'z2YbgyQfwtQ'
      },
      {
        thumbnail: '/static/landings/did/yt_amor_perdido.png',
        caption: 'LG Instaview Door in Door - Amor perdido.',
        youtubeId: 'rL4Tz0NPZSQ'
      },
      {
        thumbnail: '/static/landings/did/yt_caracter_perdido.png',
        caption: 'LG Instaview Door in Door - Carácter perdido.',
        youtubeId: 'nNxopVU784Y'
      },
      {
        thumbnail: '/static/landings/did/yt_esposa_perdida.png',
        caption: 'LG Instaview Door in Door - Esposa perdida.',
        youtubeId: 'qYHVjA5z4s0'
      }
    ];

    return <div className="container mt-3 mb-4 did-video-slide-carousel">
      <Slider {...settings}>
        {slidesData.map(slide => <div key={slide.caption}>
          <DidVideoSlide thumbnail={slide.thumbnail} caption={slide.caption} youtubeId={slide.youtubeId} />
        </div>)}
      </Slider>
    </div>;
  }
}

function mapStateToProps(state) {
    return {
      browser: state.browser
    }
}

export default connect(mapStateToProps)(DidVideoSlideCarousel);