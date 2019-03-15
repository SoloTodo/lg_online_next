import React from 'react';
import {connect} from 'react-redux'
import classnames from 'classnames';
import {lgonlineStateToPropsUtils} from "../../redux-utils";
import {settings} from "../../settings";
import Link from 'next/link';
import { withRouter } from 'next/router'
import {listToObject} from "../../react-utils/utils";

import ProductSpecEntries from "./ProductSpecEntries";

const MobileView = props => {
  return <div className="browse-result-mobile">
    <div className="d-flex flex-row">
      <div className="browse-result-mobile__picture-name-price">
        <Link href={props.linkTo} as={props.linkAs}>
          <a>
            <img src={`${props.selectedProductEntry.product.url}picture/?image_format=JPEG&quality=80&width=300&height=300`} className="img-fluid" alt={props.selectedProductEntry.product.name} />
          </a>
        </Link>
      </div>
      <div className="browse-result-mobile__axes-specs-button d-flex flex-column">
        <div className="browse-result-mobile__axes align-self-end">
          {props.productEntries.length > 1 && <div className="d-flex flex-row">
            {props.productEntries.map(productEntry => <div
                className={classnames("browse-result-mobile__axes-choice d-flex", {'selected': productEntry.product.id === props.selectedProductEntry.product.id})}
                onClick={evt => props.onAxisClick(productEntry)} key={productEntry.product.id}>
              {productEntry.product.specs[props.axisLabel]}
            </div>)}
          </div>}
        </div>

        <div className="browse-result-mobile__main_specs">
          <ProductSpecEntries productEntry={props.selectedProductEntry} />
        </div>
      </div>
    </div>
    <div className="browse-result-mobile__product_title mt-2">
      {props.selectedProductEntry.customFields.customTitle}
    </div>
    <div className="browse-result-mobile__product_name">
      {props.selectedProductEntry.product.name}
    </div>
    <div className="d-flex flex-row justify-content-between align-items-center">
      <div>
        <div className="browse-result-mobile__price-label d-flex flex-row align-items-center">
          {!props.highlightedStoreId && <span className="browse-result-mobile__price-label-from">DESDE </span>}
          <span>${props.formattedPrice}</span>
        </div>
      </div>
      <Link href={props.linkTo} as={props.linkAs}>
        <a className="browse-result-mobile__wtb-button d-flex flex-row">
          <div className="browse-result-mobile__wtb-label">DONDE COMPRAR</div>
          <div className="browse-result-mobile__wtb-arrow d-flex flex-row justify-content-center align-items-center">
            <i className="fas fa-arrow-circle-right">&nbsp;</i>
          </div>
        </a>
      </Link>
    </div>
  </div>
};

const DesktopView = props => {
  return <div className="browse-result-desktop">
    <div className="browse-result-desktop__inner d-flex flex-column">
      <div className="browse-result-desktop__picture text-center">
        <Link href={props.linkTo} as={props.linkAs}>
          <a>
          <img src={`${props.selectedProductEntry.product.url}picture/?image_format=JPEG&quality=80&width=270&height=270`} className="img-fluid" alt={props.selectedProductEntry.product.name} onClick={evt => props.onWtbClick(evt, props.selectedProductEntry)} />
          </a>
        </Link>
      </div>

      <div className="browse-result-desktop__axes">
        {props.productEntries.length > 1 && <div className="d-flex flex-row ">
          {props.productEntries.map(productEntry => <div
              className={classnames("browse-result-desktop__axes-choice d-flex", {'selected': productEntry.product.id === props.selectedProductEntry.product.id})}
              onClick={evt => props.onAxisClick(productEntry)} key={productEntry.product.id}>
            {productEntry.product.specs[props.axisLabel]}
          </div>)}
        </div>}
      </div>

      <div className="browse-result-desktop__product-title">
        {props.selectedProductEntry.customFields.customTitle}
      </div>
      <div className="browse-result-desktop__product-name">
        {props.selectedProductEntry.product.name}
      </div>
      <div className="browse-result-desktop__main-specs">
        <ul>
          <ProductSpecEntries productEntry={props.selectedProductEntry} />
        </ul>
      </div>
      <div className="browse-result-desktop__price-label mt-auto">
        {!props.highlightedStoreId && <div className="browse-result-desktop__price-label-from">DESDE</div>}
        <div>
          <span className="browse-result-desktop__price-label-symbol">$</span>
          <span className="browse-result-desktop__price-label-value">{props.formattedPrice}</span>
          </div>
      </div>
    </div>
    <Link href={props.linkTo} as={props.linkAs}>
      <a onClick={evt => props.onWtbClick(evt, props.selectedProductEntry)} className="browse-result-desktop__wtb-button align-self-end d-flex flex-row">
        <div className="browse-result-desktop__wtb-label">ELIGE DONDE COMPRAR</div>
        <div className="browse-result-desktop__wtb-arrow d-flex flex-row justify-content-center align-items-center">
          <i className="fas fa-arrow-circle-right">&nbsp;</i>
        </div>
      </a>
    </Link>
  </div>
};

class ProductBrowseResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProductEntry: props.productEntries[0]
    }
  }

  handleAxisClick = productEntry => {
    window.gtag('event', 'Click', {
      send_to: settings.googleAnalyticsId,
      dimension1: productEntry.product.name,
      dimension2: productEntry.product.category.name,
      event_category: 'Variants',
      event_label: productEntry.product.name,
    });

    this.setState({
      selectedProductEntry: productEntry
    })
  };

  render() {
    const selectedProductEntry = this.state.selectedProductEntry;
    const priceDisplayEntity = selectedProductEntry.entities[0];

    if (!priceDisplayEntity) {
      return null
    }

    const formattedPrice = this.props.priceFormatter(priceDisplayEntity.active_registry.offer_price).replace('$ ', '');

    const productEntries = this.props.productEntries;
    const category = this.props.categoriesDict[selectedProductEntry.product.category];
    const categoryMetadata = settings.categoriesMetadata[category.id];
    const axisOrdering = categoryMetadata.axisOrdering;

    if (axisOrdering) {
      productEntries.sort((a, b) => a.product.specs[axisOrdering] - b.product.specs[axisOrdering])
    }

    const axisLabel = categoryMetadata.axisLabel;
    const hrefSuffix = this.props.highlightedStoreId ? `highlighted_store=${this.props.highlightedStoreId}` : null;

    const linkAs = `/products/${selectedProductEntry.product.id}-${selectedProductEntry.product.slug}${hrefSuffix ? '?' + hrefSuffix : ''}`;
    const linkTo = `/products?product=${selectedProductEntry.product.id}&slug=${selectedProductEntry.product.slug}${hrefSuffix ? '&' + hrefSuffix : ''}`;

    const ViewComponent = this.props.isMobile ? MobileView : DesktopView;
    
    return <ViewComponent
        linkAs={linkAs}
        linkTo={linkTo}
        selectedProductEntry={selectedProductEntry}
        productEntries={productEntries}
        onAxisClick={this.handleAxisClick}
        formattedPrice={formattedPrice}
        axisLabel={axisLabel}
        onWtbClick={this.props.onWtbClick}
        highlightedStoreId={this.props.highlightedStoreId}
    />
  }
}

function mapStateToProps(state) {
  const {priceFormatter, categories, stores} = lgonlineStateToPropsUtils(state);

  return {
    priceFormatter,
    isMobile: state.browser.lessThan.medium,
    categoriesDict: listToObject(categories, 'url'),
    storesDict: listToObject(stores, 'url')
  }
}

export default withRouter(connect(mapStateToProps)(ProductBrowseResult))