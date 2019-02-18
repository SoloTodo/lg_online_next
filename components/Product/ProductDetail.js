import React from 'react';
import {connect} from 'react-redux'

import {lgonlineStateToPropsUtils} from "../redux-utils";
import {withLgOnlineTracker} from "../utils";
import ProductDetailMobile from "./ProductDetailMobile";
import ProductDetailDesktop from "./ProductDetailDesktop";
import queryString from "query-string";

class ProductDetail extends React.Component {
  render() {
    const productEntry = this.props.productEntry;

    const locationState = this.props.location.state || {};
    const referrer = locationState.referrer;

    const RenderComponent = this.props.isMobile ? ProductDetailMobile : ProductDetailDesktop;

    const highlightedStoreId = parseInt(queryString.parse(window.location.search).highlightedStore, 10);

    // const entitiesToDisplay = highlightedStoreId ? productEntry.entities.sort((a, b) => {
    //   const aPriority = a.store.id === highlightedStoreId ? 0 : 1;
    //   const bPriority = b.store.id === highlightedStoreId ? 0 : 1;
    //   return aPriority - bPriority;
    // }) : productEntry.entities;

    const entitiesToDisplay = highlightedStoreId ? productEntry.entities.filter(entity => (
        entity.store.id === highlightedStoreId
    )) : productEntry.entities;

    const bestPriceFormatted = entitiesToDisplay.length && this.props.priceFormatter(entitiesToDisplay[0].active_registry.offer_price).replace('$ ', '');

    return <RenderComponent
        productEntry={productEntry}
        bestPriceFormatted={bestPriceFormatted}
        referrer={referrer}
        priceFormatter={this.props.priceFormatter}
        entitiesToDisplay={entitiesToDisplay}
    />
  }
}

function mapStateToProps(state, ownProps) {
  const {priceFormatter} = lgonlineStateToPropsUtils(state);

  return {
    priceFormatter,
    isMobile: state.browser.lessThan.medium
  }
}

function mapPropsToGAField(props) {
  const productEntry = props.productEntry;

  return {
    product: productEntry.product.name,
    category: productEntry.product.category.name,
    subcategory: productEntry.customFields.subcategory || 'N/A',
    pageTitle: productEntry.product.name,
    value: productEntry.entities[0].active_registry.offer_price
  }
}

const TrackedProductDetail = withLgOnlineTracker(ProductDetail, mapPropsToGAField);
export default connect(mapStateToProps)(TrackedProductDetail)
