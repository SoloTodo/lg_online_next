import React from 'react';
import {withRouter} from 'next/router'
import Link from 'next/link'
import {withLgOnlineTracker} from "../../../utils";

import {settings} from "../../../settings";
import Head from "next/head";

class OledN1 extends React.Component {
  render() {
    return <React.Fragment>
      <Head>
        <title key="title">Promoción LG OLED N1</title>
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/oledn1`} />
        <meta property="og:url" content={`${settings.domain}/oledn1`} />
        <meta property="og:title" content="Promoción LG OLED N1" />
        <meta name="description" property="og:description" content="Promoción LG OLED N1" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <div className="text-center">
        <img src="/static/landings/oled_n1/desktop_1.jpg" className="img-fluid" alt="Header televisores OLED LG" />
        <a href="https://www.lg.com/cl/ConsumerReport/ConsumerReport2018/Consumer_Reports_TV_2018.html" target="_blank">
          <img src="/static/landings/oled_n1/desktop_2.jpg" className="img-fluid" alt="Consumer reports OLED LG" />
        </a>
        <Link href="/browse?section=televisores_oled_4k" as="/televisores_oled_4k">
          <a>
            <img src="/static/landings/oled_n1/desktop_3.jpg" className="img-fluid" alt="Productos OLED LG" />
          </a>
        </Link>
        <img src="/static/landings/oled_n1/desktop_4.jpg" className="img-fluid" alt="Características televisores OLED LG" />
        <a href="https://lgpremiumcare.cl/" target="_blank">
          <img src="/static/landings/oled_n1/desktop_5.jpg" className="img-fluid" alt="LG Premium Care" />
        </a>
      </div>
    </React.Fragment>
  }
}

function mapPropsToGAField(props) {
  return {
    pageTitle: 'Promoción LG OLED N1',
  }
}

const TrackedOledN1 = withLgOnlineTracker(OledN1, mapPropsToGAField);
export default withRouter(TrackedOledN1)
