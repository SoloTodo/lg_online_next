import React from 'react';
import {withRouter} from 'next/router'
import { connect } from 'react-redux'
import {lgonlineStateToPropsUtils} from "../redux-utils";
import NavBar from "../components/NavBar/NavBar";

class Browse extends React.Component {
  render() {
    return <React.Fragment>
      <NavBar />

      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>

      <h1>{this.props.category ? this.props.category.name : 'No category'}</h1>
      <h2>{this.props.subcategory ? this.props.subcategory.title : 'No subcategory'}</h2>
    </React.Fragment>
  }
}

function mapStateToProps(state, ownProps) {
  const { section } = ownProps.router.query;
  const { importantCategories } = lgonlineStateToPropsUtils(state);

  for (const category of importantCategories) {
    if (category.slug === section) {
      return {
        category,
        subcategory: null
      }
    }

    const subcategories = category.subcategories || [];

    for (const subcategory of subcategories) {
      if (subcategory.slug === section) {
        return {
          category,
          subcategory
        }
      }
    }
  }

  return {}
}

export default withRouter(connect(mapStateToProps)(Browse));