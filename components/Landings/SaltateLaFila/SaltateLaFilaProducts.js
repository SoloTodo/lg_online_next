import React from 'react';
import Link from 'next/link';
import Head from "next/head";
import {connect} from 'react-redux'
import {withRouter} from 'next/router'
import queryString from "query-string";
import classNames from 'classnames'

import {withLgOnlineTracker} from "../../../utils";
import {settings} from "../../../settings";
import SlideDynamicPrice from "../../Slides/SlideDynamicPrice";
import ProductBrowseResults from "../../Product/ProductBrowseResults";
import {convertIdToUrl} from "../../../react-utils/utils";
import OrderingDropdown from "../../OrderingDropdown/OrderingDropdown";

const pathAs = '/saltatelafila';

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
    productId: 45942
  },
  {
    slug: 'celulares',
    categoryId: 6,
    label: 'Celulares',
    prefix: 'mc',
    productId: 57939
  },
  // REF (id 15) y WM (id 19)
  {
    slug: 'refrigeradores',
    categoryId: 15,
    label: 'Refrigeradores',
    prefix: 'ref',
    productId: 39205
  },
  {
    slug: 'lavadoras',
    categoryId: 19,
    label: 'Lavadoras',
    prefix: 'wm',
    productId: 61240
  }
];

class SaltateLaFilaLanding extends React.Component {
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
      50129, // OLED55B8SSC
      48263, // OLED65C8PSA
      45886, // 55UK6550PSB
      45884, // 50UK6550PSB
      51832, // 60UK6200PSA
      45885, // 55UK6350PSC
      45944, // OK75
      45942, // OK55
      25905, // OM7560
      46690, // SK8
      47017, // SK5
      39255, // SJ2
      57939, // G7 Fit Black
      48274, // Q7 Black
      48285, // K11 Blue
      48279, // K9 Blue
      41629, // WD20VVS6TW
      41628, // WD22VTS6TW
      45803, // WT17DSB
      37994, // WT18DSB
      61240, // WD9WE6
      42678, // WT22BSS6
      39205, // LS65SXN
      50059, // LS65SXTAF
      39883, // GM87SXD
      53029, // LM78SDSAF
      40174, // LB33BPGK
      40945, // LB33SPP
      40144, // LB31MPP
      28125, // GS65MPP1
      39410, // WD9DBS6
      46743, // WT16DSBP
      38951, // WD9WB6
      37691, // WT16WSB
      50291, // 55UK6200PSA
      51189, // 43UK6200PSA
      50910, // 49UK6200PSA
      46274, // 32LK610BPSA
      46662, // 50UK6300PSB
      46663, // 65UK6350PSC
      45908, // 43LK5700PSC
      55717, // K11 Black
      48286, // K11 Gold
      48278, // K9 Black
    ];

    const selectedSection = this.props.section;

    // If the selected
    const categoryUrl = convertIdToUrl(selectedSection.categoryId, 'categories');

    const filteredProductEntries = this.props.productEntries.filter(productEntry =>
      productIds.includes(productEntry.product.id) && productEntry.product.category === categoryUrl
    ).sort((a, b) => productIds.indexOf(a.product.id) - productIds.indexOf(b.product.id));

    const caratClass = this.state.dropdownOpen ? 'fa-angle-up' : 'fa-angle-down';

    return <div className="saltatelafilalanding">
      <Head>
        <title key="title">#SALTATELAFILA este Cyber - LG Online</title>

        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}${pathAs}`} />
        <meta property="og:url" content={`${settings.domain}${pathAs}`} />
        <meta property="og:title" content="#SALTATELAFILA este Cyber" />
        <meta name="description" property="og:description" content="#SALTATELAFILA este Cyber" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <div className="cyber-slider container" id="banner-slider">
        <SlideDynamicPrice
          productId={selectedSection.productId}
          desktopHref={`/landing?landing=saltatelafilalanding&section=${selectedSection.slug}&product=${selectedSection.productId}`}
          desktopAs={`${pathAs}?section=${selectedSection.slug}&product=${selectedSection.productId}`}
          extraSmall={[`/static/landings/saltate_la_fila/banners_landing/${selectedSection.prefix}_350.jpg`, `/static/landings/saltate_la_fila/banners_landing/${selectedSection.prefix}_350_hdpi.jpg`]}
          small={[`/static/landings/saltate_la_fila/banners_landing/${selectedSection.prefix}_540.jpg`]}
          medium={[`/static/landings/saltate_la_fila/banners_landing/${selectedSection.prefix}_720.jpg`]}
          large={[`/static/landings/saltate_la_fila/banners_landing/${selectedSection.prefix}_960.jpg`]}
          infinity={[`/static/landings/saltate_la_fila/banners_landing/${selectedSection.prefix}_1140.jpg`]}
        />
      </div>

      {this.props.isMobile ?
        <div className="subcategory_menu mt-2">
          <div className="subcategory_menu__title" onClick={this.toggle}>
            Elige tu categoría: {selectedSection.label}
            <i className={classNames('ml-2', 'fas', caratClass)}>&nbsp;</i>
          </div>
          <div className="subcategory_menu__dropdown-container">
            {this.state.dropdownOpen && <div className="subcategory_menu__dropdown">
              {sections.map(section =>
                <div key={section.slug} className="subcategory_menu__link-container">
                  <Link href={`/landing?landing=saltatelafilalanding&section=${section.slug}`} as={`${pathAs}?section=${section.slug}`}>
                    <a className={classNames({'selected': section.slug === selectedSection.slug})}>{section.label}</a>
                  </Link>
                </div>
              )}
            </div>}
          </div>
        </div> :
        <div className="container d-flex flex-row justify-content-between saltatelafilalanding__category-selector-desktop">
          {sections.map(section => <div key={section.slug}>
            <Link href={`/landing?landing=saltatelafilalanding&section=${section.slug}`} as={`${pathAs}?section=${section.slug}`}>
              <a className={classNames({'selected': section.slug === selectedSection.slug})}>{section.label}</a>
            </Link>
          </div>)}
        </div>}

      <div className="container-fluid">
        <div className="d-flex justify-content-end mt-3">
          <OrderingDropdown
              baseRouteHref={`/landing?landing=saltatelafilalanding&section=${selectedSection.slug}&`}
              baseRouteAs={`${pathAs}?section=${selectedSection.slug}&`}
            />
        </div>
      </div>

      <ProductBrowseResults
        filteredProductEntries={filteredProductEntries}
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
    pageTitle: '#SALTATELAFILA este Cyber',
  }
}

const TrackedSaltateLaFilaLanding = withLgOnlineTracker(SaltateLaFilaLanding, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedSaltateLaFilaLanding))
