import React from 'react';
import Head from 'next/head';
import {settings} from '../settings';

export default class LgOnlineHead extends React.Component {
  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      `
    };
  }


  render() {
    return <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />

      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0" />
      <meta name="theme-color" content="#a50034" />

      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
      <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}></script>
      <script dangerouslySetInnerHTML={this.setGoogleTags()} />
    </Head>
  }
}