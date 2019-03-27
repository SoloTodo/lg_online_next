import React from 'react';
import {settings} from "../settings";
import {connect} from "react-redux";
import LeadLink from "../react-utils/components/LeadLink";

class LgOnlineLeadLink extends React.Component {
  handleClick = uuid => {
    const {entity, product, store, category} = this.props;
    const price = parseFloat(entity.active_registry.offer_price);

    window.gtag('event', 'Follow', {
      send_to: settings.googleAnalyticsId,
      dimension1: product.name,
      dimension2: category.name,
      dimension3: store.name,
      dimension4: `${product.name}|${category.name}|${store.name}`,
      dimension5: entity.active_registry.id,
      dimension6: this.props.origin,
      event_category: 'Leads',
      event_label: uuid,
      value: price
    });

    window.gtag('event', 'generate_lead', {
      send_to: settings.lgAdWordsConversionId,
      event_category: 'Donde Comprar',
      event_label: product.name,
      value: price
    });

    window.fbq('track', 'Lead', {
      content_category: category.name,
      content_name: product.name,
      currency: 'CLP',
      value: price
    });
  };

  render() {
    const { entity, className, store, children } = this.props;

    return <LeadLink
      entity={entity}
      store={store}
      className={className}
      websiteId={settings.websiteId}
      soicosPrefix="LO_"
      callback={this.handleClick}
    >
      {children}
    </LeadLink>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    category: state.apiResourceObjects[ownProps.product.category],
    store: state.apiResourceObjects[ownProps.entity.store]
  }
}

export default connect(mapStateToProps)(LgOnlineLeadLink)