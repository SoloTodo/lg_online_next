import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {settings} from "../../settings";

import './SubcategoryMenu.css'
import Link from 'next/link'
import { withRouter } from 'next/router'

class SubcategoryMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.router.asPath !== nextProps.router.asPath) {
      if (this.state.dropdownOpen) {
        this.setState({
          dropdownOpen: false
        });
      }
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    if (!this.props.categoryId) {
      return null
    }

    const categoryMetadata = settings.categoriesMetadata[this.props.categoryId] || {};
    const subcategories = categoryMetadata.subcategories || [];

    const subcategoryName = this.props.subcategory && this.props.subcategory.name;
    const selectedSubcategory = subcategories.filter(subcategory => subcategory.name === subcategoryName)[0];

    if (!subcategories.length) {
      return null
    }

    const caratClass = this.state.dropdownOpen ? 'fa-angle-up' : 'fa-angle-down';

    return <div className="subcategory_menu">
      <div className="subcategory_menu__title" onClick={this.toggle}>
        {selectedSubcategory ?
            <span>CATEGORÍA: {selectedSubcategory.label} </span> :
            <span>CATEGORÍAS </span>
        }
        <i className={classNames('fas', caratClass)}>&nbsp;</i>
      </div>
      <div className="subcategory_menu__dropdown-container">
      {this.state.dropdownOpen && <div className="subcategory_menu__dropdown">
        {subcategories.map(subcategory =>
          <div key={subcategory.name} className="subcategory_menu__link-container">
            <Link href={`/browse?section=${subcategory.slug}`} as={`/${subcategory.slug}`}><a>{subcategory.label}</a></Link>
          </div>
        )}
        <div className="subcategory_menu__link-container">
          <Link href={`/browse?section=${categoryMetadata.slug}`} as={`/${categoryMetadata.slug}`}><a>Ver Todos</a></Link>
        </div>
      </div>}
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.browser.lessThan.medium
  }
}

export default withRouter(connect(mapStateToProps)(SubcategoryMenu))