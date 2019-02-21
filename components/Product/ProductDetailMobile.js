import React from 'react'
import { withRouter } from 'next/router'
import {connect} from 'react-redux';
import ProductDetailPictures from "./ProductDetailPictures";
import classNames from "classnames";

import './ProductDetailMobile.css'
import ProductSpecEntries from "./ProductSpecEntries";
import LeadLink from "../LeadLink";
import {lgonlineStateToPropsUtils} from "../../redux-utils";
import {listToObject} from "../../react-utils/utils";
import {settings} from '../../settings';

class ProductDetailMobile extends React.Component {
  render() {
    const {productEntry, bestPriceFormatted, storesDict} = this.props;
    // const categoryMetadata = settings.categoriesMetadata[productEntry.product.category.id];

    // let backUrlPath = null;
    // let backMessage = null;

    // if (categoryMetadata) {
    //   backUrlPath = `/${categoryMetadata.slug}`;
    //   backMessage = `VER MÁS ${categoryMetadata.name.toUpperCase()}`;
    // }

    const entitiesToDisplay = this.props.entitiesToDisplay || productEntry.entities;

    let whatsAppText = `¡Mira lo que encontré! ${productEntry.product.name} a $${bestPriceFormatted} ${settings.domain}${this.props.router.asPath}`;
    whatsAppText = encodeURIComponent(whatsAppText);

    return <div className="product-detail-mobile-container">
      <div className="product-detail-mobile">
        <div className="product-detail-mobile__product_title">
          {productEntry.customFields.customTitle}
        </div>
        <div className="product-detail-mobile__product_name">
          {productEntry.product.name}
        </div>

        <div className="d-flex flex-row">
          <div className="product-detail-mobile__picture-name-price">
            <ProductDetailPictures product={productEntry.product} />
          </div>
          <div className="product-detail-mobile__axes-specs-button d-flex flex-column">
            <div className="product-detail-mobile__main_specs">
              <ProductSpecEntries productEntry={productEntry} />
            </div>
          </div>
        </div>
        {/*{backUrlPath &&*/}
        {/*<div className="d-flex flex-row justify-content-end align-items-center">*/}
          {/*<Link to={backUrlPath}*/}
                {/*className="product-detail-mobile__back-button align-self-end d-flex flex-row">*/}
            {/*<div className="product-detail-mobile__back-arrow">*/}
              {/*<i className="fas fa-long-arrow-alt-left">&nbsp;</i>*/}
            {/*</div>*/}
            {/*<div className="product-detail-mobile__back-label">{backMessage}</div>*/}
          {/*</Link>*/}
        {/*</div>*/}
        {/*}*/}
      </div>
      <div className="product-detail-mobile__pricing-container">
        {productEntry.entities.length ?
            <div>
              <div className="product-detail-mobile__pricing-from d-flex flex-row align-items-end">
                {!this.props.entitiesToDisplay && <div className="product-detail-mobile__pricing-from__label">DESDE</div>}
                <div className="product-detail-mobile__pricing-from__symbol">$</div>
                <div className="product-detail-mobile__pricing-from__value">{bestPriceFormatted}</div>
              </div>
              <div className="product-detail-mobile__pricing-slogan">
                COMPARA, ENAMÓRATE Y ¡LLÉVATELO!
              </div>
              <div className="product-detail-mobile__pricing-table-container">
                {entitiesToDisplay.map((entity, idx) => <LeadLink href={entity.external_url} entity={entity} target="_blank" rel="noopener noreferrer" key={entity.id} className={classNames('product-detail-mobile__pricing-table-row d-flex flex-row align-items-center', {'first': idx === 0})}>
                  <div className="product-detail-mobile__pricing-table-row__store">{storesDict[entity.store].name}</div>
                  <div className="product-detail-mobile__pricing-table-row__price">{this.props.priceFormatter(entity.active_registry.offer_price)}</div>
                  <div className="product-detail-mobile__pricing-table-row__buy-button text-center">COMPRAR <i className="fas fa-arrow-circle-right ml-2">&nbsp;</i></div>
                </LeadLink>)}
              </div>
              <a href={`https://api.whatsapp.com/send?text=${whatsAppText}`} className="product-detail-mobile__whatsapp-share d-flex flex-row justify-content-center align-items-center">
                <div className="product-detail-mobile__whatsapp-share-icon"><i className="fab fa-whatsapp">&nbsp;</i></div>
                <div className="product-detail-mobile__whatsapp-share-label">COMPÁRTELO</div>
              </a>
            </div>
            : <div>No disponible</div>}
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  const {priceFormatter, stores} = lgonlineStateToPropsUtils(state);

  return {
    priceFormatter,
    storesDict: listToObject(stores, 'url')
  }
}

export default withRouter(connect(mapStateToProps)(ProductDetailMobile));