import React from 'react';
import {connect} from 'react-redux'
import RetinaImage from 'react-retina-image';
import Link from 'next/link';
import { withRouter } from 'next/router'
import {settings} from "../../settings";
import { isServer } from '../../utils';


class SlideStaticImage extends React.Component {
  handleClick = evt => {
    window.gtag('event', 'Expand', {
      send_to: settings.googleAnalyticsId,
      event_category: 'Banners',
      event_label: this.props.label,
    });
  };

  render() {
    let imageToDisplay = null;

    const conversionTuple = [
      [575, this.props.extraSmall],
      [767, this.props.small],
      [991, this.props.medium],
      [1199, this.props.large],
    ];

    const innerWidth = isServer ? 800 : window.innerWidth;

    for (const entry of conversionTuple) {
      if (innerWidth <= entry[0]) {
        imageToDisplay = entry[1];
        break;
      }
    }

    if (!imageToDisplay) {
      imageToDisplay = this.props.infinity
    }

    const linkTo = this.props.isMobile ?
        {
          pathname: this.props.mobileHref,
          state: {
            referrer: this.props.router.asPath
          }
        } :
        this.props.desktopHref;

    return <Link href={linkTo}>
      <div className="dynamic-banner" onClick={this.handleClick} className="d-flex flex-row justify-content-center w-100">
        <RetinaImage src={imageToDisplay} />
      </div>
    </Link>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    mediaType: state.browser.mediaType,
    isMobile: state.browser.lessThan.medium
  }
}

export default withRouter(connect(mapStateToProps)(SlideStaticImage))