import React, { Component } from 'react';
import { TabContent, TabPane, Button, Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler, NavbarBrand,
    Row, Col, Modal, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import './Header.css';
import classnames from 'classnames';
import SuccessOutlineButton from '../button/Button';
// import Login from '../login/login';
// import { addUserAction } from '../../actions/actions';
// import { connect } from 'react-redux';


class Header extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            modal: false,
            activeTab: '1'
        };
        this.toggle = this.toggle.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody className="fontFamily">
                        <Nav tabs>
                            <NavItem className="tabHeading">
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggleTab('1'); }}
                                >
                                    NEW To LessForDress
                            </NavLink>
                            </NavItem>
                            <NavItem className="tabHeading">
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggleTab('2'); }}
                                >
                                    ALLREADY REGISTERED
                            </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="10" className="mt-4 offset-sm-1">
                                        <h6 className="text-uppercase text-center pb-2">Sign up with email</h6>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleName" className="text-uppercase">Name</Label>
                                                <Input type="text" name="name" id="exampleName" placeholder="name placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleEmail" className="text-uppercase">Email Address</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="email placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="examplePassword" className="text-uppercase">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                            </FormGroup>
                                            <div className="text-center mt-4 mb-3">
                                                <SuccessOutlineButton><a href={'/'} className="text-uppercase px-5">Sign Up</a></SuccessOutlineButton>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                                <hr className="w-75 mx-auto" />
                                <p className="text-uppercase text-center mt-3">Sign Up with...</p>
                                <div className="text-center mt-3 mb-4">
                                    <SuccessOutlineButton onClick={this.toggle}><a href={'/'} className="text-uppercase"><i className="fab fa-facebook-square mr-2"></i>Facebook</a></SuccessOutlineButton>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="10" className="mt-4 offset-sm-1">
                                        <h6 className="text-uppercase text-center pb-2">Sign in with email</h6>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleEmail" className="text-uppercase">Email Address</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="email placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="examplePassword" className="text-uppercase">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                            </FormGroup>
                                            <div className="text-center mt-4 mb-3">
                                                <SuccessOutlineButton><a href={'/'} className="text-uppercase px-5">Sign In</a></SuccessOutlineButton>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                                <hr className="w-75 mx-auto" />
                                <p className="text-uppercase text-center mt-3">Sign In with...</p>
                                <div className="text-center mt-3 mb-4">
                                    <SuccessOutlineButton onClick={this.toggle}><a href={'/'}  className="text-uppercase"><i className="fab fa-facebook-square mr-2"></i>Facebook</a></SuccessOutlineButton>
                                </div>
                            </TabPane>
                        </TabContent>
                    </ModalBody>
                </Modal>
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
                            <NavItem>
                                <NavLink href="/profile" className="text-white" >Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/information" className="text-white" >Information</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/account" className="text-white">Account</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/event" className="text-white">Event</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/item" className="text-white">Item</NavLink>
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
                        <Button onClick={this.toggle}><i className="far fa-user fa-2x text-white"></i></Button>
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