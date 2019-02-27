import React from 'react';
import Head from 'next/head';
import {withRouter} from 'next/router'
import { connect } from 'react-redux'
import {lgonlineStateToPropsUtils} from "../redux-utils";
import NavBar from "../components/NavBar/NavBar";
import SubcategoryMenu from '../components/SubcategoryMenu/SubcategoryMenu'
import Carousel from "../components/Slides/Carousel";
import ProductBrowseResults from "../components/Product/ProductBrowseResults";
import {withLgOnlineTracker} from "../utils";
import {loadRequiredProducts} from "../redux/actions";
import {settings} from '../settings'

class Browse extends React.Component {
  static async getInitialProps(ctx) {
    const { req, res, query, reduxStore } = ctx;
    const productEntries = reduxStore.getState().productEntries;

    if (!productEntries) {
      await reduxStore.dispatch(loadRequiredProducts);
    }

    return {}
  }

  render() {
    const category = this.props.category;
    const categoryId = category ? category.id : undefined;
    const subcategory = this.props.subcategory;

    const subcategoryMenu = <SubcategoryMenu categoryId={categoryId} subcategory={subcategory} />;

    const description = this.props.category ?
      `Cotiza ${this.props.title} LG al mejor precio` :
      'Encuentra las mejores ofertas para todos tus productos LG';

    return <React.Fragment>
      <Head>
        <title key="title">{this.props.title} - LG Online</title>
        <meta property="og:title" content={this.props.title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">
        {this.props.isMobile && subcategoryMenu}
        <Carousel categoryId={categoryId} subcategory={subcategory} />
        {!this.props.isMobile && <div className="d-flex flex-row justify-content-center">
          {subcategoryMenu}
        </div>}
        <ProductBrowseResults categoryId={categoryId} subcategory={subcategory} />
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state, ownProps) {
  const { section } = ownProps.router.query;
  const { importantCategories } = lgonlineStateToPropsUtils(state);

  const props = {
    isMobile: state.browser.lessThan.medium
  };

  for (const category of importantCategories) {
    if (category.slug === section) {
      return {
        category,
        subcategory: null,
        title: category.name,
        ...props
      }
    }

    const subcategories = category.subcategories || [];

    for (const subcategory of subcategories) {
      if (subcategory.slug === section) {
        return {
          category,
          subcategory,
          title: subcategory.title,
          ...props
        }
      }
    }
  }

  return {
    ...props,
    title: 'Cotiza todos tus productos LG en un sólo lugar'
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