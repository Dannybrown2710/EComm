import React from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import store from '../../store';
import './index.css';
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
  DropdownItem,
  Button,
  Form } from 'reactstrap';
  import {
    login,
    loginWithAPI,
    logout
  } from '../../modules/user'
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleSideNav = this.toggleSideNav.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.onKeyPressSearch = this.onKeyPressSearch.bind(this);
    
    this.state = {
      isOpen: false,
      sideNav:false,
      query:''
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    },
  ()=>{
    this.forceUpdate();
  });
  }
  getLink(text,link){
    return  (
      <Link className="dropdown-item" onClick={this.toggleSideNav} to={link}>{text}</Link>
    )
  }
  getNav(detail){
    return (
      <Link className="navbar-brand" to="/">{detail=="l"?"LessForDress":"L4D"}</Link>
    )
  }
  toggleSideNav(){
    this.setState({
      sideNav:!this.state.sideNav
    })

  }
  onKeyPressSearch(event){
    if (event.key === 'Enter') {
      this.search();
    }
  }
  handleChange(event){
    this.setState({query: event.target.value});
  }
  search(){
    store.dispatch(push('/search/'+this.state.query));
  }
  render() {
    return (
      <div className={this.state.sideNav?"sidenav-overlay":''}>

<div id="mySidenav" style={{width:this.state.sideNav?"200px":"0"}} className="sidenav">
  <a href="javascript:void(0)" className="closebtn" onClick={this.toggleSideNav}>&times;</a>
  {this.getLink("Add Event","/event")}
  {this.getLink("Add item","/item")}
</div>

      <div className="d-none d-sm-block">
        <Navbar dark={true} color="dark" expand="xs">
        {this.props.loggedIn && (<Button className="mr-2" style={{background:"transparent",outline:"none",border:"none"}}
        onClick={this.toggleSideNav}><i className="fa fa-bars"></i></Button>)}
          <NavbarBrand tag={()=>this.getNav("l")}></NavbarBrand>
          <Nav className=" ml-auto" navbar>
          <div className="form-inline mr-auto ml-auto">
                    <input className="form-control mr-sm-2" value={this.state.query} onChange={this.handleChange} onKeyPress={this.onKeyPressSearch} type="text" placeholder="Search" aria-label="Search"/>

                    <button onClick={this.search} className="btn btn-default" type="submit"><i className="fa fa-search"></i></button>
                </div>

          </Nav>
              {this.props.loggedIn && (
                <Nav className=" ml-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/account">My Dashboard</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/favourites">My Favourites</Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                 {/*} <DropdownItem tag={()=>this.getLink("Edit Details","/profile")}>

                  </DropdownItem>
                  <DropdownItem tag={()=>this.getLink("My Profile","/information")}>

                  </DropdownItem>
              <DropdownItem divider />*/}
                  <DropdownItem tag={()=>(<button className="dropdown-item"  onClick={this.props.logout}>Logout</button>)}>

                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>)}
              {!this.props.loggedIn && (
                  <Nav className=" ml-auto" navbar>
                  <NavItem>
                <Link className="nav-link" to="/login">Login</Link>
              </NavItem>
            </Nav>)}

        </Navbar>
      </div>
      <div className="d-block d-sm-none">
        <Navbar dark={true} color="dark" expand="xs">

        <div id="mySidenav" style={{width:this.state.sideNav?"200px":"0"}} className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.toggleSideNav}>&times;</a>
          {this.getLink("Add Event","/event")}
          {this.getLink("Add item","/item")}
          
        </div>
        {this.props.loggedIn && (<Button className="" style={{background:"transparent",outline:"none",border:"none"}}
        onClick={this.toggleSideNav}><i className="fa fa-bars"></i></Button>)}
          <NavbarBrand tag={()=>this.getNav("m")}></NavbarBrand>
          <Nav className="mr-auto ml-auto" navbar>
          <Form className="ml-auto" inline row="true">
                    <input style={{"maxWidth":"90px"}} className="form-control" type="text" placeholder="Search" aria-label="Search"/>
                </Form>

          </Nav>
              {this.props.loggedIn && (
                  <Nav className=" ml-auto" navbar>
                <NavItem>
                <Link className="nav-link" to="/account"><i className="fa fa-window-maximize"></i></Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/items"><i className="fa fa-heart"></i></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <i className="fa fa-user-o"></i>
                </DropdownToggle>
                <DropdownMenu right>
                  {/*<DropdownItem tag={()=>this.getLink("Edit Details","/profile")}>

                  </DropdownItem>
                  <DropdownItem tag={()=>this.getLink("My Profile","/information")}>

                  </DropdownItem>
              <DropdownItem divider />*/}
                  <DropdownItem tag={()=>(<button className="dropdown-item" onClick={this.props.logout}>Logout</button>)}>
                    
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>)}
              {!this.props.loggedIn && (
                <Nav className=" ml-auto" navbar>
                <NavItem>
              <Link className="nav-link" to="/login">Login</Link>
            </NavItem>
          </Nav>)}
        </Navbar>
      </div>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  loggingIn: state.user.loggingIn,
})
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  loginWithAPI,
  logout
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
