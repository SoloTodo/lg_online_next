import React from 'react'
import {connect} from "react-redux";
import {withRouter} from 'next/router'

import './NavBarMobileSearch.css'

class NavBarMobileSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ''
    }
  }

  handleKeywordsChange = evt => {
    this.setState({
      keywords: evt.target.value
    });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();

    const keywords = this.state.keywords;
    if (keywords.length) {
      this.props.history.push(`/search?search=${encodeURIComponent(this.state.keywords)}`);
    }
  };


  render() {
    if (!this.props.isMobile) {
      return null
    }

    return <span className="navbar__mobile_search">
      <form action="/search" onSubmit={this.handleFormSubmit}>
        <input type="text" placeholder="¿Qué buscas?" className="form-control" name="search" value={this.state.keywords} onChange={this.handleKeywordsChange} />
        <button type="submit" className="navbar__mobile_search__submit">
          <i className="fas fa-search">&nbsp;</i>
        </button>
      </form>
    </span>
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.browser.lessThan.medium
  }
}

export default withRouter(connect(mapStateToProps)(NavBarMobileSearch))
