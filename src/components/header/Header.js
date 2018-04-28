import React, { Component } from 'react';
import {
    TabContent, TabPane, Button, Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler, NavbarBrand,
    Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText
} from 'reactstrap'
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
                    <ModalBody>
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
                                    <Col sm="12" className="mt-4">
                                        <h4>Tab 1 Contents</h4>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleEmail">Email</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="examplePassword">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="10" className="mt-4 offset-sm-1">
                                        <h6 className="text-uppercase text-center pb-2">sign in with email</h6>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleEmail" className="text-uppercase">Email Address</Label>
                                                <Input type="email" name="email" id="exampleEmail" placeholder="email placeholder" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="examplePassword" className="text-uppercase">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                                            </FormGroup>
                                            <div className="d-flex justify-content-center mt-4 pb-3">
                                                <SuccessOutlineButton className="text-uppercase"><a href={'/'}>Sign In</a></SuccessOutlineButton>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </ModalBody>
                    <ModalFooter>
                        <p className="text-uppercase">Sign In with...</p>
                        <div className="d-flex justify-content-center mt-4 pb-3">
                            <SuccessOutlineButton className="text-uppercase" onClick={this.toggle}><a href={'/'}>Facebook</a></SuccessOutlineButton>
                        </div>
                    </ModalFooter>
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