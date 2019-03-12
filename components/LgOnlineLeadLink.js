import React from 'react';
import {settings} from "../settings";
import {lgonlineStateToPropsUtils} from "../redux-utils";
import {listToObject} from "../react-utils/utils";
import {connect} from "react-redux";
import LeadLink from "../react-utils/components/LeadLink";

class LgOnlineLeadLink extends React.Component {
  handleClick = () => {
    const entity = this.props.entity;
    const product = this.props.product;
    const price = parseFloat(entity.active_registry.offer_price);
    const store = this.props.storesDict[entity.store];
    const category = this.props.categoriesDict[product.category];

    window.gtag('event', 'Follow', {
      send_to: settings.googleAnalyticsId,
      dimension1: product.name,
      dimension2: category.name,
      dimension3: store.name,
      dimension4: `${product.name}|${category.name}|${store.name}`,
      dimension5: entity.active_registry.id,
      dimension6: this.props.origin,
      event_category: 'Leads',
      event_label: entity.sku || 'N/A',
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
    const { entity, className } = this.props;

    return <LeadLink
      entity={entity}
      className={className}
      websiteId={settings.websiteId}
      soicosPrefix="LO_"
      callback={this.handleClick}
    >
      {this.props.children}
    </LeadLink>
  }
}

function mapStateToProps(state) {
  const {stores, categories} = lgonlineStateToPropsUtils(state);

  return {
    storesDict: listToObject(stores, 'url'),
    categoriesDict: listToObject(categories, 'url')
  }
}

export default connect(mapStateToProps)(LgOnlineLeadLink)