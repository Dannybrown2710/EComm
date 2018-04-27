import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import './Header.css';
import SuccessOutlineButton from '../button/Button';
import { Link } from 'react-router-dom';
// import Login from '../login/login';
// import { addUserAction } from '../../actions/actions';
// import { connect } from 'react-redux';


class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="dark" >
          <NavbarToggler onClick={this.toggleNavbar} />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/men" className="text-white" >Men</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/women" className="text-white" >Women</NavLink>
              </NavItem>              
              <NavItem>
                <NavLink href="/cart" className="text-white" >Cart</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
          <div>
            <NavbarBrand href="/" className="text-white" >LESSFORDRESS</NavbarBrand>
          </div>
          <div>
            <form class="form-inline">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <i class="fas fa-search fa-2x text-white"></i>
            </form>
          </div>
          <div>
            <i className="far fa-user fa-2x text-white"></i>
          </div>
          <div>
            <i className="far fa-heart fa-2x text-white"></i>
          </div>
        </Navbar>
      </div >
    );
  }
}

export default Header;