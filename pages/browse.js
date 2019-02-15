import React from 'react';
import {withRouter} from 'next/router'
import { connect } from 'react-redux'
import {lgonlineStateToPropsUtils} from "../redux-utils";
import NavBar from "../components/NavBar/NavBar";
import SubcategoryMenu from '../components/SubcategoryMenu/SubcategoryMenu'
import Carousel from "../components/Slides/Carousel";

class Browse extends React.Component {
  render() {
    const categoryId = this.props.category ? this.props.category.id : undefined;
    const subcategory = this.props.subcategory;

    const subcategoryMenu = <SubcategoryMenu categoryId={categoryId} subcategory={subcategory} />;

    return <React.Fragment>
      <NavBar />

      <div id="content">
        {this.props.isMobile && subcategoryMenu}
        <Carousel categoryId={categoryId} subcategory={subcategory} />
        {!this.props.isMobile && <div className="d-flex flex-row justify-content-center">
          {subcategoryMenu}
        </div>}
        {/*<ProductBrowseResults location={this.props.location} categoryId={categoryId} subcategory={subcategory} />*/}
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
        ...props
      }
    }

    const subcategories = category.subcategories || [];

    for (const subcategory of subcategories) {
      if (subcategory.slug === section) {
        return {
          category,
          subcategory,
          ...props
        }
      }
    }
  }

  return {}
}

export default withRouter(connect(mapStateToProps)(Browse));