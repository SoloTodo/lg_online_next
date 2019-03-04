import React, {Component} from 'react';
import {connect} from "react-redux";
import Head from 'next/head'
import {withRouter} from "next/router";
import {withLgOnlineTracker} from '../../../utils';
import { isServer } from '../../../react-utils/utils'

import {settings} from "../../../settings";
import {toast} from "react-toastify";
import ProductBrowseResults from "../../Product/ProductBrowseResults";

import {Modal, ModalBody, ModalHeader} from "reactstrap";
import NavBar from "../../NavBar/NavBar";

class TwinWash extends Component {
  constructor(props) {
    super(props);

    if (!isServer) {
      window.fnames = [];
      window.ftypes = [];
      window.fnames[4]='NOMBRE';
      window.ftypes[4]='text';
      window.fnames[1]='APELLIDO';
      window.ftypes[1]='text';
      window.fnames[0]='EMAIL';
      window.ftypes[0]='email';
      window.fnames[2]='RUT';
      window.ftypes[2]='text';
      window.fnames[5]='FECHA';
      window.ftypes[5]='text';
      window.fnames[3]='BOLETA';
      window.ftypes[3]='text';
    }

    this.state = {
      loadingInvoiceModalOpen: false,
      firstName: '',
      lastName: '',
      email: '',
      rut: '',
      purchaseDate: '',
      invoiceUrl: '',
      validationScript: null
    }
  }

  handleFormChange = (fieldName, newValue) => {
    this.setState({
      [fieldName]: newValue
    })
  };

  handleFileChange = evt => {
    const files = evt.target.files;

    this.setState({
      loadingInvoiceModalOpen: true,
    }, () => {
      const formData = new FormData();
      formData.append("file", files[0]);

      fetch(`${settings.endpoint}files/`, {
        method: 'POST',
        body: formData
      }).then(res => res.json()
      ).then(res => {
        this.setState({
          loadingInvoiceModalOpen: false,
          invoiceUrl: res.url,
        })
      });
    })

  };

  handleFormSubmit = evt => {
    if (!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.rut || !this.state.purchaseDate || !this.state.invoiceUrl) {
      evt.preventDefault();
      return
    }

    window.gtag('event', 'Submit', {
      send_to: settings.googleAnalyticsId,
      event_category: 'TwinWashForm',
      event_label: 'TwinWash form submitted',
    });

    toast.success('¡Gracias por inscribirse!', {autoClose: false});

    return true;
  };

  componentDidMount() {
    this.setState({
      validationScript: <script type='text/javascript' src='/static/js/mc-validate.js'></script>
    })
  }

  render() {
    const productIds = [47838, 41627, 47541, 41629, 41628];
    const filteredProductEntries = this.props.productEntries.filter(
      productEntry => productIds.includes(productEntry.product.id)
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id));

    const imageToDisplay = this.props.isMobile ?
      '/static/landings/twin_wash/TwinWash-mobile.jpg' :
      '/static/landings/twin_wash/TwinWash-desktop.jpg';
    const sloganToDisplay = this.props.isMobile ?
      '/static/landings/twin_wash/slogan-mobile.jpg' :
      '/static/landings/twin_wash/slogan-desktop.jpg';
    const footerToDisplay = this.props.isMobile ?
      '/static/landings/twin_wash/LgPremium-mobile.jpg' :
      '/static/landings/twin_wash/LgPremium-desktop.jpg';

    return <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/static/landings/twin_wash/TwinWash.css" />
        {this.state.validationScript}

        <title key="title">Promoción LG TWIN Wash - LG Online</title>
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/twinwash`} />
        <meta property="og:url" content={`${settings.domain}/twinwash`} />
        <meta property="og:title" content="Promoción LG TWIN Wash" />
        <meta name="description" property="og:description" content="Promoción LG TWIN Wash" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">

        <div className="content text-center">
          <a href="#mc_embed_signup"><img src={imageToDisplay} alt="Promoción LG TwinWash" className="img-fluid" /></a>
        </div>

        <div className="content text-center">
          <img src={sloganToDisplay} alt="Slogan" className="img-fluid" />
        </div>

        <ProductBrowseResults location={this.props.location} filteredProductEntries={filteredProductEntries} />

        <div className="renuevate-body mt-3">
          <div className="container">
            <div className="row">
              <div className="col-12 renuevate-body__content">
                <div className="text-center">
                  <img src="/static/landings/twin_wash/form-header.jpg" alt="REGISTRA TU COMPRA Y PARTICIPA POR TRES MICROONDAS LG NEOCHEF" className="img-fluid" />
                </div>

                <div id="mc_embed_signup">
                  <form
                    action="https://www.us18.list-manage.com/subscribe/post?u=66aa9e160932049f84283045a&amp;id=d850fbb8e7"
                    method="post" id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form" className="validate"
                    target="_blank" noValidate onSubmit={this.handleFormSubmit}>
                    <div id="mc_embed_signup_scroll">
                      <div className="mc-field-group">
                        <label htmlFor="mce-NOMBRE">Nombre <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="NOMBRE" value={this.state.firstName} onChange={evt => this.handleFormChange('firstName', evt.target.value)}
                               className="required" id="mce-NOMBRE" placeholder="Ingresa tu nombre" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-APELLIDO">Apellido <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="APELLIDO" value={this.state.lastName} onChange={evt => this.handleFormChange('lastName', evt.target.value)}
                               className="required" id="mce-APELLIDO" placeholder="Ingresa tu apellido" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">E-mail <span
                          className="asterisk">*</span>
                        </label>
                        <input type="email" name="EMAIL" value={this.state.email} onChange={evt => this.handleFormChange('email', evt.target.value)}
                               className="required email" id="mce-EMAIL" placeholder="Ingresa tu e-mail" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-RUT">RUT <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="RUT" value={this.state.rut} onChange={evt => this.handleFormChange('rut', evt.target.value)}
                               className="required" id="mce-RUT" placeholder="Ingresa tu RUT" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-FECHA">Fecha de compra <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="FECHA" value={this.state.purchaseDate} onChange={evt => this.handleFormChange('purchaseDate', evt.target.value)}
                               className="required" id="mce-FECHA" placeholder="Ingresa la fecha de compra" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-INVOICE">Boleta o comprobante de compra <span
                          className="asterisk">*</span></label>
                        <input type="file"
                               id="mce-INVOICE"
                               required={true}
                               onChange={this.handleFileChange}
                        />
                      </div>
                      <div id="mce-responses" className="clear">
                        <div className="response" id="mce-error-response">&nbsp;</div>
                        <div className="response" id="mce-success-response">&nbsp;</div>
                      </div>
                      <div className="clear">
                        <input type="submit"
                               value="Enviar »"
                               name="subscribe"
                               id="mc-embedded-subscribe"
                               className="button" /></div>
                    </div>

                    <p>Promoción sujeta a las <a href="/static/landings/twin_wash/bases_twinwash.pdf">Bases Concurso LG – CAMPAÑA TWINWASH</a></p>

                    <input type="hidden" name="BOLETA" value={this.state.invoiceUrl}
                           className="required" id="mce-BOLETA" />
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="twinwash__footer text-center">
          <a href="https://www.lgpremiumcare.cl/">
            <img src={footerToDisplay} alt="Premium care" className="img-fluid" />
          </a>
        </div>

        <Modal isOpen={this.state.loadingInvoiceModalOpen}>
          <ModalHeader>Subiendo archivo</ModalHeader>
          <ModalBody>
            Por favor espera un momento mientras cargamos tu boleta
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.browser.lessThan.medium,
    mediaType: state.browser.mediaType,
    productEntries: state.productEntries
  }
}

function mapPropsToGAField(props) {
  return {
    pageTitle: 'Promoción LG TWIN Wash',
  }
}

const TrackedTwinWash = withLgOnlineTracker(TwinWash, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedTwinWash))
