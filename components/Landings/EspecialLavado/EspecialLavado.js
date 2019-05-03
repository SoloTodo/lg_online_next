import React from 'react';
import {withRouter} from 'next/router'
import {withLgOnlineTracker} from "../../../utils";

import { connect } from "react-redux";
import ProductBrowseResults from "../../Product/ProductBrowseResults";
import NavBar from "../../NavBar/NavBar";
import {settings} from "../../../settings";
import Head from "next/head";

class EspecialLavado extends React.Component {
  render() {
    const productIds = [38951, 45904, 41629, 41628, 39410, 38951, 43494, 46743, 37691, 45803, 37994, 42678];
    const filteredProductEntries = this.props.productEntries.filter(
      productEntry => productIds.includes(productEntry.product.id)
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id)
    );

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
        <div className="d-flex justify-content-center">
          <picture>
            <source media="(max-width: 575px)"
                    srcSet="/static/landings/neochef/Neochef-350.jpg, /static/landings/neochef/Neochef-350-hdpi.jpg 2x" />
            <source media="(max-width: 767px)"
                    srcSet="/static/landings/neochef/Neochef-540.jpg" />
            <source media="(max-width: 991px)"
                    srcSet="/static/landings/neochef/Neochef-720.jpg" />
            <source media="(max-width: 1199px)"
                    srcSet="/static/landings/neochef/Neochef-960.jpg" />
            <source media="(max-width: 10000px)"
                    srcSet="/static/landings/neochef/Neochef-1140.jpg" />
            <img src="/static/landings/neochef/Neochef-350.jpg" />
          </picture>
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
