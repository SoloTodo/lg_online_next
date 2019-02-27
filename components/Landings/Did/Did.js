import React from 'react';
import {withLgOnlineTracker} from "../../../utils";

import {connect} from "react-redux";
import ProductBrowseResults from "../../Product/ProductBrowseResults";
import DidVideoSlideCarousel from "./DidVideoSlideCarousel";
import {withRouter} from "next/router";
import {settings} from "../../../settings";
import Head from "next/head";
import NavBar from "../../NavBar/NavBar";

class Did extends React.Component {
  render() {
    const productIds = [52895, 52892, 52934, 52896, 39205, 50059, 39206, 39883];
    const filteredProductEntries = this.props.productEntries.filter(
      productEntry => productIds.includes(productEntry.product.id)
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id)
    );

    return <React.Fragment>
      <Head>
        <title key="title">Promoción LG Door-in-Door - LG Online</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${settings.domain}/did`} />
        <meta property="og:title" content="Promoción LG Door-in-Door" />
        <meta property="og:description" content="Encuentra las mejores ofertas en Refrigeradores Door-in-Door LG" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">
        <div className="d-flex justify-content-center">
          <picture>
            <source media="(max-width: 575px)"
                    srcSet="/static/landings/did/Did-350.png, /static/landings/did/Did-350_hdpi.png 2x" />
            <source media="(max-width: 767px)"
                    srcSet="/static/landings/did/Did-540.png" />
            <source media="(max-width: 991px)"
                    srcSet="/static/landings/did/Did-720.png" />
            <source media="(max-width: 1199px)"
                    srcSet="/static/landings/did/Did-960.png" />
            <source media="(max-width: 10000px)"
                    srcSet="/static/landings/did/Did-1140.png" />
            <img src="/static/landings/did/Did-350.png" />
          </picture>
        </div>
        <DidVideoSlideCarousel />
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
    pageTitle: 'Promoción LG Door-in-Door',
  }
}

const TrackedDid = withLgOnlineTracker(Did, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedDid))
