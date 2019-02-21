import React from 'react';

import './ProductPricingTable.css'
import LeadLink from "../LeadLink.js";
import {lgonlineStateToPropsUtils} from "../../redux-utils";
import {listToObject} from "../../react-utils/utils";
import {connect} from "react-redux";
import classNames from "classnames";

class ProductPricingTable extends React.Component {
  render() {
    const {entities, storesDict, priceFormatter} = this.props;

    return <div className="product-detail-desktop__pricing-table">
      {entities.length ? <div className="product-detail-desktop__pricing-table">
        {entities.map((entity, idx) => <LeadLink href={entity.external_url} entity={entity} target="_blank" rel="noopener noreferrer" key={entity.id} className={classNames('product-detail-desktop__pricing-table-row d-flex flex-row align-items-center', {'first': idx === 0})}>
          <div className="product-detail-desktop__pricing-table-row__store">{storesDict[entity.store].name}</div>
          <div className="product-detail-desktop__pricing-table-row__price">{priceFormatter(entity.active_registry.offer_price)}</div>
          <div className="product-detail-desktop__pricing-table-row__buy-button">COMPRAR <i
            className="fas fa-arrow-circle-right ml-2">&nbsp;</i></div>
        </LeadLink>)}
      </div> : 'No disponible'}
    </div>

  }
}

function mapStateToProps(state) {
  const {priceFormatter, stores} = lgonlineStateToPropsUtils(state);

  return {
    priceFormatter,
    storesDict: listToObject(stores, 'url'),
  }
}

export default connect(mapStateToProps)(ProductPricingTable)
