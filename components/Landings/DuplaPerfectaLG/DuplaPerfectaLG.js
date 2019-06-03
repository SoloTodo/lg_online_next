import React, {Component} from 'react';
import {connect} from "react-redux";
import Head from 'next/head'
import {withRouter} from "next/router";
import {withLgOnlineTracker} from '../../../utils';

import {settings} from "../../../settings";
import ProductBrowseResults from "../../Product/ProductBrowseResults";

import NavBar from "../../NavBar/NavBar";

class DuplaPerfectaLG extends Component {
  componentDidMount() {
    window.fnames = new Array();
    window.ftypes = new Array();
    window.fnames[1]='FNAME';
    window.ftypes[1]='text';
    window.fnames[2]='LNAME';
    window.ftypes[2]='text';
    window.fnames[0]='EMAIL';
    window.ftypes[0]='email';
    window.fnames[4]='PHONE';
    window.ftypes[4]='phone';
    window.fnames[3]='MMERGE3';
    window.ftypes[3]='dropdown';
    window.fnames[5]='MMERGE5';
    window.ftypes[5]='date';
    window.fnames[7]='MMERGE7';
    window.ftypes[7]='dropdown';
    window.fnames[6]='MMERGE6';
    window.ftypes[6]='number';
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

    return <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/static/landings/twin_wash/TwinWash.css" />
        <title key="title">Promoción Dupla Perfecta LG - LG Online</title>
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/DuplaPerfectaLG`} />
        <meta property="og:url" content={`${settings.domain}/DuplaPerfectaLG`} />
        <meta property="og:title" content="Promoción Dupla Perfecta LG" />
        <meta name="description" property="og:description" content="Promoción Dupla Perfecta LG" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content">

        <div className="content text-center">
          <a href="#mc_embed_signup"><img src={imageToDisplay} alt="Promoción Dupla Perfecta LG" className="img-fluid" /></a>
        </div>

        <div className="content text-center">
          <img src={sloganToDisplay} alt="Slogan" className="img-fluid" />
        </div>

        <ProductBrowseResults location={this.props.location} filteredProductEntries={filteredProductEntries} />

        <div className="duplaperfectalg-body mt-3">
          <div className="container">
            <div className="row">
              <div className="col-12 duplaperfectalg-body__content">
                <div id="mc_embed_signup">
                  <form
                    action="https://www.us18.list-manage.com/subscribe/post?u=66aa9e160932049f84283045a&amp;id=4d681f5e57"
                    method="post" id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form" className="validate"
                    target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">

                      <div className="indicates-required"><span
                        className="asterisk">*</span> Requeridos
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-FNAME">Nombre <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="FNAME"
                               className="required" id="mce-FNAME" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-LNAME">Apellido <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="LNAME"
                               className="required" id="mce-LNAME" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-EMAIL">Correo electrónico <span
                          className="asterisk">*</span>
                        </label>
                        <input type="email" name="EMAIL"
                               className="required email" id="mce-EMAIL" />
                      </div>
                      <div className="mc-field-group size1of2">
                        <label htmlFor="mce-PHONE">Número telefónico <span
                          className="asterisk">*</span>
                        </label>
                        <input type="text" name="PHONE" className="required"
                               id="mce-PHONE" />
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-MMERGE3">Producto LG <span
                          className="asterisk">*</span>
                        </label>
                        <select name="MMERGE3" className="required"
                                id="mce-MMERGE3">
                          <option value=""></option>
                          <option value="65UK6350PSC    ">65UK6350PSC</option>
                          <option value="65UK6550PSB    ">65UK6550PSB</option>
                          <option value="65UK7500PSA    ">65UK7500PSA</option>
                          <option value="65SK8000PSA     ">65SK8000PSA</option>
                          <option value="65SK8500PSA     ">65SK8500PSA</option>
                          <option value="65UM7650PSB">65UM7650PSB</option>
                          <option value="65SM9500PSA">65SM9500PSA</option>
                          <option value="65SM8100PSA">65SM8100PSA</option>
                          <option value="65SM8600PSA">65SM8600PSA</option>
                          <option value="65UM7400PSA">65UM7400PSA</option>
                          <option value="65UM7100PSA">65UM7100PSA</option>
                          <option value="70UK6550PSA  ">70UK6550PSA</option>
                          <option value="70UM7370PSA">70UM7370PSA</option>
                          <option value="75UK6570PSA    ">75UK6570PSA</option>
                          <option value="75SK8000PSA     ">75SK8000PSA</option>
                          <option value="75UM7570PSB">75UM7570PSB</option>
                          <option value="75UM7100PSA">75UM7100PSA</option>
                          <option value="86UK6570PSA    ">86UK6570PSA</option>
                          <option value="86SM9070PSA">86SM9070PSA</option>
                          <option value="OLED65C8PSA   ">OLED65C8PSA</option>
                          <option value="OLED65E8PSA   ">OLED65E8PSA</option>
                          <option value="OLED65W8PSA  ">OLED65W8PSA</option>
                          <option value="OLED65B9PSB">OLED65B9PSB</option>
                          <option value="OLED77C9PSB">OLED77C9PSB</option>
                          <option value="OLED65C9PSA">OLED65C9PSA</option>
                          <option value="OLED65W9PSA">OLED65W9PSA</option>
                          <option value="SK1        ">SK1</option>
                          <option value="SJ2        ">SJ2</option>
                          <option value="SK5        ">SK5</option>
                          <option value="SK5R     ">SK5R</option>
                          <option value="SK8        ">SK8</option>
                          <option value="SK4D">SK4D</option>
                          <option value="SL5Y">SL5Y</option>
                          <option value="SL6Y">SL6Y</option>
                          <option value="SL8YG">SL8YG</option>

                        </select>
                      </div>
                      <div className="mc-field-group size1of2">
                        <label htmlFor="mce-MMERGE5-month">Fecha de
                          compra <span className="asterisk">*</span>
                        </label>
                        <div className="datefield">
                          <span className="subfield dayfield"><input
                            className="datepart required" type="text"
                            pattern="[0-9]*" placeholder="DD" size="2"
                            maxLength="2" name="MMERGE5[day]"
                            id="mce-MMERGE5-day" /></span> /
                          <span className="subfield monthfield"><input
                            className="datepart required" type="text"
                            pattern="[0-9]*" placeholder="MM" size="2"
                            maxLength="2" name="MMERGE5[month]"
                            id="mce-MMERGE5-month" /></span> /
                          <span className="subfield yearfield"><input
                            className="datepart required" type="text"
                            pattern="[0-9]*" placeholder="YYYY"
                            size="4" maxLength="4" name="MMERGE5[year]"
                            id="mce-MMERGE5-year" /></span>
                          <span className="small-meta nowrap">( dd / mm / yyyy )</span>
                        </div>
                      </div>
                      <div className="mc-field-group">
                        <label htmlFor="mce-MMERGE7">Tienda <span
                          className="asterisk">*</span>
                        </label>
                        <select name="MMERGE7" className="required"
                                id="mce-MMERGE7">
                          <option value=""></option>
                          <option value="Falabella">Falabella</option>
                          <option value="Paris">Paris</option>
                          <option value="Ripley">Ripley</option>
                          <option value="ABCDIN">ABCDIN</option>
                          <option value="Corona">Corona</option>
                          <option value="Hites">Hites</option>
                          <option value="Líder">Líder</option>
                          <option value="Jumbo">Jumbo</option>
                          <option value="Sodimac">Sodimac</option>

                        </select>
                      </div>
                      <div className="mc-field-group size1of2">
                        <label htmlFor="mce-MMERGE6">Número de boleta <span
                          className="asterisk">*</span>
                        </label>
                        <input type="number" name="MMERGE6"
                               className="required"  id="mce-MMERGE6" />
                      </div>
                      <div className="mc-field-group input-group flex-column">
                        <ul>
                          <li><input type="checkbox" value="1"
                                     className="mr-2 required"
                                     name="group[4719][1]"
                                     id="mce-group[4719]-4719-0" /><label
                            htmlFor="mce-group[4719]-4719-0">
                            <strong>Acepto los <a href="/static/landings/dupla_perfecta_lg/Bases_Concurso_LG_COPA_AMERICA.pdf" target="_blank">términos legales de la promoción</a></strong>
                          </label>
                          </li>
                        </ul>
                      </div>
                      <div id="mce-responses" className="clear">
                        <div className="response" id="mce-error-response"></div>
                        <div className="response" id="mce-success-response"></div>
                      </div>
                      <div aria-hidden="true"><input type="text"
                                                     name="b_66aa9e160932049f84283045a_4d681f5e57"
                                                     tabIndex="-1"
                      id="custom-messages"/>
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
      </div>

      <script type='text/javascript' src='/static/js/mc-validate.js'></script>
    </React.Fragment>
  }
}

function mapStateToProps(state) {
  return {
    isMobile: state.browser.lessThan.medium,
    productEntries: state.productEntries
  }
}

function mapPropsToGAField(props) {
  return {
    pageTitle: 'Promoción Dupla Perfecta LG',
  }
}

const TrackedDuplaPerfectaLG = withLgOnlineTracker(DuplaPerfectaLG, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedDuplaPerfectaLG))
