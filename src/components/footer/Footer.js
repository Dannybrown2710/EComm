import React, { Component } from "react";
import "./Footer.css";
import { Container, Row, Col } from "reactstrap";


class Footer extends Component {

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    render() {
        let currentPath = window.location.pathname;
        return (
            <div>
                <Container fluid="true">
                    <Row className="footer">
                        <Col md={3}>
                            <h6 className="font-weight-bold pb-2">HELP & INFORMATION</h6>
                            <p>Help</p>
                            <p>Track Order</p>
                            <p>Delivery & Returns</p>
                            <p>LESSFORDRESS Premier Delivery</p>
                            <p>10% Student Discount</p>
                        </Col>
                        <Col md={3}>
                            <h6 className="font-weight-bold pb-2">ABOUT LESSFORDRESS</h6>
                            <p>About Us</p>
                            <p>Careers at LESSFORDRESS</p>
                            <p>Corporate Responsibility</p>
                            <p>Investors Site</p>
                        </Col>
                        <Col md={3}>
                            <h6 className="font-weight-bold pb-2">MORE FROM LESSFORDRESS</h6>
                            <p>Mobile and LESSFORDRESS Apps</p>
                            <p>LESSFORDRESS Marketplace</p>
                        </Col>
                        <Col md={3}>
                            <h6 className="font-weight-bold pb-2">SHOPPING FROM:</h6>
                            <p>You're in</p>
                        </Col>
                    </Row>
                    <Row className="py-3 footer-bottom">
                        <Col md={12}>
                            <span>© 2018 LESSFORDRESS</span>
                            <span className="pull-right">Privacy & Cookies | Ts&Cs | Accessibility</span>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Footer;