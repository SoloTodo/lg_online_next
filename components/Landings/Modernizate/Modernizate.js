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

const sections = [
  {
    slug: 'television',
    categoryId: 11,
    label: 'Televisión',
    prefix: 'tv',
    productId: 50129
  },
  {
    slug: 'audio',
    categoryId: 25,
    label: 'Audio',
    prefix: 'audio',
    productId: 45946
  },
  {
    slug: 'celulares',
    categoryId: 6,
    label: 'Celulares',
    prefix: 'mc',
    productId: 48285
  },
  // REF (id 15) y WM (id 19)
  {
    slug: 'linea_blanca',
    categoryId: 15,
    label: 'Línea Blanca',
    prefix: 'ref',
    productId: 37995
  }
];

class Modernizate extends React.Component {
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
      50129,  // OLED55B8
      45885,  // 55UK6350
      45884,  // 50UK6550
      47174,  // 65UK6550
      45937,  // 70UK6550
      45898,  // OLEDW8
      45946,  // OK99
      47017,  // SK5
      25905,  // OM7560
      46690,  // SK8
      48285,  // K11 Blue
      48286,  // K11 Gold
      48274,  // Q7 Black
      48277,  // Q Stylus
      37995,  // WT16DSB
      42678,  // WT22BSS6
      45904,  // WD11WBS6D
      40144,  // LB31MPP
      28125,  // GS65MPP1
    ];

    const selectedSection = this.props.section;

    // If the selected
    const wmCategoryUrl = convertIdToUrl(19, 'categories');
    const categoryUrl = convertIdToUrl(selectedSection.categoryId, 'categories');

    const filteredProductEntries = this.props.productEntries.filter(productEntry => {
      // Include the washing machines in the home appliance section, currently associated with the refrigerators
      const productEntryCategoryUrl = productEntry.product.category === wmCategoryUrl ? convertIdToUrl(15, 'categories') : productEntry.product.category;
      return productIds.includes(productEntry.product.id) && productEntryCategoryUrl === categoryUrl
    });

    const caratClass = this.state.dropdownOpen ? 'fa-angle-up' : 'fa-angle-down';

    return <div className="modernizate">
      <Head>
        <title key="title">Promoción LG Modernizate Ripley - LG Online</title>

        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${settings.domain}/modernizate`} />
        <meta property="og:url" content={`${settings.domain}/modernizate`} />
        <meta property="og:title" content="Promoción LG Modernizate Ripley" />
        <meta name="description" property="og:description" content="Promoción LG Modernizate Ripley" />
        <meta property="og:image" content={`${settings.domain}/static/img/og_image.png`} />
      </Head>

      <div className="cyber-slider container" id="banner-slider">
        <SlideDynamicPrice
          productId={selectedSection.productId}
          forcedPriceStoreId={18}
          desktopHref={`/landing?landing=modernizate&section=${selectedSection.slug}&product=${selectedSection.productId}`}
          desktopAs={`/modernizate?section=${selectedSection.slug}&product=${selectedSection.productId}`}
          extraSmall={[`/static/landings/modernizate/${selectedSection.prefix}_350.jpg`, `/static/landings/modernizate/${selectedSection.prefix}_350_hdpi.jpg`]}
          small={[`/static/landings/modernizate/${selectedSection.prefix}_540.jpg`]}
          medium={[`/static/landings/modernizate/${selectedSection.prefix}_720.jpg`]}
          large={[`/static/landings/modernizate/${selectedSection.prefix}_960.jpg`]}
          infinity={[`/static/landings/modernizate/${selectedSection.prefix}_1140.jpg`]}
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
                  <Link href={`/landing?landing=modernizate&section=${section.slug}`} as={`/modernizate?section=${section.slug}`}>
                    <a className={classNames({'selected': section.slug === selectedSection.slug})}>{section.label}</a>
                  </Link>
                </div>
              )}
            </div>}
          </div>
        </div> :
        <div className="container d-flex flex-row justify-content-between modernizate__category-selector-desktop">
          {sections.map(section => <div key={section.slug}>
            <Link href={`/landing?landing=modernizate&section=${section.slug}`} as={`/modernizate?section=${section.slug}`}>
              <a className={classNames({'selected': section.slug === selectedSection.slug})}>{section.label}</a>
            </Link>
          </div>)}
        </div>}

      <ProductBrowseResults
        filteredProductEntries={filteredProductEntries}
        highlightedStoreId={18}
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
    pageTitle: 'Promoción LG Modernizate Ripley',
  }
}

const TrackedModernizate = withLgOnlineTracker(Modernizate, mapPropsToGAField);
export default withRouter(connect(mapStateToProps)(TrackedModernizate))