import React from 'react'
import { connect } from 'react-redux'

import "../styles.scss"

class Index extends React.Component {
  render () {
    return <ul>
      {Object.keys(this.props.apiResourceObjects).map(apiResourceObject =>
        <li key={apiResourceObject}>{apiResourceObject}</li>
      )}
    </ul>
  }
}

function mapStateToProps(state) {
  return {
    apiResourceObjects: state.apiResourceObjects
  }
}

export default connect(mapStateToProps)(Index)
