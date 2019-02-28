import React from 'react';
import {connect} from 'react-redux'
import Link from 'next/link';
import {settings} from "../../settings";


class SlideStaticImage extends React.Component {
  handleClick = evt => {
    window.gtag('event', 'Expand', {
      send_to: settings.googleAnalyticsId,
      event_category: 'Banners',
      event_label: this.props.label,
    });
  };

  render() {
    const linkAs = this.props.isMobile ? this.props.mobileAs : this.props.desktopAs;
    const linkHref = this.props.isMobile ? this.props.mobileHref : this.props.desktopHref;

    return <Link href={linkHref} as={linkAs}>
      <div onClick={this.handleClick} className="d-flex dynamic-banner flex-row justify-content-center w-100">
        <picture>
          <source media="(max-width: 575px)"
                  srcSet={`${this.props.extraSmall[0]}, ${this.props.extraSmall[1]} 2x`} />
          <source media="(max-width: 767px)"
                  srcSet={`${this.props.small[0]}`} />
          <source media="(max-width: 991px)"
                  srcSet={`${this.props.medium[0]}`} />
          <source media="(max-width: 1199px)"
                  srcSet={`${this.props.large[0]}`} />
          <source media="(max-width: 10000px)"
                  srcSet={`${this.props.infinity[0]}`} />
          <img src={this.props.extraSmall[0]} />
        </picture>
      </div>
    </Link>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isMobile: state.browser.lessThan.medium
  }
}

export default connect(mapStateToProps)(SlideStaticImage)