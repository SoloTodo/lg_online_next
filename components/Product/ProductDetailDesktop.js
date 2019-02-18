import React from 'react'
import {Helmet} from "react-helmet";

import {Link} from "react-router-dom";

import './ProductDetailDesktop.css'
import {settings} from "../settings";

import ProductDetailPictures from "./ProductDetailPictures";
import ProductSpecEntries from "./ProductSpecEntries";
import classNames from "classnames";
import LeadLink from "../LeadLink";

export default class ProductDetailDesktop extends React.Component {
  render() {
    const {productEntry, bestPriceFormatted, referrer} = this.props;

    let backComponent = null;

    if (referrer) {
      backComponent = <div className="d-flex flex-row justify-content-end align-items-center">
        <Link to={referrer}
              className="product-detail-desktop__back-button align-self-end d-flex flex-row">
          <div className="product-detail-desktop__back-arrow">
            <i className="fas fa-long-arrow-alt-left">&nbsp;</i>
          </div>
          <div className="product-detail-desktop__back-label">VOLVER</div>
        </Link>
      </div>
    }

    const categoryMetadata = settings.categoriesMetadata[productEntry.product.category.id];
    const subcategories = categoryMetadata.subcategories || [];
    const matchingSubcategory = subcategories.filter(subcategory => subcategory.name === productEntry.customFields.subcategory)[0];

    return <div className="product-detail-desktop container">
      {productEntry.customFields.flixmediaMpn &&
      <Helmet>
        <script type="text/javascript" src="https://media.flixfacts.com/js/loader.js"
                data-flix-distributor="14021"
                data-flix-language="cl"
                data-flix-mpn={productEntry.customFields.flixmediaMpn}
                data-flix-inpage="flix-inpage">
        </script>
      </Helmet>}

      <div className="row">
        <div className="col-12 mt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to={`/${categoryMetadata.slug}`}>{categoryMetadata.name}</Link></li>
              {matchingSubcategory && <li className="breadcrumb-item"><Link to={`/${matchingSubcategory.slug}`}>{matchingSubcategory.name}</Link></li>}
              <li className="breadcrumb-item active" aria-current="page">{productEntry.product.name}</li>
            </ol>
          </nav>

        </div>
      </div>

      <div className="product-detail-desktop-container">
        <div className="row">
          <div className="col-12">
            {backComponent}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ProductDetailPictures product={productEntry.product} />
          </div>
          <div className="col-6 mt-4">
            <div className="product-detail-desktop__product-title">{productEntry.customFields.customTitle}</div>
            <div className="product-detail-desktop__product-name">{productEntry.product.name}</div>
            <div className="product-detail-desktop__main-specs">
              <ProductSpecEntries productEntry={productEntry} />
            </div>

            <div className="product-detail-desktop__pricing-from d-flex flex-row align-items-end">
              <div className="product-detail-desktop__pricing-from__label">DESDE</div>
              <div className="product-detail-desktop__pricing-from__symbol">$</div>
              <div className="product-detail-desktop__pricing-from__value">{bestPriceFormatted}</div>
            </div>

            <div className="product-detail-desktop__slogan">
              COMPARA, ENAMÓRATE Y ¡LLÉVATELO!
            </div>

            {productEntry.entities.length ? <div className="product-detail-desktop__pricing-table">
              {productEntry.entities.map((entity, idx) => <LeadLink href={entity.external_url} entity={entity  } target="_blank" rel="noopener noreferrer" key={entity.id} className={classNames('product-detail-desktop__pricing-table-row d-flex flex-row align-items-center', {'first': idx === 0})}>
                <div className="product-detail-desktop__pricing-table-row__store">{entity.store.name}</div>
                <div className="product-detail-desktop__pricing-table-row__price">{this.props.priceFormatter(entity.active_registry.offer_price)}</div>
                <div className="product-detail-desktop__pricing-table-row__buy-button">COMPRAR <i
                    className="fas fa-arrow-circle-right ml-2">&nbsp;</i></div>
              </LeadLink>)}
            </div> : 'No disponible'}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-4">
          <div id="flix-inpage"></div>
        </div>
      </div>
    </div>
  }
}