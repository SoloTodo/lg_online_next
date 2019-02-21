import React from 'react';
import {connect} from 'react-redux'
import Router, {withRouter} from 'next/router'
import Head from "next/head";

import {lgonlineStateToPropsUtils} from "../redux-utils";
import {endpoint} from "../endpoint";
import {listToObject} from "../react-utils/utils";
import {withLgOnlineTracker} from "../utils";
import ProductDetailMobile from "../components/Product/ProductDetailMobile";
import ProductDetailDesktop from "../components/Product/ProductDetailDesktop";
import queryString from "query-string";
import NavBar from "../components/NavBar/NavBar";

class Products extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx)
  }

  render() {
    const productEntry = this.props.productEntry;

    const expectedUrl = `/products/${productEntry.product.id}-${productEntry.product.slug}`;

    // if (this.props.router.asPath !== expectedUrl) {
    //   return Router.replace(expectedUrl)
    // }

    const RenderComponent = this.props.isMobile ? ProductDetailMobile : ProductDetailDesktop;

    const highlightedStoreId = parseInt(queryString.parse(this.props.router.search).highlightedStore, 10);

    // const entitiesToDisplay = highlightedStoreId ? productEntry.entities.sort((a, b) => {
    //   const aPriority = a.store.id === highlightedStoreId ? 0 : 1;
    //   const bPriority = b.store.id === highlightedStoreId ? 0 : 1;
    //   return aPriority - bPriority;
    // }) : productEntry.entities;

    const entitiesToDisplay = highlightedStoreId ? productEntry.entities.filter(entity => (
      entity.store.id === highlightedStoreId
    )) : productEntry.entities;

    const bestPrice = entitiesToDisplay.length && entitiesToDisplay[0].active_registry.offer_price;
    const bestPriceValue = parseInt(bestPrice, 10);

    const bestPriceFormatted = bestPrice && this.props.priceFormatter(bestPrice).replace('$ ', '');


    return <React.Fragment>
      <Head>
        <title key="title">{productEntry.product.name} - LG Online</title>
        <meta property="og:title" content={productEntry.product.name} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={productEntry.customFields.customDescription} />
        <meta property="og:image" content={`${endpoint}products/${productEntry.product.id}/picture/?width=1000&height=1000`} />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="1000" />
        <meta property="product:price:currency" content="CLP" />
        {bestPriceValue && <meta property="product:price:amount" content={bestPriceValue} />}
      </Head>

      <NavBar />

      <div id="content">
        <RenderComponent
          productEntry={productEntry}
          bestPriceFormatted={bestPriceFormatted}
          entitiesToDisplay={entitiesToDisplay}
        />
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state, ownProps) {
  const {priceFormatter, categories} = lgonlineStateToPropsUtils(state);

  const productEntries = state.productEntries;
  const productId = parseInt(ownProps.router.query.product, 10);
  const productEntry = productEntries.filter(productEntry => productEntry.product.id === productId)[0];

  return {
    priceFormatter,
    categoriesDict: listToObject(categories, 'url'),
    isMobile: state.browser.lessThan.medium,
    productEntry
  }
}

function mapPropsToGAField(props) {
  const productEntry = props.productEntry;

  return {
    product: productEntry.product.name,
    category: props.categoriesDict[productEntry.product.category].name,
    subcategory: productEntry.customFields.subcategory || 'N/A',
    pageTitle: productEntry.product.name,
    value: parseFloat(productEntry.entities[0].active_registry.offer_price)
  }
}

const TrackedProducts = withLgOnlineTracker(Products, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedProducts))
