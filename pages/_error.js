import React from 'react'
import Head from "next/head";
import {settings} from "../settings";
import NavBar from "../components/NavBar/NavBar";

class ErrorPage extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    const errorTitle = this.props.statusCode === 404 ? 'Página no encontrada' : 'Error desconocido';

    return <React.Fragment>
      <Head>
        <title key="title">{errorTitle} - LG Online</title>
        <meta property="og:title" content={errorTitle} />
        <meta property="og:type" content="website" />
        <meta name="description" property="og:description" content={errorTitle} />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <NavBar />

      <div id="content" className="container error_page">
        <div className="row">
          <div className="col-12">
            <h1 className="text-primary mt-3">{errorTitle}</h1>

            <hr />

            {this.props.statusCode === 404 ?
              'No hemos podido encontrar la pagina que buscabas, lo sentimos! Puedes usar el menú superior para seguir cotizando productos LG.' :
              'Ocurrió un error mientras procesábamos tu solicitud, lo sentimos! Puedes usar el menú superior para seguir cotizando productos LG.'}
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

export default ErrorPage
