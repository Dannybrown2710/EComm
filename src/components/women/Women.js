import React, { Component } from 'react';
import { Container, Row, Col } from "reactstrap";
import './women.css';

export default class Contact extends Component {
  render() {
    return (
      <div className="mt-5">
        <img src={require('../../images/others/contact.png')} class="img-responsive imagebg" alt="logo" /><br />
        <Container className="bg text-center mt-7">
          <Row>
            <Col md={12} xs={8}>
              <h1>Contact InventFund</h1>
              <h3>Get in touch with us to get the <b>cash flowing</b></h3>
              <p>We know you're taught not to give in to all your desires, but this is one that we're willing to bet will have some serious <strong>longterm payoff.</strong><br />
                At the very least, we'll gurantee ou a lively conversation
              </p>
            </Col>
          </Row>
          <Row className="mt-10 pb-2">
            <Col md={4}>
              <img src={require('../../images/others/maps.png')} alt="logo" /><br />
              <p>
                #265, 6<sup>th</sup> MAIN, 4<sup>th</sup> CROSS,<br />
                2<sup>nd</sup> STAGE, BTM LAYOUT,<br />
                BENGALURU - 560076
              </p>
            </Col>
            <Col md={4}>
              <img src={require('../../images/others/phone.png')} alt="logo" /><br />
              <p>Office: <b>9916232160</b></p>
            </Col>
            <Col md={4}>
              <img src={require('../../images/others/mail.png')} alt="logo" /><br />
              <p>Email: <u>contact@gloify.com</u></p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}