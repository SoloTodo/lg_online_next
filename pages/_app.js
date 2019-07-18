import "@babel/polyfill";
import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import {calculateResponsiveState} from 'redux-responsive'

import {loadRequiredResources} from '../react-utils/redux/actions'

import withReduxStore from '../lib/with-redux-store'
import LgOnlineHead from "../components/LgOnlineHead";


// Import theme here because ajax-loader.gif import breaks otherwise
import 'slick-carousel/slick/slick-theme.scss';
import "../styles.scss"
import "../fonts.scss"
import {ToastContainer} from "react-toastify";


class MyApp extends App {
  static async getInitialProps(appContext) {
    const reduxStore = appContext.ctx.reduxStore;
    const state = reduxStore.getState();

    if (!state.loadedBundle) {
      await reduxStore.dispatch(loadRequiredResources(['currencies', 'stores', 'categories']))
    }

    let pageProps = {};

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }


    return {
      pageProps
    }
  }

  componentDidMount() {
    // Re-render on frontend due to varying window sizes

    const store = this.props.reduxStore;
    store.dispatch(calculateResponsiveState(window));
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <LgOnlineHead />

        <ToastContainer />

        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>

        <script type="text/javascript" src="/static/js/livechat.js"></script>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
