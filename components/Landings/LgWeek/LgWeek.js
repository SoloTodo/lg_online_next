import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import queryString from "query-string";
import classNames from 'classnames'
import { endpoint } from '../../../endpoint'

import {withLgOnlineTracker} from "../../../utils";
import {settings} from "../../../settings";
import SlideDynamicPrice from "../../Slides/SlideDynamicPrice";
import ProductBrowseResults from "../../Product/ProductBrowseResults";

const sections = [
  {
    slug: 'television',
    categoryId: 11,
    label: 'Televisión',
    prefix: 'tv',
    productId: 50291
  },
  {
    slug: 'audio',
    categoryId: 25,
    label: 'Audio',
    prefix: 'audio',
    productId: 50291
  },
  {
    slug: 'celulares',
    categoryId: 6,
    label: 'Celulares',
    prefix: 'mc',
    productId: 57939
  },
  {
    slug: 'refrigeracion',
    categoryId: 15,
    label: 'Refrigeradores',
    prefix: 'ref',
    productId: 28125
  },
  {
    slug: 'lavado',
    categoryId: 19,
    label: 'Lavadoras',
    prefix: 'wm',
    productId: 46743
  }
];

class LgWeek extends React.Component {
  static async getInitialProps(ctx) {
    const params = queryString.parse(ctx.asPath.split('?')[1] || '');
    const selectedSection = sections.filter(section => section.slug === params.section)[0] || sections[0];

    return {
      section: selectedSection
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.router.asPath !== nextProps.router.asPath) {
      if (this.state.dropdownOpen) {
        this.setState({
          dropdownOpen: false
        });
      }
    }
  }

  render() {
    const productIds = [
      46274, // LG 32LK610BPSA
      45908, // LG 43LK5700PSC
      51189, // LG 43UK6200PSA
      50128, // LG 49LK5400PSA
      50910, // LG 49UK6200PSA
      50291, // LG 55UK6200PSA
      45886, // LG 55UK6550PSB
      51832, // LG 60UK6200PSA
      47174, // LG 65UK6550PSB
      36117, // LG CJ88
      45942, // LG OK55
      25905, // LG OM7560
      45944, // LG OK75
      36119, // LG OJ98
      45946, // LG OK99
      25747, // LG OM4560
      39255, // LG SJ2
      47017, // LG SK5
      48278, // LG K9 (X210HM / 32 GB / 2 GB / Aurora Black)
      48285, // LG K11 (X410FO / Moroccan Blue)
      48286, // LG K11 (X410FO / Terra Gold)
      48274, // LG Q7 (Q610FM / Aurora Black)
      39937, // LG Q6 (M700F / Ice Platinum)
      48277, // LG Q Stylus (Q710FM / Aurora Black)
      48268, // LG G7 ThinQ (G710 / New Aurora Black)
      57939, // LG G7 Fit (New Aurora Black)
      40144, // LG LB31MPP
      40945, // LG LB33SPP
      28125, // LG GS65MPP1
      38771, // LG LT32BPPX
      45895, // LG LT44WGP
      46743, // LG WT16DSBP
      37994, // LG WT18DSB
      42678, // LG WT22BSS6
      38951, // LG WD9WB6
    ];

    const selectedSection = this.props.section;
    const categoryUrl = `${endpoint}categories/${selectedSection.categoryId}/`;

    const filteredProductEntries = this.props.productEntries.filter(productEntry =>
      productIds.includes(productEntry.product.id) && productEntry.product.category === categoryUrl
    );

    const caratClass = this.state.dropdownOpen ? 'fa-angle-up' : 'fa-angle-down';

    return <div className="lgweek">
      <Head>
        <title key="title">Promoción LG Week AbcDin - LG Online</title>

        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/lgweek`} />
        <meta property="og:url" content={`${settings.domain}/lgweek`} />
        <meta property="og:title" content="Promoción LG Week AbcDin" />
        <meta name="description" property="og:description" content="Promoción LG Week AbcDin" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <div className="cyber-slider container" id="banner-slider">
        <SlideDynamicPrice
          productId={selectedSection.productId}
          forcedPriceStoreId={30}
          desktopHref={`/landing?landing=lgweek&section=${selectedSection.slug}&product=${selectedSection.productId}`}
          desktopAs={`/lgweek?section=${selectedSection.slug}&product=${selectedSection.productId}`}
          extraSmall={[`/static/landings/lg_week/${selectedSection.prefix}_350.jpg`, `/static/landings/lg_week/${selectedSection.prefix}_350_hdpi.jpg`]}
          small={[`/static/landings/lg_week/${selectedSection.prefix}_540.jpg`]}
          medium={[`/static/landings/lg_week/${selectedSection.prefix}_720.jpg`]}
          large={[`/static/landings/lg_week/${selectedSection.prefix}_960.jpg`]}
          infinity={[`/static/landings/lg_week/${selectedSection.prefix}_1140.jpg`]}
        />
      </div>

      {this.props.isMobile ?
        <div className="subcategory_menu mt-2">
          <div className="subcategory_menu__title" onClick={this.toggle}>
            {selectedSection.label}
            <i className={classNames('ml-2', 'fas', caratClass)}>&nbsp;</i>
          </div>
          <div className="subcategory_menu__dropdown-container">
            {this.state.dropdownOpen && <div className="subcategory_menu__dropdown">
              {sections.map(section =>
                <div key={section.slug} className="subcategory_menu__link-container">
                  <Link href={`/landing?landing=lgweek&section=${section.slug}`} as={`/lgweek?section=${section.slug}`}>
                    <a className={classNames({'selected': section.slug === selectedSection.slug})}>{section.label}</a>
                  </Link>
                </div>
              )}
            </div>}
          </div>
        </div> :
        <div className="container d-flex flex-row justify-content-between lgweek__category-selector-desktop">
          {sections.map(section => <div key={section.slug}>
            <Link href={`/landing?landing=lgweek&section=${section.slug}`} as={`/lgweek?section=${section.slug}`}>
              <a className={classNames({'selected': section.slug === selectedSection.slug})}>{section.label}</a>
            </Link>
          </div>)}
        </div>}

      <ProductBrowseResults
        filteredProductEntries={filteredProductEntries}
        highlightedStoreId={30}
      />
    </div>;
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
    pageTitle: 'Promoción LG Week AbcDin',
  }
}

const TrackedLgWeek = withLgOnlineTracker(LgWeek, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedLgWeek))