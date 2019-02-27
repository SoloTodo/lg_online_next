import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import './DidVideoSlide.css'
import {connect} from "react-redux";
import {settings} from "../../../settings";
import { isServer } from '../../../react-utils/utils'

class DidVideoSlide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }
  }

  toggle = evt => {
    evt.preventDefault();

    this.setState({
      modal: !this.state.modal
    })
  };
  
  openVideoPopup = evt => {
    evt.preventDefault();

    window.gtag('event', 'Open', {
      send_to: settings.googleAnalyticsId,
      event_category: 'Youtube Video',
      event_label: this.props.caption,
    });

    this.setState({
      modal: true
    })
  };

  render() {
    let iframeWidth = 766;
    let iframeHeight = 431;

    const conversionTuple = [
      [575, 325, 183],
      [767, 466, 262],
      [991, 466, 262],
      [1199, 766, 431],
    ];

    const pageWidth = isServer ? 600 : window.innerWidth;

    for (const entry of conversionTuple) {
      if (pageWidth <= entry[0]) {
        iframeWidth = entry[1];
        iframeHeight = entry[2];
        break;
      }
    }

    return <div className="d-flex flex-column justify-content-center align-items-center text-center did-video-slide">
      <a href={`https://www.youtube.com/watch?v=${this.props.youtubeId}`} className="did-video-slide__thumbnail" onClick={this.openVideoPopup}>
        <img src={this.props.thumbnail} alt="Video thumbnail" />
      </a>
      <div className="did-video-slide__caption">
        <a href={`https://www.youtube.com/watch?v=${this.props.youtubeId}`} className="did-video-slide__thumbnail" onClick={this.openVideoPopup}>
          {this.props.caption}
        </a>
      </div>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
        <ModalHeader toggle={this.toggle}>{this.props.caption}</ModalHeader>
        <ModalBody>
          <div className="text-center">
          <iframe
            title={this.props.caption}
              width={iframeWidth} height={iframeHeight}
              src={`https://www.youtube.com/embed/${this.props.youtubeId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </ModalBody>
      </Modal>
    </div>
  }
}

function mapStatetoProps(state) {
  return {
    isMobile: state.browser.lessThan.medium
  }
}

export default connect(mapStatetoProps)(DidVideoSlide)
