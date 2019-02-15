import React from 'react'
import {connect} from 'react-redux'
import RetinaImage from 'react-retina-image';
import {lgonlineStateToPropsUtils} from "../../redux-utils";

import './SlideDynamicPrice.css'
import Link from 'next/link';
import { withRouter } from 'next/router'
import {settings} from "../../settings";

class SlideDynamicPrice extends React.Component {
  handleClick = productEntry => {
    window.gtag('event', 'Expand', {
      send_to: settings.googleAnalyticsId,
      dimension1: productEntry.product.name,
      dimension2: productEntry.product.category.name,
      event_category: 'Banners',
      event_label: productEntry.product.name,
    });
  };

  render() {
    const productEntry = this.props.productEntry;

    if (!productEntry || !productEntry.entities.length) {
      return null
    }

    let imageToDisplay = null;

    const conversionTuple = [
      [575, this.props.extraSmall],
      [767, this.props.small],
      [991, this.props.medium],
      [1199, this.props.large],
    ];

    for (const entry of conversionTuple) {
      if (window.innerWidth <= entry[0]) {
        imageToDisplay = entry[1];
        break;
      }
    }

    if (!imageToDisplay) {
      imageToDisplay = this.props.infinity
    }

    const priceDisplayEntity = this.props.forcedPriceStoreId ?
        productEntry.entities.filter(entity => entity.store.id === this.props.forcedPriceStoreId)[0] :
        productEntry.entities[0];

    if (!priceDisplayEntity) {
      return null
    }

    const price = priceDisplayEntity.activeRegistry.offer_price;
    const formattedPrice = this.props.priceFormatter(price).replace('$ ', '');

    const categoryMetadata = settings.categoriesMetadata[productEntry.product.category.id];

    const linkTo = this.props.isMobile ?
        {
          pathname: this.props.mobileHref || `/products/${productEntry.product.id}-${productEntry.product.slug}`,
          state: {
            referrer: this.props.location.pathname
          }
        } :
        this.props.desktopHref || `/${categoryMetadata.slug}?product=${productEntry.product.id}`;

    return <Link to={linkTo} onClick={evt => this.handleClick(productEntry)} className="d-flex flex-row justify-content-center w-100">
      <div className={`dynamic-banner ${this.props.className}`} onClick={this.props.onClick}>
        <RetinaImage src={imageToDisplay} />
        <div className="dynamic-banner__price"><span className="dynamic-banner__price-sign">$</span>{formattedPrice}</div>
        <div className="dynamic-banner__buy-button d-flex flex-row align-items-center justify-content-center">
          <span>Comprar</span>
          <i className="fas fa-arrow-circle-right dynamic-banner__buy-button__label">&nbsp;</i>
        </div>
      </div>
    </Link>
  }
}

function mapStateToProps(state, ownProps) {
  const matchingProductEntry = state.productEntries.filter(productEntry => productEntry.product.id === ownProps.productId)[0];
  const {priceFormatter} = lgonlineStateToPropsUtils(state);

  return {
    productEntry: matchingProductEntry,
    priceFormatter,
    isMobile: state.browser.lessThan.medium
  }
}

export default withRouter(connect(mapStateToProps)(SlideDynamicPrice))