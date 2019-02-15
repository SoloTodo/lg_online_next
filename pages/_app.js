import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import Head from 'next/head'
import {calculateResponsiveState} from 'redux-responsive'
import withReduxStore from '../lib/with-redux-store'
import {apiSettings} from '../react-utils/settings'
import {fetchJson} from '../react-utils/utils'
import {loadRequiredProducts} from "../redux/actions";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../styles.scss"
import "../fonts.scss"

class MyApp extends App {
  static async getInitialProps(appContext) {
    const promises = [];
    const reduxStore = appContext.ctx.reduxStore;
    const state = reduxStore.getState();

    if (state.loadedBundle) {
      return {}
    }

    // Retrieve bundle
    let bundleUrl = `${apiSettings.endpoint}resources/?`;

    for (const requiredResource of ['currencies', 'stores', 'categories']) {
      bundleUrl += `names=${requiredResource}&`;
    }

    promises.push(fetchJson(bundleUrl));

    // Retrieve required products

    promises.push(loadRequiredProducts(reduxStore.dispatch));

    const promiseValues = await Promise.all(promises);
    const bundle = promiseValues[0];
    reduxStore.dispatch({
      type: 'addBundle',
      apiResourceObjects: bundle
    });

    return {}
  }

  componentDidMount() {
    const store = this.props.reduxStore;
    store.dispatch(calculateResponsiveState(window));
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
