import React from 'react';
import {connect} from 'react-redux';
import * as Fuse from 'fuse.js';
import ProductBrowseResults from "../components/Product/ProductBrowseResults";
import {withRouter} from 'next/router';
import Head from 'next/head';


import NavBar from "../components/NavBar/NavBar";
import {withLgOnlineTracker} from "../utils";
import {loadRequiredProducts} from "../redux/actions";

class Search extends React.Component {
  static async getInitialProps(ctx) {
    const { req, res, query, reduxStore } = ctx;
    const productEntries = reduxStore.getState().productEntries;

    if (!productEntries) {
      await reduxStore.dispatch(loadRequiredProducts);
    }

    return {}
  }

  render() {
    const search = this.props.router.query.search || '';
    const options = {
      keys: [
          'product.specs.keywords',
          'customFields.customTitle',
          'customFields.customDescription',
          'customFields.subcategory',
      ],
    };

    const fuse = new Fuse(this.props.productEntries, options);
    const filteredProductEntries = fuse.search(search);

    const content = filteredProductEntries.length ?
      <ProductBrowseResults filteredProductEntries={filteredProductEntries} /> :
      <div className="container">
        <div className="search__no-results">
          No hemos encontrado resultados para tu búsqueda ¡lo sentimos!.
          Puedes usar el menú superior para seguir navegando por las categorías de LG Online
        </div>
      </div>;

    return <React.Fragment>
      <Head>
        <title key="title">Búsqueda: {search} - LG Online</title>
      </Head>

      <NavBar />

      <div id="content">
        {content}
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
    pageTitle: 'Búsqueda'
  }
}

const TrackedSearch = withLgOnlineTracker(Search, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedSearch));