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

  setFacebookTags() {
    return {
      __html: `!function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${settings.facebookId}');
  `
    }
  }

  setHotjarTags() {
    return {
      __html: `(function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:1037016,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
    }
  }


  render() {
    return <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />

      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0" />
      <meta name="theme-color" content="#a50034" />
      <meta property="fb:app_id" content={settings.facebookId}/>
      <meta name="google-site-verification" content="WGAY0KX2UqsV70Ir8FVZ0QVPkDPYbBZ30C4UwJgFitQ" />

      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
      <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />

      <script async src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}></script>
      <script dangerouslySetInnerHTML={this.setGoogleTags()} />
      <script dangerouslySetInnerHTML={this.setFacebookTags()} />
      <script dangerouslySetInnerHTML={this.setHotjarTags()} />
    </Head>
  }
}