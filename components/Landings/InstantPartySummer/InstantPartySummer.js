import React from 'react';
import {withLgOnlineTracker} from "../../../utils";
import { connect } from "react-redux";

import ProductBrowseResults from "../../Product/ProductBrowseResults";
import SlideDynamicPrice from "../../Slides/SlideDynamicPrice";
import NextArrow from "../../Slides/NextArrow";
import PrevArrow from "../../Slides/PrevArrow";
import Slider from "react-slick";

import Head from "next/head";
import {withRouter} from "next/router";
import NavBar from "../../NavBar/NavBar";


class InstantPartySummer extends React.Component {
  render() {
    const productIds = [48266, 48003, 48267, 45942, 45944, 45946];
    const filteredProductEntries = this.props.productEntries.filter(
      productEntry => productIds.includes(productEntry.product.id)
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id)
    );

    const slides = [
      {
        id: 'PK5',
        component: <SlideDynamicPrice
          productId={48003}
          desktopHref="/landing?landing=instantpartysummer&product=48003"
          desktopAs="/instantpartysummer?product=48003"
          extraSmall={['/static/landings/instant_party_summer/01_350.jpg', '/static/landings/instant_party_summer/01_350_hdpi.jpg']}
          small={['/static/landings/instant_party_summer/01_540.jpg']}
          medium={['/static/landings/instant_party_summer/01_720.jpg']}
          large={['/static/landings/instant_party_summer/01_960.jpg']}
          infinity={['/static/landings/instant_party_summer/01_1140.jpg']}
          className="instantpartysummer__dynamic-banner"
        />
      },
      {
        id: 'OK99',
        component: <SlideDynamicPrice
          productId={45946}
          desktopHref="/landing?landing=instantpartysummer&product=45946"
          desktopAs="/instantpartysummer?product=45946"
          extraSmall={['/static/landings/instant_party_summer/02_350.jpg', '/static/landings/instant_party_summer/02_350_hdpi.jpg']}
          small={['/static/landings/instant_party_summer/02_540.jpg']}
          medium={['/static/landings/instant_party_summer/02_720.jpg']}
          large={['/static/landings/instant_party_summer/02_960.jpg']}
          infinity={['/static/landings/instant_party_summer/02_1140.jpg']}
          className="instantpartysummer__dynamic-banner"
        />
      },
      {
        id: 'PK3',
        component: <SlideDynamicPrice
          productId={48266}
          desktopHref="/landing?landing=instantpartysummer&product=48266"
          desktopAs="/instantpartysummer?product=48266"
          extraSmall={['/static/landings/instant_party_summer/03_350.jpg', '/static/landings/instant_party_summer/03_350_hdpi.jpg']}
          small={['/static/landings/instant_party_summer/03_540.jpg']}
          medium={['/static/landings/instant_party_summer/03_720.jpg']}
          large={['/static/landings/instant_party_summer/03_960.jpg']}
          infinity={['/static/landings/instant_party_summer/03_1140.jpg']}
          className="instantpartysummer__dynamic-banner"
        />
      },
      {
        id: 'PK7',
        component: <SlideDynamicPrice
          productId={48267}
          desktopHref="/landing?landing=instantpartysummer&product=48267"
          desktopAs="/instantpartysummer?product=48267"
          extraSmall={['/static/landings/instant_party_summer/04_350.jpg', '/static/landings/instant_party_summer/04_350_hdpi.jpg']}
          small={['/static/landings/instant_party_summer/04_540.jpg']}
          medium={['/static/landings/instant_party_summer/04_720.jpg']}
          large={['/static/landings/instant_party_summer/04_960.jpg']}
          infinity={['/static/landings/instant_party_summer/04_1140.jpg']}
          className="instantpartysummer__dynamic-banner"
        />
      },
      {
        id: 'OK99_2',
        component: <SlideDynamicPrice
          productId={45946}
          desktopHref="/landing?landing=instantpartysummer&product=45946"
          desktopAs="/instantpartysummer?product=45946"
          extraSmall={['/static/landings/instant_party_summer/05_350.jpg', '/static/landings/instant_party_summer/05_350_hdpi.jpg']}
          small={['/static/landings/instant_party_summer/05_540.jpg']}
          medium={['/static/landings/instant_party_summer/05_720.jpg']}
          large={['/static/landings/instant_party_summer/05_960.jpg']}
          infinity={['/static/landings/instant_party_summer/05_1140.jpg']}
          className="instantpartysummer__dynamic-banner"
        />
      },
      {
        id: 'OK99_3',
        component: <SlideDynamicPrice
          productId={45946}
          desktopHref="/landing?landing=instantpartysummer&product=45946"
          desktopAs="/instantpartysummer?product=45946"
          extraSmall={['/static/landings/instant_party_summer/06_350.jpg', '/static/landings/instant_party_summer/06_350_hdpi.jpg']}
          small={['/static/landings/instant_party_summer/06_540.jpg']}
          medium={['/static/landings/instant_party_summer/06_720.jpg']}
          large={['/static/landings/instant_party_summer/06_960.jpg']}
          infinity={['/static/landings/instant_party_summer/06_1140.jpg']}
          className="instantpartysummer__dynamic-banner"
        />
      },
    ];

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

    return <React.Fragment>
      <Head>
        <title key="title">Promoción LG Instant Party Summer - LG Online</title>

        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${settings.domain}/instantpartysummer`} />
        <meta property="og:title" content="Promoción LG Instant Party Summer" />
        <meta property="og:description" content="Promoción LG Instant Party Summer" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">
        <div className="cyber-slider container" id="banner-slider">
          <Slider {...settings}>
            {slides.map(slide => <div key={slide.id} className="cyber-slide">
              {slide.component}
            </div>)}
          </Slider>
        </div>
        <ProductBrowseResults filteredProductEntries={filteredProductEntries} />
      </div>
    </React.Fragment>;
  }
}


function mapStateToProps(state) {
  return {
    productEntries: state.productEntries
  }
}

function mapPropsToGAField(props) {
  return {
    pageTitle: 'Promoción LG Instant Party Summer',
  }
}

const TrackedInstantPartySummer = withLgOnlineTracker(InstantPartySummer, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedInstantPartySummer))