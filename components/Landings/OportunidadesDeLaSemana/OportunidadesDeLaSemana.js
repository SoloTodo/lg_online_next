import React from 'react';
import {withLgOnlineTracker} from "../../../utils";
import { connect } from "react-redux";
import {withRouter} from "next/router";
import Head from "next/head";

import ProductBrowseResults from "../../Product/ProductBrowseResults";
import SlideStaticImage from "../../Slides/SlideStaticImage";
import {settings} from "../../../settings";
import NavBar from "../../NavBar/NavBar";


class OportunidadesDeLaSemana extends React.Component {
  render() {
    const productIds = [
      45936,
      48268,
      28125,
      48285,
      50129,
      25905,
      40147,
      37691
    ];

    const filteredProductEntries = this.props.productEntries.filter(
      productEntry => productIds.includes(productEntry.product.id)
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id)
    );

    return <React.Fragment>
      <Head>
        <title key="title">Promoción LG Oportunidades de la Semana</title>
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/oportunidadesdelasemana`} />
        <meta property="og:url" content={`${settings.domain}/oportunidadesdelasemana`} />
        <meta property="og:title" content="Promoción LG Oportunidades de la Semana" />
        <meta name="description" property="og:description" content="Encuentra las mejores oportunidades de la semana LG" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">
        <div className="cyber-slider container" id="banner-slider">
          <SlideStaticImage
            extraSmall={['/static/landings/oportunidades_de_la_semana/generico_350.jpg', '/static/landings/oportunidades_de_la_semana/generico_350_hdpi.jpg']}
            small={['/static/landings/oportunidades_de_la_semana/generico_540.jpg']}
            medium={['/static/landings/oportunidades_de_la_semana/generico_720.jpg']}
            large={['/static/landings/oportunidades_de_la_semana/generico_960.jpg']}
            infinity={['/static/landings/oportunidades_de_la_semana/generico_1140.jpg']}
            desktopHref="/landing?landing=oportunidadesdelasemana"
            desktopAs="/oportunidadesdelasemana"
            mobileHref="/landing?landing=oportunidadesdelasemana"
            mobileAs="/oportunidadesdelasemana"
          />
        </div>
        <ProductBrowseResults filteredProductEntries={filteredProductEntries} />
      </div>
    </React.Fragment>;
  }
}


function mapStateToProps(state) {
  return {
    mediaType: state.browser.mediaType,
    productEntries: state.productEntries
  }
}

function mapPropsToGAField(props) {
  return {
    pageTitle: 'Promoción LG Oportunidades de la Semana',
  }
}

const TrackedOportunidadesDeLaSemana = withLgOnlineTracker(OportunidadesDeLaSemana, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedOportunidadesDeLaSemana))
