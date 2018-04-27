import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  getLink(text,link){
    return  (
      <a className="dropdown-item" href={link}>{text}</a>
    )
  }
  render() {
    return (
      <div>
      <div className="d-none d-sm-block">
        <Navbar dark="true" color="dark" expand="xs">
          <NavbarBrand href="/">LessForDress</NavbarBrand>
            <Nav className=" ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/about-us">About</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/item">Item</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={()=>this.getLink("Option1","#Option1")}>
                    Option 1
                  </DropdownItem>
                  <DropdownItem tag={()=>this.getLink("Option2","#Option2")}>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem tag={()=>this.getLink("Option3","#Option3")}>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
        </Navbar>
      </div>
      <div className="d-block d-sm-none">
        <Navbar dark="true" color="dark" expand="xs">
          <NavbarBrand href="/">LessForDress</NavbarBrand>
            <Nav className=" ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/about-us">About</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/">Home</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={()=>this.getLink("Option1","#Option1")}>
                    Option 1
                  </DropdownItem>
                  <DropdownItem tag={()=>this.getLink("Option2","#Option2")}>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem tag={()=>this.getLink("Option3","#Option3")}>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
        </Navbar>
      </div>

      </div>
    );
  }
}
