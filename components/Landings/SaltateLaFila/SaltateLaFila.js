import React from 'react'

import './SaltateLaFila.css'
import Link from "next/link";
import Head from 'next/head'
import {Navbar} from "reactstrap";

class SaltateLaFila extends React.Component {
  render() {
    return <div id="saltate-la-fila">
      <Head>
        <title>#SaltateLaFila este Cyber - LG Online</title>
        <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css" />
      </Head>

      <Navbar id="navbar" color="dark" dark expand="md" fixed="top">
        <Link href="/browse" as="/">
          <a className="navbar__brand">
            <img src="/static/img/logo.png" alt="LG Logo" width="80" height="35" />
          </a>
        </Link>
      </Navbar>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>#<strong>SALTATE</strong>LA<strong>FILA</strong></h1>
            <h2>EN ESTE CYBER HAY OFERTAS QUE TE ESPERAN</h2>

            <div className="content-box">
              <div className="subtitle">REGÍSTRATE ACÁ</div>
              <div className="instructions">
                y podrás recibir directamente en tu correo un catálogo con los
                productos que estás esperando.
              </div>

              <div id="mc_embed_signup">
                <form
                  action="https://www.us18.list-manage.com/subscribe/post?u=66aa9e160932049f84283045a&amp;id=ecbc334101"
                  method="post" id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form" className="validate"
                  target="_blank" noValidate>
                  <div id="mc_embed_signup_scroll">
                    <div className="mc-field-group">
                      <label htmlFor="mce-FNAME" className="name-email-label">NOMBRE</label>
                      <input type="text" name="FNAME" className=""
                             id="mce-FNAME"
                             placeholder="Ingresa tu nombre"/>
                    </div>
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL" className="name-email-label">EMAIL</label>
                      <input type="email" name="EMAIL"
                             className="required email" id="mce-EMAIL"
                             placeholder="Ingresa tu email"/>
                    </div>
                    <div className="mc-field-group input-group">
                      <p className="categories-title">ELIGE TUS CATEGORÍAS DE INTERÉS</p>
                      <ul className="d-flex flex-row flex-wrap">
                        <li><label htmlFor="mce-group[4691]-4691-0" className="control control-checkbox">
                          Televisores
                          <input type="checkbox" value="1"
                                 name="group[4691][1]"
                                 id="mce-group[4691]-4691-0" />
                          <div className="control_indicator"></div>
                        </label>
                        </li>
                        <li>
                          <label htmlFor="mce-group[4691]-4691-1" className="control control-checkbox">
                            Refrigeradores
                            <input type="checkbox" value="2"
                                   name="group[4691][2]"
                                   id="mce-group[4691]-4691-1" />
                            <div className="control_indicator"></div>
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="mce-group[4691]-4691-2" className="control control-checkbox">
                            Lavadoras
                            <input type="checkbox" value="4"
                                   name="group[4691][4]"
                                   id="mce-group[4691]-4691-2" />
                            <div className="control_indicator"></div>
                          </label>
                        </li>
                        <li>
                          <label htmlFor="mce-group[4691]-4691-3" className="control control-checkbox">
                            Audio
                            <input type="checkbox" value="8"
                                   name="group[4691][8]"
                                   id="mce-group[4691]-4691-3" />
                            <div className="control_indicator"></div>
                          </label></li>
                        <li>
                          <label htmlFor="mce-group[4691]-4691-4" className="control control-checkbox">
                            Celulares
                            <input type="checkbox" value="16"
                                   name="group[4691][16]"
                                   id="mce-group[4691]-4691-4" />
                            <div className="control_indicator"></div>
                          </label>
                        </li>
                        <li><label htmlFor="mce-group[4691]-4691-5" className="control control-checkbox">
                          Monitores
                          <input type="checkbox" value="32"
                                 name="group[4691][32]"
                                 id="mce-group[4691]-4691-5" />
                          <div className="control_indicator"></div>
                        </label></li>
                      </ul>
                    </div>
                    <div id="mce-responses" className="clear">
                      <div className="response" id="mce-error-response"></div>
                      <div className="response" id="mce-success-response"></div>
                    </div>
                    <div
                      id="custom-messages"
                      aria-hidden="true"><input type="text"
                                                name="b_66aa9e160932049f84283045a_ecbc334101"
                                                tabIndex="-1" value="" /></div>
                    <div className="clear"><input type="submit" value="REGÍSTRATE"
                                                  name="subscribe"
                                                  id="mc-embedded-subscribe"
                                                  className="button btn-primary" /></div>
                  </div>
                </form>
              </div>
            </div>

            <img src="/static/landings/saltate_la_fila/desktop-bg.jpg" className="img-fluid d-lg-none" />
          </div>
        </div>
      </div>

      <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script>
      <script type='text/javascript' src="/static/landings/saltate_la_fila/mailchimp_fields.js"></script>
    </div>
  }
}

export default SaltateLaFila;