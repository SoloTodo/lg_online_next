import React from 'react'
import {connect} from 'react-redux'
import Head from 'next/head'
import {withRouter} from 'next/router'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Slider from "react-slick";
import PlanPerfectoPrevArrow from "./PlanPerfectoPrevArrow";
import PlanPerfectoNextArrow from "./PlanPerfectoNextArrow";
import NavBar from '../../NavBar/NavBar';
import {settings} from "../../../settings";
import {withLgOnlineTracker} from "../../../utils";


class PlanPerfecto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      validationScript: null
    }
  }

  componentDidMount() {
    this.setState({
      validationScript: <script type='text/javascript' src='/static/js/mc-validate.js'></script>
    })
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  };

  handleFormSubmit = () => {
    window.gtag('event', 'Submit', {
      send_to: settings.googleAnalyticsId,
      event_category: 'PlanPerfectoForm',
      event_label: 'PlanPerfecto form submitted',
    });

    return true;
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <PlanPerfectoNextArrow/>,
      prevArrow: <PlanPerfectoPrevArrow/>,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return <React.Fragment>
      <Head>
        <title key="title">Promoción LG Plan Perfecto</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${settings.domain}/planperfecto`} />
        <meta property="og:title" content="Promoción LG Plan Perfecto" />
        <meta property="og:description" content="Encuentra las mejores promociones en celulares LG" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />

        {this.state.validationScript}
      </Head>

      <NavBar />

      <div id="content">

        <div className="text-center">
          {this.props.isMobile ? <div>
              <img src="/static/landings/plan_perfecto/planperfecto_mobile.jpg" className="img-fluid" alt="Plan Perfecto"/>
              <div className="planperfecto-slider">
                <Slider {...settings}>
                  <img src="/static/landings/plan_perfecto/planperfecto_mobile_1.jpg" alt="LG G7" />
                  <img src="/static/landings/plan_perfecto/planperfecto_mobile_2.jpg" alt="LG Q Stylus+" />
                  <img src="/static/landings/plan_perfecto/planperfecto_mobile_3.jpg" alt="LG Q7+" />
                </Slider>
              </div>
            </div> :
            <img src="/static/landings/plan_perfecto/planperfecto_desktop.jpg" className="img-fluid" alt="Plan Perfecto"/>
          }
        </div>

        <div className="planperfecto-form">
          <div className="container">
            <div className="row">
              <div className="col-12 planperfecto-form__content d-flex flex-column align-items-center">
                <h1>PARTICIPA POR UN LG Q7 Y UNA GIFT CARD INGRESANDO TUS DATOS</h1>

                <div id="mc_embed_signup">
                  <form
                    action="https://www.us18.list-manage.com/subscribe/post?u=66aa9e160932049f84283045a&amp;id=9ffc5a999c"
                    method="post" id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form" className="validate"
                    target="_blank" noValidate onSubmit={this.handleFormSubmit}>
                    <div id="mc_embed_signup_scroll">

                      <div className="mc-field-group">
                        <label htmlFor="mce-NOMBRE">Nombre Completo </label>
                        <input type="text" name="NOMBRE"
                               className="required" id="mce-NOMBRE" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-NBOLETA">Número de Boleta </label>
                        <input type="text" name="NBOLETA"
                               className="required" id="mce-NBOLETA" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-NIMEI" className="d-flex flex-row align-items-center justify-content-center">IMEI Teléfono <i
                          className="fas fa-question-circle imei-question" onClick={this.toggleModal}>&nbsp;</i></label>
                        <input type="text" name="NIMEI"
                               className="required" id="mce-NIMEI" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-PREMIO">Premio </label>
                        <select name="PREMIO" className="required"
                                id="mce-PREMIO">
                          <option value=""></option>
                          <option value="Gift Card">Gift Card</option>
                          <option value="LG Q7">LG Q7</option>

                        </select>
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">Mail </label>
                        <input type="email" name="EMAIL"
                               className="required email" id="mce-EMAIL" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-TELEFONO">Teléfono </label>
                        <input type="text" name="TELEFONO"
                               className="required" id="mce-TELEFONO" />
                      </div>
                      <div id="mce-responses" className="clear">
                        <div className="response" id="mce-error-response"></div>
                        <div className="response" id="mce-success-response"></div>
                      </div>
                      <div className="clear"><input type="submit"
                                                    value="Enviar"
                                                    name="subscribe"
                                                    id="mc-embedded-subscribe"
                                                    className="button" /></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>¿Cómo saber el IMEI de mi teléfono?</ModalHeader>
          <ModalBody>
            Para conocer el IMEI de tu teléfono basta con llamar al <strong>*#06#</strong> desde el mismo equipo.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>¡Entendido!</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.browser.lessThan.medium
  }
}

const TrackedPlanPerfecto = withLgOnlineTracker(PlanPerfecto);
export default withRouter(connect(mapStateToProps)(TrackedPlanPerfecto))