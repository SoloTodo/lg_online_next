import React from 'react';
import {connect} from 'react-redux'
import Router, {withRouter} from 'next/router'
import Head from "next/head";

import {lgonlineStateToPropsUtils} from "../redux-utils";
import {endpoint} from "../endpoint";
import {listToObject, fetchJson} from "../react-utils/utils";
import {withLgOnlineTracker} from "../utils";
import ProductDetailMobile from "../components/Product/ProductDetailMobile";
import ProductDetailDesktop from "../components/Product/ProductDetailDesktop";
import queryString from "query-string";
import NavBar from "../components/NavBar/NavBar";
import desiredProducts from '../products'
import { settings } from '../settings'

class Products extends React.Component {
  static async getInitialProps(ctx) {
    const { req, res, query, reduxStore } = ctx;

    const productId = parseInt(query.product, 10);
    const productEntries = reduxStore.getState().productEntries;
    let productEntry = null;

    if (productEntries) {
      // All products have already been fetched from API
      productEntry = productEntries.filter(productEntry => productEntry.product.id === productId)[0];
    } else {
      const desiredProductEntry = desiredProducts.filter(desiredProduct => desiredProduct.productId === productId)[0];
      if (desiredProductEntry) {
        // Product is valid but pricing information has not been fetched
        let url = `products/available_entities/?ids=${productId}`;

        for (const storeId of settings.storeIds) {
          url += `&stores=${storeId}`
        }

        const response = await fetchJson(url);
        const rawProductEntry = response.results[0];

        const entities = rawProductEntry.entities
          .filter(entity => entity.active_registry.cell_monthly_payment === null);

        productEntry = {
          product: rawProductEntry.product,
          entities,
          customFields: desiredProductEntry
        };
      }
    }

    if (productEntry) {
      const givenSlug = query.slug;
      const expectedSlug = productEntry.product.slug;

      if (givenSlug !== expectedSlug) {
        if (res) {
          // Redirect server side

          res.writeHead(302, {
            Location: `${settings.domain}/products/${productId}-${expectedSlug}`
          });
          res.end()
        } else {
          // Soft redirect client side

          const href = `/products?product=${productId}&slug=${expectedSlug}`;
          const as = `/products/${productId}-${expectedSlug}`;

          Router.push(href, as, { shallow: true })
        }
      }
    } else {

    }

    return {
      productEntry,
    };
  }

  render() {
    const productEntry = this.props.productEntry;
    const RenderComponent = this.props.isMobile ? ProductDetailMobile : ProductDetailDesktop;

    const highlightedStoreId = parseInt(queryString.parse(this.props.router.asPath.split('?')[1] || '').highlighted_store, 10);

    // const entitiesToDisplay = highlightedStoreId ? productEntry.entities.sort((a, b) => {
    //   const aPriority = a.store.id === highlightedStoreId ? 0 : 1;
    //   const bPriority = b.store.id === highlightedStoreId ? 0 : 1;
    //   return aPriority - bPriority;
    // }) : productEntry.entities;

    const entitiesToDisplay = highlightedStoreId ? productEntry.entities.filter(entity => (
      this.props.storesDict[entity.store].id === highlightedStoreId
    )) : productEntry.entities;

    const bestPrice = entitiesToDisplay.length && entitiesToDisplay[0].active_registry.offer_price;
    const bestPriceValue = parseInt(bestPrice, 10);

    const bestPriceFormatted = bestPrice && this.props.priceFormatter(bestPrice).replace('$ ', '');

    return <React.Fragment>
      <Head>
        <title key="title">{productEntry.product.name} - LG Online</title>
        <meta property="og:type" content="product" />
        <link rel="canonical" href={`${settings.domain}/products/${productEntry.product.id}-${productEntry.product.slug}`} />
        <meta property="og:url" content={`${settings.domain}/products/${productEntry.product.id}-${productEntry.product.slug}`} />
        <meta property="og:title" content={productEntry.product.name} />
        <meta name="description" property="og:description" content={productEntry.customFields.customDescription || productEntry.customFields.customTitle} />
        <meta property="og:image" content={`${endpoint}products/${productEntry.product.id}/picture/?width=1000&height=1000`} />
        <meta property="og:image:width" content="1000" />
        <meta property="og:image:height" content="1000" />
        <meta property="product:price:currency" content="CLP" />
        {bestPriceValue && <meta property="product:price:amount" content={bestPriceValue} />}
        <meta property="product:availability" content={bestPriceValue ? 'instock' : 'oos'} />
        <meta property="product:brand" content="LG" />
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
  const {priceFormatter, categories, stores} = lgonlineStateToPropsUtils(state);

  return {
    priceFormatter,
    categoriesDict: listToObject(categories, 'url'),
    storesDict: listToObject(stores, 'url'),
    isMobile: state.browser.lessThan.medium,
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
