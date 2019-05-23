import React from 'react';
import Head from 'next/head';
import {withRouter} from 'next/router'
import { connect } from 'react-redux'
import {
  getImportantCategories
} from "../redux-utils";
import NavBar from "../components/NavBar/NavBar";
import SubcategoryMenu from '../components/SubcategoryMenu/SubcategoryMenu'
import Carousel from "../components/Slides/Carousel";
import ProductBrowseResults from "../components/Product/ProductBrowseResults";
import {withLgOnlineTracker} from "../utils";
import {loadRequiredProducts} from "../redux/actions";
import {settings} from '../settings'
import ErrorPage from "./_error";
import OrderingDropdown from "../components/OrderingDropdown/OrderingDropdown";

class Browse extends React.Component {
  static async getInitialProps(ctx) {
    const { res, query, reduxStore } = ctx;
    const reduxState = reduxStore.getState();
    const productEntries = reduxState.productEntries;

    if (!productEntries) {
      await reduxStore.dispatch(loadRequiredProducts);
    }

    const section = query.section;
    const importantCategories = getImportantCategories(reduxState.apiResourceObjects);

    for (const category of importantCategories) {
      if (category.slug === section) {
        return {
          category,
          subcategory: null,
          title: category.name
        }
      }

      const subcategories = category.subcategories || [];

      for (const subcategory of subcategories) {
        if (subcategory.slug === section) {
          return {
            category,
            subcategory,
            title: subcategory.title
          }
        }
      }
    }

    // Section didn't match any of the category or subcategory slugs
    if (section) {
      if (res) {
        res.statusCode = 404;
        res.end('Not found');
        return
      } else {
        return {
          statusCode: 404
        }
      }
    }

    return {}
  }

  render() {
    if (this.props.statusCode) {
      return <ErrorPage statusCode={this.props.statusCode} />
    }

    const category = this.props.category;
    const categoryId = category ? category.id : undefined;
    const subcategory = this.props.subcategory;

    const subcategoryMenu = <SubcategoryMenu categoryId={categoryId} subcategory={subcategory} />;

    const description = this.props.category ?
      `Cotiza ${this.props.title} LG al mejor precio` :
      'Encuentra las mejores ofertas para todos tus productos LG';

    let path = '/';

    if (subcategory) {
      path += subcategory.slug
    } else if (category) {
      path += category.slug
    }

    return <React.Fragment>
      <Head>
        <title key="title">{this.props.title} - LG Online</title>
        <link rel="canonical" href={`${settings.domain}${path}`} />
        <meta property="og:url" content={`${settings.domain}${path}`} />
        <meta property="og:title" content={this.props.title} />
        <meta property="og:type" content="website" />
        <meta name="description" property="og:description" content={description} />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">
        {this.props.isMobile && subcategoryMenu}
        <Carousel categoryId={categoryId} subcategory={subcategory} />
        {!this.props.isMobile && <div className="d-flex flex-row justify-content-center">
          {subcategoryMenu}
        </div>}

        <div className="container-fluid">
          <div className="d-flex justify-content-end">
            <OrderingDropdown />
          </div>
        </div>

        <ProductBrowseResults categoryId={categoryId} subcategory={subcategory} />
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state, ownProps) {
  const { category, subcategory } = ownProps;

  let title = undefined;
  if (subcategory) {
    title = subcategory.name
  } else if (category) {
    title = category.name
  } else {
    title = 'Cotiza todos tus productos LG en un sólo lugar'
  }

  return {
    isMobile: state.browser.lessThan.medium,
    category,
    subcategory,
    title
  }
}

function mapPropsToGAField(props) {
  const categoryDisplay = props.category ? props.category.name : 'Home';
  let subcategoryDisplay = props.subcategory && props.subcategory.name;

  if (!subcategoryDisplay) {
    if (props.category) {
      subcategoryDisplay = 'Todos'
    } else {
      subcategoryDisplay = 'Home'
    }
  }

  return {
    category: categoryDisplay,
    subcategory: subcategoryDisplay,
    pageTitle: props.title
  }
}

const TrackedBrowse = withLgOnlineTracker(Browse, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedBrowse));