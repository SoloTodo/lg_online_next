import React from 'react';
import {withRouter} from 'next/router'
import {withLgOnlineTracker} from "../../../utils";

import { connect } from "react-redux";
import ProductBrowseResults from "../../Product/ProductBrowseResults";
import NavBar from "../../NavBar/NavBar";
import {settings} from "../../../settings";
import Head from "next/head";
import SlideDynamicPrice from "../../Slides/SlideDynamicPrice";
import NextArrow from "../../Slides/NextArrow";
import PrevArrow from "../../Slides/PrevArrow";
import Slider from "react-slick/lib";

class EspecialLavado extends React.Component {
  render() {
    const productIds = [38951, 45904, 41629, 41628, 39410, 38951, 43494, 46743, 37691, 45803, 37994, 42678];
    const filteredProductEntries = this.props.productEntries.filter(
      productEntry => productIds.includes(productEntry.product.id)
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id)
    );

    const slides = [
      {
        id: 'WD9WB6',
        component: <SlideDynamicPrice
          productId={38951}
          desktopHref="/landing?landing=especial_lavado&product=38951"
          desktopAs="/especial_lavado?product=38951"
          extraSmall={['/static/landings/especial_lavado/WD9WB6_350.jpg', '/static/landings/especial_lavado/WD9WB6_350_hdpi.jpg']}
          small={['/static/landings/especial_lavado/WD9WB6_540.jpg']}
          medium={['/static/landings/especial_lavado/WD9WB6_720.jpg']}
          large={['/static/landings/especial_lavado/WD9WB6_960.jpg']}
          infinity={['/static/landings/especial_lavado/WD9WB6_1140.jpg']}
        />
      },
      {
        id: 'WD20VVS6TW',
        component: <SlideDynamicPrice
          productId={41629}
          desktopHref="/landing?landing=especial_lavado&product=41629"
          desktopAs="/especial_lavado?product=41629"
          extraSmall={['/static/landings/especial_lavado/WD20VVS6TW_350.jpg', '/static/landings/especial_lavado/WD20VVS6TW_350_hdpi.jpg']}
          small={['/static/landings/especial_lavado/WD20VVS6TW_540.jpg']}
          medium={['/static/landings/especial_lavado/WD20VVS6TW_720.jpg']}
          large={['/static/landings/especial_lavado/WD20VVS6TW_960.jpg']}
          infinity={['/static/landings/especial_lavado/WD20VVS6TW_1140.jpg']}
        />
      },
      {
        id: 'WT22BSS6',
        component: <SlideDynamicPrice
          productId={42678}
          desktopHref="/landing?landing=especial_lavado&product=42678"
          desktopAs="/especial_lavado?product=42678"
          extraSmall={['/static/landings/especial_lavado/WD22BSS6_350.jpg', '/static/landings/especial_lavado/WD22BSS6_350_hdpi.jpg']}
          small={['/static/landings/especial_lavado/WD22BSS6_540.jpg']}
          medium={['/static/landings/especial_lavado/WD22BSS6_720.jpg']}
          large={['/static/landings/especial_lavado/WD22BSS6_960.jpg']}
          infinity={['/static/landings/especial_lavado/WD22BSS6_1140.jpg']}
        />
      }
    ];

    const sliderSettings = {
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

    return <React.Fragment>
      <Head>
        <title key="title">Promoción LG Especial Lavado</title>
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/instaviewbundle`} />
        <meta property="og:url" content={`${settings.domain}/instaviewbundle`} />
        <meta property="og:title" content="Promoción LG Especial Lavado" />
        <meta name="description" property="og:description" content="Encuentra las mejores ofertas en bundles LG" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">
        <div className="cyber-slider container" id="banner-slider">
          <Slider {...sliderSettings}>
            {slides.map(slide => <div key={slide.id} className="cyber-slide">
              {slide.component}
            </div>)}
          </Slider>
        </div>

        <ProductBrowseResults filteredProductEntries={filteredProductEntries} />
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state) {
  return {
    productEntries: state.productEntries
  }
}

function mapPropsToGAField(props) {
  return {
    pageTitle: 'Promoción LG Especial Lavado',
  }
}

const TrackedEspecialLavado = withLgOnlineTracker(EspecialLavado, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedEspecialLavado))
