import React from 'react'
import {connect} from 'react-redux'
import {lgonlineStateToPropsUtils} from "../../redux-utils";

import './SlideDynamicPrice.css'
import Link from 'next/link';
import {listToObject} from '../../react-utils/utils';
import {settings} from "../../settings";

class SlideDynamicPrice extends React.Component {
  handleClick = productEntry => {
    window.gtag('event', 'Click', {
      send_to: settings.googleAnalyticsId,
      dimension1: productEntry.product.name,
      dimension2: productEntry.product.category.name,
      event_category: 'Banners',
      event_label: productEntry.product.name,
    });
  };

  render() {
    const {productEntry, forcedPriceStoreId} = this.props;

    if (!productEntry || !productEntry.entities.length) {
      return null
    }

    const priceDisplayEntity = forcedPriceStoreId ?
        productEntry.entities.filter(entity => this.props.storesDict[entity.store].id === forcedPriceStoreId)[0] :
        productEntry.entities[0];

    if (!priceDisplayEntity) {
      return null
    }

    const price = priceDisplayEntity.active_registry.offer_price;
    const formattedPrice = this.props.priceFormatter(price).replace('$ ', '');

    const category = this.props.categoriesDict[productEntry.product.category];
    const categoryMetadata = settings.categoriesMetadata[category.id];

    const linkAs = this.props.isMobile ?
        this.props.mobileAs || `/products/${productEntry.product.id}-${productEntry.product.slug}${forcedPriceStoreId ? '?highlighted_store=' + forcedPriceStoreId : ''}` :
        this.props.desktopAs || `/${categoryMetadata.slug}?product=${productEntry.product.id}`
    ;

    const linkHref = this.props.isMobile ?
        this.props.mobileHref || `/products?product=${productEntry.product.id}&slug=${productEntry.product.slug}${forcedPriceStoreId ? '&highlighted_store=' + forcedPriceStoreId : ''}` :
        this.props.desktopHref || `/browse?section=${categoryMetadata.slug}&product=${productEntry.product.id}`
    ;

    return <Link href={linkHref} as={linkAs}>
      <a className={`dynamic-banner ${this.props.className || ''} text-center d-flex flex-row justify-content-center`} onClick={evt => this.handleClick(productEntry)}>
        <div>
          <picture>
            <source media="(max-width: 575px)"
                    srcSet={`${this.props.extraSmall[0]}, ${this.props.extraSmall[1]} 2x`} />
            <source media="(max-width: 767px)"
                    srcSet={`${this.props.small[0]}`} />
            <source media="(max-width: 991px)"
                    srcSet={`${this.props.medium[0]}`} />
            <source media="(max-width: 1199px)"
                    srcSet={`${this.props.large[0]}`} />
            <source media="(max-width: 10000px)"
                    srcSet={`${this.props.infinity[0]}`} />
            <img src={this.props.extraSmall[0]} />
          </picture>
          <div className="dynamic-banner__price"><span className="dynamic-banner__price-sign">$</span>{formattedPrice}</div>
          <div className="dynamic-banner__buy-button d-flex flex-row align-items-center justify-content-center">
            <span>Comprar</span>
            <i className="fas fa-arrow-circle-right dynamic-banner__buy-button__label">&nbsp;</i>
          </div>
        </div>
      </a>
    </Link>
  }
}

function mapStateToProps(state, ownProps) {
  const matchingProductEntry = state.productEntries.filter(productEntry => productEntry.product.id === ownProps.productId)[0];
  const { priceFormatter, categories, stores} = lgonlineStateToPropsUtils(state);

  return {
    productEntry: matchingProductEntry,
    priceFormatter,
    isMobile: state.browser.lessThan.medium,
    categoriesDict: listToObject(categories, 'url'),
    storesDict: listToObject(stores, 'url')
  }
}

export default connect(mapStateToProps)(SlideDynamicPrice)