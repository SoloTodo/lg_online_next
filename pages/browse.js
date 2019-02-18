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

class Browse extends React.Component {
  render() {
    const category = this.props.category;
    const categoryId = category ? category.id : undefined;
    const subcategory = this.props.subcategory;

    const subcategoryMenu = <SubcategoryMenu categoryId={categoryId} subcategory={subcategory} />;

    return <React.Fragment>
      <Head>
        {this.props.title && <title key="title">{this.props.title} - LG Online</title>}
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
  return {
    category: props.category,
    subcategory: props.subcategory,
    pageTitle: props.title
  }
}

const TrackedBrowse = withLgOnlineTracker(Browse, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedBrowse));