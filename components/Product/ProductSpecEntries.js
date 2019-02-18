import React from 'react';
import {connect} from 'react-redux';
import {settings} from "../../settings";
import {lgonlineStateToPropsUtils} from "../../redux-utils";
import {listToObject} from "../../react-utils/utils";

class ProductSpecEntries extends React.Component {
  render() {
    const productEntry = this.props.productEntry;
    const category = this.props.categoriesDict[productEntry.product.category];

    const categoryMetadata = settings.categoriesMetadata[category.id];
    const specsTemplates = categoryMetadata.specsTemplates || [];
    const specEntries = specsTemplates
      .map(specsTemplate => specsTemplate(productEntry))
      .filter(specEntry => specEntry.length);

    return <ul>
      {specEntries.map(specEntry => <li key={specEntry}>{specEntry}</li>)}
    </ul>
  }
}

function mapStateToProps(state) {
  const {categories} = lgonlineStateToPropsUtils(state);

  return {
    categoriesDict: listToObject(categories, 'url')
  }
}

export default connect(mapStateToProps)(ProductSpecEntries)