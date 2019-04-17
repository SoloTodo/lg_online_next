import React from 'react';
import {connect} from 'react-redux'
import {settings} from '../../settings'
import ProductBrowseResult from "./ProductBrowseResult";
import queryString from 'query-string';

import ProductBrowseSelectedResult from "./ProductBrowseSelectedResult";
import {listToObject, isServer} from "../../react-utils/utils";
import {lgonlineStateToPropsUtils} from "../../redux-utils";
import Router from "next/router";


class ProductBrowseResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProductEntry: null
    };

    this.routeChangeHandler = () => this.componentUpdate();

    this.state = {
      filteredProductEntries: this.getFilteredProductEntries(props)
    }
  }

  componentDidMount() {
    this.componentUpdate();

    Router.events.on('routeChangeComplete', this.routeChangeHandler);

    window.fbq('track', 'ViewContent', {
      content_type: 'product_group',
      content_ids: this.state.filteredProductEntries.map(productEntry => productEntry.product.id)
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.subcategory !== nextProps.subcategory ||
      this.props.categoryId !== nextProps.categoryId ||
      this.props.filteredProductEntries !== nextProps.filteredProductEntries) {
      const filteredProductEntries = this.getFilteredProductEntries(nextProps);

      this.setState({
        filteredProductEntries
      });

      window.fbq('track', 'ViewContent', {
        content_type: 'product_group',
        content_ids: filteredProductEntries.map(productEntry => productEntry.product.id)
      });
    }
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.routeChangeHandler);
  }

  getFilteredProductEntries(props) {
    let filteredProductEntries = [];
    const categoriesDict = props.categoriesDict;

    if (props.filteredProductEntries) {
      filteredProductEntries = props.filteredProductEntries
    } else {
      if (props.subcategory) {
        filteredProductEntries = props.productEntries.filter(productEntry => productEntry.customFields.subcategory === props.subcategory.name)
      } else if (props.categoryId) {
        filteredProductEntries = props.productEntries.filter(productEntry => categoriesDict[productEntry.product.category].id === props.categoryId)
      } else {
        filteredProductEntries = props.productEntries.filter(productEntry => productEntry.customFields.frontpageOrdering)
      }

      const orderingField = props.subcategory || props.categoryId ? 'categoryOrdering' : 'frontpageOrdering';

      filteredProductEntries.sort((a, b) => {
        const aOrdering = a.customFields[orderingField] || 10000;
        const bOrdering = b.customFields[orderingField] || 10000;

        return aOrdering - bOrdering;
      });
    }

    if (props.highlightedStoreId) {
      filteredProductEntries = filteredProductEntries.map(filteredProductEntry => ({
        ...filteredProductEntry,
        entities: filteredProductEntry.entities.filter(entity => this.props.storesDict[entity.store].id === this.props.highlightedStoreId)
      })).filter(filteredProductEntry => filteredProductEntry.entities.length > 0);
    }

    return filteredProductEntries;
  }

  componentUpdate() {
    if (this.props.isMobile) {
      return
    }

    const parameters = queryString.parse(window.location.search);

    if (!parameters.product) {
      return
    }

    const productId = parseInt(parameters.product, 10);
    const matchingEntry = this.state.filteredProductEntries.filter(productEntry => productEntry.product.id === productId)[0];

    if (!matchingEntry) {
      return
    }
    setTimeout(() => {
      this.setState({
        selectedProductEntry: matchingEntry
      }, () => {
        if (process.browser) {
          const scrollToComponent = require("react-scroll-to-component");

          scrollToComponent(this.SelectedResultContainer, {
            offset: -80,
            align: 'top'
          });
        }
      });
    }, 1000)
  }

  handleWtbClick = (evt, productEntry) => {
    if (process.browser) {
      const scrollToComponent = require("react-scroll-to-component");

      evt.preventDefault();

      const category = this.props.categoriesDict[productEntry.product.category];

      window.gtag('event', 'Expand', {
        send_to: settings.googleAnalyticsId,
        dimension1: productEntry.product.name,
        dimension2: category.name,
        event_category: 'Cells',
        event_label: productEntry.product.name,
      });

      this.setState({
        selectedProductEntry: productEntry
      }, () => {
        if (productEntry) {
          scrollToComponent(this.SelectedResultContainer, {
            offset: -70,
            align: 'top'
          });
        }
      });
    }
  };

  closeCard = () => {
    const category = this.props.categoriesDict[
      this.state.selectedProductEntry.product.category
      ];

    window.gtag('event', 'Collapse', {
      send_to: settings.googleAnalyticsId,
      dimension1: this.state.selectedProductEntry.product.name,
      dimension2: category.name,
      event_category: 'Cells',
      event_label: this.state.selectedProductEntry.product.name,
    });

    this.setState({
      selectedProductEntry: null
    })
  };

  render() {
    const groupedProductEntries = [];
    const categoriesDict = this.props.categoriesDict;

    for (const productEntry of this.state.filteredProductEntries) {
      let groupingField = null;
      if (!this.props.disableGrouping) {
        const category = categoriesDict[productEntry.product.category];
        groupingField = settings.categoriesMetadata[category.id].groupingField || null
      }

      const groupingKey = groupingField ? productEntry.product.specs[groupingField] : productEntry.product.instance_model_id;
      const matchingGroup = groupedProductEntries.filter(group => group.key === groupingKey)[0];
      if (matchingGroup) {
        matchingGroup.productEntries.push(productEntry)
      } else {
        groupedProductEntries.push({
          key: groupingKey,
          productEntries: [productEntry]
        })
      }
    }

    const cells = groupedProductEntries.map(group => <ProductBrowseResult
      key={group.key}
      productEntries={group.productEntries}
      onWtbClick={this.handleWtbClick}
      highlightedStoreId={this.props.highlightedStoreId}
    />);

    for (let i = 0; i < 0; i++) {
      cells.push(<div key={i} className="category-browse-dummy">&nbsp;</div>)
    }

    const containerWidth = isServer ? 800 : Math.min(document.documentElement.clientWidth, 1920)

    const rowSize = Math.floor(containerWidth / 350);
    const selectedProductEntry = this.state.selectedProductEntry;

    if (selectedProductEntry) {
      let selectedProductEntryIndex = -1;

      for (const idx of groupedProductEntries.keys()) {
        const entry = groupedProductEntries[idx];

        if (entry.productEntries.some(productEntry => productEntry.product.id === selectedProductEntry.product.id)) {
          selectedProductEntryIndex = idx
        }
      }

      if (selectedProductEntryIndex >= 0) {
        let targetPosition = rowSize * parseInt(selectedProductEntryIndex / rowSize, 10) + rowSize;

        const selectedResult = <ProductBrowseSelectedResult
          key="selected_result"
          productEntry={selectedProductEntry}
          highlightedStoreId={this.props.highlightedStoreId}
          onDismiss={this.closeCard}
          ref={(div) => {this.SelectedResultContainer = div;}}
        />;

        cells.splice(targetPosition, 0, selectedResult)
      }
    }

    return <div className="product-browse-results d-flex flex-row flex-wrap justify-content-around mt-3">
      {cells.map(cell => cell)}
    </div>
  }
}

function mapStateToProps(state) {
  const { categories, stores } = lgonlineStateToPropsUtils(state);

  return {
    productEntries: state.productEntries,
    mediaType: state.browser.mediaType,
    isMobile: state.browser.lessThan.medium,
    categoriesDict: listToObject(categories, 'url'),
    storesDict: listToObject(stores, 'url'),
  }
}

export default connect(mapStateToProps)(ProductBrowseResults)