import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import Head from 'next/head'
import {calculateResponsiveState} from 'redux-responsive'
import {ApiResourceObject} from "../react-utils/ApiResource";
import withReduxStore from '../lib/with-redux-store'
import {loadRequiredProducts, loadRequiredResources} from "../redux/actions";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles.scss"
import "../fonts.scss"

class MyApp extends App {
  static async getInitialProps(appContext) {
    const reduxStore = appContext.ctx.reduxStore;
    const state = reduxStore.getState();

    console.log('Getting initial props');

    if (state.loadedBundle) {
      return {}
    }

    const promises = [
      reduxStore.dispatch(loadRequiredResources(['currencies', 'stores', 'categories'])),
      reduxStore.dispatch(loadRequiredProducts)
    ];

    return Promise.all(promises)
  }

  componentDidMount() {
    const store = this.props.reduxStore;
    store.dispatch(calculateResponsiveState(window));

    const {apiResourceObjects, productEntries} = store.getState();

    const hydratedProductEntries = productEntries.map(productEntry => {
      const entities = productEntry.entities.map(entity => new ApiResourceObject(entity, apiResourceObjects));

      return {
        ...productEntry,
        product: new ApiResourceObject(productEntry.product, apiResourceObjects),
        entities
      }
    });

    store.dispatch({
      type: 'setProductEntries',
      productEntries: hydratedProductEntries
    })
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0" />
        </Head>

        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
