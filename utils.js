import {settings} from './settings'
import withTracker from './react-utils/components/GoogleAnalyticsNextJsTracker';

export const isServer = typeof window === 'undefined';

export function isIe() {
  if (isServer) {
    return false
  }

  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");

  return msie > 0 || !!navigator.userAgent.match(/Trident/)
}

export const trackPage = params => {
  const analyticsParams = {
    page_title : 'LG Online',
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href
  };

  const {product, category, subcategory, pageTitle} = params;

  if (product) {
    analyticsParams.dimension1 = product;
  }

  if (category) {
    analyticsParams.dimension2 = category.name;
  }

  if (subcategory) {
    analyticsParams.dimension7 = subcategory;
  }

  if (pageTitle) {
    analyticsParams.page_title = `${pageTitle} - LG Online`;
  }

  window.gtag('config', settings.googleAnalyticsId, analyticsParams);
  window.gtag('config', settings.lgAdWordsConversionId);
  window.fbq('track', 'PageView');
};

export function withLgOnlineTracker(WrappedComponent, mapPropsToGAField) {
  const trackPageHandler = props => {
    const analyticsParams = {
      page_title : 'LG Online',
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href
    };

    if (mapPropsToGAField) {
      const lgOnlineProps = mapPropsToGAField(props);

      if (lgOnlineProps.product) {
        analyticsParams.dimension1 = lgOnlineProps.product;
      }

      if (lgOnlineProps.category) {
        analyticsParams.dimension2 = lgOnlineProps.category;
      }

      if (lgOnlineProps.subcategory) {
        analyticsParams.dimension7 = lgOnlineProps.subcategory;
      }

      if (lgOnlineProps.pageTitle) {
        analyticsParams.page_title = `${lgOnlineProps.pageTitle} - LG Online`;
      }
    }

    window.gtag('config', settings.googleAnalyticsId, analyticsParams);
    window.gtag('config', settings.lgAdWordsConversionId);
    window.fbq('track', 'PageView');
    window.fbq('track', 'ViewContent');
  };

  return withTracker(WrappedComponent, trackPageHandler, true)
}