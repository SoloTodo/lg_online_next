import React from 'react';
import {fetchJson} from "../react-utils/utils";
import ImageGallery from "react-image-gallery";
import {connect} from 'react-redux';

import "react-image-gallery/styles/css/image-gallery.css";
import './ProductDetailPictures.css'

class ProductDetailPictures extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      additionalPictures: []
    }
  }

  componentDidMount() {
    this.componentUpdate(this.props.product)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.product.id !== nextProps.product.id) {
      this.setState({
        additionalPictures: []
      }, () => this.componentUpdate(nextProps.product))
    }
  }

  componentUpdate(product) {
    fetchJson(`product_pictures/?products=${product.id}`).then(rawPictures => {
      this.setState({
        additionalPictures: rawPictures.results
      })
    })
  }

  render() {
    const width = this.props.isMobile ? 660 : 570;
    const height = this.props.isMobile ? 660 : 570;

    const images = [{
      original: `${this.props.product.url}picture/?width=${width}&height=${height}`,
      thumbnail: `${this.props.product.url}picture/?width=${width}&height=${height}`,
    }];

    for (const additionalPicture of this.state.additionalPictures) {
      images.push({
        original: `${additionalPicture.url}thumbnail/?width=${width}&height=${height}`,
        thumbnail: `${additionalPicture.url}thumbnail/?width=${width}&height=${height}`,
      })
    }

    return <ImageGallery
        items={images}
        showPlayButton={false}
        showThumbnails={!this.props.isMobile}
        showFullscreenButton={this.props.isMobile}
    />
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.browser.lessThan.medium
  }
}

export default connect(mapStateToProps)(ProductDetailPictures);
