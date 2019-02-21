import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import {calculateResponsiveState} from 'redux-responsive'
import withReduxStore from '../lib/with-redux-store'
import {loadRequiredProducts, loadRequiredResources} from "../redux/actions";
import LgOnlineHead from "../components/LgOnlineHead";
import {settings} from '../settings';
import {isServer} from '../react-utils/utils'

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-gallery/styles/css/image-gallery.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import "../styles.scss"
import "../fonts.scss"


class MyApp extends App {
  constructor(props) {
    super(props);

    if (!isServer) {
      // Facebook pixel

      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function()
      {n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)}
      ;
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', settings.facebookId);
    }
  }

  static async getInitialProps(appContext) {
    const reduxStore = appContext.ctx.reduxStore;
    const state = reduxStore.getState();

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
    // Re-render on frontend due to varying window sizes

    const store = this.props.reduxStore;
    store.dispatch(calculateResponsiveState(window));
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <LgOnlineHead />

        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
