import React from 'react';
import {connect} from 'react-redux'
import {apiResourceStateToPropsUtils} from "../react-utils/ApiResource";
import {settings} from "../settings";
import {fetchJson} from "../react-utils/utils";
import products from "../products";
import ProductDetail from "./ProductDetail";
import {Redirect} from "react-router-dom";
import {setTitle} from "../utils";

class ProductDetailLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productEntry: props.productEntry
    }
  }

  componentDidMount() {
    this.componentUpdate()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.componentUpdate(nextProps)
    }
  }

  componentUpdate(props=this.props) {
    if (props.productEntry) {
      return
    }

    const productId = parseInt(props.match.params.id, 10);
    let url = `/products/available_entities/?ids=${productId}`;

    for (const storeId of settings.storeIds) {
      url += `&stores=${storeId}`
    }

    fetchJson(url).then(response => {
      const rawProductEntry = response.results[0];

      const entities = rawProductEntry.entities
          .filter(entity => entity.active_registry.cell_monthly_payment === null)
          .map(entity => this.props.ApiResourceObject(entity));

      const customFields = products.filter(product => product.productId === productId)[0];

      const productEntry = {
        product: this.props.ApiResourceObject(rawProductEntry.product),
        entities,
        customFields
      };

      this.setState({
        productEntry
      })
    })
  }

  render() {
    const productEntry = this.state.productEntry;

    if (!productEntry) {
      return null
    }

    if (!productEntry.product.name.startsWith('LG')) {
      return null
    }

    if (!productEntry.customFields) {
      return <Redirect to="/" />
    }

    const expectedUrl = `/products/${productEntry.product.id}-${productEntry.product.slug}`;

    if (this.props.match.url.split('?')[0] !== expectedUrl) {
      return <Redirect to={expectedUrl}/>
    }

    setTitle(productEntry.product.name);

    return <ProductDetail match={this.props.match} location={this.props.location} productEntry={productEntry} />
  }
}

function mapStateToProps(state, ownProps) {
  const {ApiResourceObject} = apiResourceStateToPropsUtils(state);

  const productEntries = state.productEntries || [];
  const productId = parseInt(ownProps.match.params.id, 10);
  const matchingProductEntry = productEntries.filter(productEntry => productEntry.product.id === productId)[0];

  return {
    ApiResourceObject,
    productEntry: matchingProductEntry
  }
}

export default connect(mapStateToProps)(ProductDetailLoader)
