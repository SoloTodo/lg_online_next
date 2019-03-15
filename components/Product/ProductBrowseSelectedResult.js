import React from 'react'
import {connect} from 'react-redux'
import {lgonlineStateToPropsUtils} from "../../redux-utils";

import ImageGallery from "react-image-gallery";
import ProductSpecEntries from "./ProductSpecEntries";
import {fetchJson, listToObject} from "../../react-utils/utils";
import Link from 'next/link';
import { withRouter } from 'next/router';
import ProductPricingTable from "./ProductPricingTable";

class ProductBrowseSelectedResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      additionalPictures: []
    }
  }

  componentDidMount() {
    this.componentUpdate(this.props.productEntry);

    window.fbq('track', 'ViewContent', {
      content_type: 'product',
      content_ids: this.props.productEntry.product.id
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.productEntry !== nextProps.productEntry) {
      this.setState({
        additionalPictures: []
      }, () => this.componentUpdate(nextProps.productEntry))
    }
  }

  componentUpdate(productEntry) {
    fetchJson(`product_pictures/?products=${productEntry.product.id}`).then(rawPictures => {
      this.setState({
        additionalPictures: rawPictures.results
      })
    })
  }

  handleDismiss = evt => {
    evt.preventDefault();
    this.props.onDismiss();
  };

  render() {
    const productEntry = this.props.productEntry;

    const images = [{
      original: `${productEntry.product.url}picture/?image_format=JPEG&quality=80&width=635&height=580`,
      thumbnail: `${productEntry.product.url}picture/?image_format=JPEG&quality=80&width=635&height=580`,
    }];

    for (const additionalPicture of this.state.additionalPictures) {
      images.push({
        original: `${additionalPicture.url}thumbnail/?image_format=JPEG&quality=80&width=635&height=580`,
        thumbnail: `${additionalPicture.url}thumbnail/?image_format=JPEG&quality=80&width=635&height=580`,
      })
    }

    const firstLine = productEntry.customFields.customTitle ? productEntry.customFields.customTitle : productEntry.product.name;
    const secondLine = productEntry.customFields.customTitle ? productEntry.product.name : null;

    const formattedPrice = this.props.priceFormatter(productEntry.entities[0].active_registry.offer_price).replace('$ ', '');

    const hrefSuffix = this.props.highlightedStoreId ? `highlighted_store=${this.props.highlightedStoreId}` : null;
    const linkAs = `/products/${productEntry.product.id}-${productEntry.product.slug}${hrefSuffix ? '?' + hrefSuffix : ''}`;
    const linkHref = `/products?product=${productEntry.product.id}&slug=${productEntry.product.slug}${hrefSuffix ? '&' + hrefSuffix : ''}`;

    return <div className="product-browse-selected-result d-flex flex-column justify-content-center">
      <div className="product-browse-selected-result__inner container">
        <div className="row">
          <div className="col-md-12 col-lg-7">
            <div
              className="d-flex flex-row justify-content-center align-items-center">
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
                showThumbnails={this.props.largeOrLarger}
              />
            </div>
          </div>
          <div className="col-md-12 d-flex flex-column col-lg-5">
            <div className="product-browse-selected-result__first-line">{firstLine}</div>
            <div className="product-browse-selected-result__second-line">{secondLine}</div>

            <div className="product-browse-selected-result__specs">
              <ProductSpecEntries productEntry={productEntry}/>
            </div>

            <div className="d-flex flex-row align-items-end mt-2">
              {!this.props.highlightedStoreId && <span className="product-browse-selected-result__price-from">DESDE</span>}
              <span className="product-browse-selected-result__price-sign">$</span>
              <span className="product-browse-selected-result__price-value">{formattedPrice}</span>
            </div>
            <span className="product-browse-selected-result__slogan">COMPARA, ENAMÓRATE Y ¡LLÉVATELO!</span>

            <ProductPricingTable productEntry={productEntry} />

            <div className="d-flex flex-column align-items-center">
              <div className="product-detail-desktop__endbar">&nbsp;</div>
            </div>

            <div className="mt-auto">&nbsp;</div>
            <div className="product-detail-desktop__more-information mt-2 mb-2 align-self-end">
              <Link href={linkHref} as={linkAs}>
                <a className="d-flex flex-row align-items-center">
                  <span className="product-detail-desktop__more-information-symbol">
                    <i className="fas fa-plus-circle">&nbsp;</i>
                  </span>
                  <span className="product-detail-desktop__more-information-label">
                    MÁS INFORMACIÓN
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="product-detail-desktop__close">
          <a href="." onClick={this.handleDismiss}><i className="fas fa-times"></i></a>
        </div>
      </div>
    </div>
  }
}

function mapStateToProps(state) {
  const {priceFormatter, stores} = lgonlineStateToPropsUtils(state);

  return {
    priceFormatter,
    largeOrLarger: state.browser.greaterThan.medium,
    storesDict: listToObject(stores, 'url')
  }
}

export default withRouter(connect(mapStateToProps)(ProductBrowseSelectedResult))