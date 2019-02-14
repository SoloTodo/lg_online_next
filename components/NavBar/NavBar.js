import React from 'react'
import {connect} from "react-redux";
import {withRouter} from 'next/router'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Popover, PopoverBody
} from 'reactstrap';

import './NavBar.css'

import NavBarMobileSearch from "./NavBarMobileSearch";


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      searchPopoverOpen: false,
      searchText: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.router.asPath !== nextProps.router.asPath) {
      if (this.state.isOpen) {
        this.setState({
          isOpen: false
        });
      }
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  toggleSearchPopover = evt => {
    evt && evt.preventDefault();

    this.setState({
      searchPopoverOpen: !this.state.searchPopoverOpen
    });
  };

  handleSearchTextChange = evt => {
    this.setState({
      searchText: evt.target.value
    })
  };

  clearSearchTextChange = evt => {
    evt.preventDefault();

    this.setState({
      searchText: ''
    })
  };

  handleSearchFormSubmit = evt => {
    evt.preventDefault();

    const newRoute = `/search/?search=${encodeURIComponent(this.state.searchText)}`;
    this.props.history.push(newRoute);
  };

  render() {
    return <div>
      <Navbar id="navbar" color="dark" dark expand="md" fixed="top">
        <Link href="/">
          <a className="navbar__brand">
            <img src="/static/img/logo.png" alt="LG Logo" width="80" height="35" />
          </a>
        </Link>
        <NavBarMobileSearch />
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/browse?section=televisores" as="/televisores">
                <a className="nav-link">
                  Televisores
                </a>
              </Link>
            </NavItem>
            {this.props.isMedium &&
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Línea Blanca
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link href="/refrigeradores">
                    <a className="nav-link">Refrigeradores</a>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/lavadoras">
                    <a className="nav-link">Lavadoras</a>
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link href="/microondas">
                    <a className="nav-link">Microondas</a>
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            }
            {!this.props.isMedium &&
            <NavItem>
              <Link href="/refrigeradores">
                <a className="nav-link">Refrigeradores</a>
              </Link>
            </NavItem>
            }
            {!this.props.isMedium &&
            <NavItem>
              <Link as="/browse?categorySlug=lavadoras" href="/lavadoras">
                <a className="nav-link">Lavadoras</a>
              </Link>
            </NavItem>
            }
            {!this.props.isMedium &&
            <NavItem>
              <Link href="/microondas">
                <a className="nav-link">Microondas</a>
              </Link>
            </NavItem>
            }
            <NavItem>
              <Link href="/celulares">
                <a className="nav-link">Smartphones</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/audio">
                <a className="nav-link">Audio</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/monitores">
                <a className="nav-link">Monitores</a>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/proyectores">
                <a className="nav-link">Proyectores</a>
              </Link>
            </NavItem>
            <NavItem>
              {this.props.isMediumOrLarger &&
              <a href="." id="search-toggle-button" className="nav-link" onClick={this.toggleSearchPopover}><i className="fas fa-search">&nbsp;</i></a>}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      {this.props.isMediumOrLarger &&
      <Popover placement="bottom" isOpen={this.state.searchPopoverOpen}
               target="search-toggle-button"
               toggle={this.toggleSearchPopover}>
        <PopoverBody>
          <form onSubmit={this.handleSearchFormSubmit}>
            <div className="input-group">
              <input type="text"
                     id="text-search-input"
                     className="form-control"
                     placeholder="Buscar (e.g. OLED)"
                     onChange={this.handleSearchTextChange}
                     value={this.state.searchText}
              />
              {this.state.searchText &&
              <a href="." onClick={this.clearSearchTextChange} id="searchclear">
                <i className="fas fa-times">&nbsp;</i>
              </a>}
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  <i className="fas fa-arrow-right">&nbsp;</i>
                </button>
              </div>
            </div>
          </form>
        </PopoverBody>
      </Popover>
      }
    </div>
  }
}

function mapStateToProps(state) {
  return {
    isMediumOrLarger: true,
    isMedium: false
    // isMediumOrLarger: state.browser.greaterThan.small,
    // isMedium: state.browser.is.medium
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))