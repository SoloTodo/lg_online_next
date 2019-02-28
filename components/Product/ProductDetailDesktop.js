import React from 'react'
import {connect} from 'react-redux'

import Link from "next/link";
import Head from 'next/head';

import './ProductDetailDesktop.css'
import {settings} from "../../settings";

import ProductDetailPictures from "./ProductDetailPictures";
import ProductSpecEntries from "./ProductSpecEntries";
import {lgonlineStateToPropsUtils} from "../../redux-utils";
import {listToObject} from "../../react-utils/utils";
import ProductPricingTable from "./ProductPricingTable";

class ProductDetailDesktop extends React.Component {
  render() {
    const {productEntry, bestPriceFormatted} = this.props;

    let backComponent = null;

    // if (referrer) {
    //   backComponent = <div className="d-flex flex-row justify-content-end align-items-center">
    //     <Link to={referrer}
    //           className="product-detail-desktop__back-button align-self-end d-flex flex-row">
    //       <div className="product-detail-desktop__back-arrow">
    //         <i className="fas fa-long-arrow-alt-left">&nbsp;</i>
    //       </div>
    //       <div className="product-detail-desktop__back-label">VOLVER</div>
    //     </Link>
    //   </div>
    // }

    const category = this.props.categoriesDict[productEntry.product.category];
    const categoryMetadata = settings.categoriesMetadata[category.id];
    const subcategories = categoryMetadata.subcategories || [];
    const matchingSubcategory = subcategories.filter(subcategory => subcategory.name === productEntry.customFields.subcategory)[0];

    return <div className="product-detail-desktop container">
      {productEntry.customFields.flixmediaMpn &&
      <Head>
        <script type="text/javascript" src="https://media.flixfacts.com/js/loader.js"
                data-flix-distributor="14021"
                data-flix-language="cl"
                data-flix-mpn={productEntry.customFields.flixmediaMpn}
                data-flix-inpage="flix-inpage">
        </script>
      </Head>}

      <div className="row">
        <div className="col-12 mt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link href={`/browse?section=${categoryMetadata.slug}`} as={`/${categoryMetadata.slug}`}><a>{categoryMetadata.name}</a></Link></li>
              {matchingSubcategory && <li className="breadcrumb-item"><Link href={`/browse?section=${matchingSubcategory.slug}`} as={`/${matchingSubcategory.slug}`}><a>{matchingSubcategory.name}</a></Link></li>}
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

            <ProductPricingTable entities={productEntry.entities} />
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

function mapStateToProps(state) {
  const {categories} = lgonlineStateToPropsUtils(state);

  return {
    categoriesDict: listToObject(categories, 'url')
  }
}

export default connect(mapStateToProps)(ProductDetailDesktop)