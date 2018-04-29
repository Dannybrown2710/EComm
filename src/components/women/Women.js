import React, { Component } from 'react';
import { Container, Row, Col, Card } from "reactstrap";
import './women.css';

const images = require.context('../../images', true);
export default class Contact extends Component {
    render() {
        let product = [
            { "title": "Hamburger", "location": "Paris", "image": "./dress/dress1.png", "subcategory": "men", "price": "200" },
            { "title": "Fries", "location": "Venice", "image": "./dress/dress2.png", "subcategory": "women", "price": "100" },
            { "title": "Coke", "location": "New York", "image": "./dress/dress3.png", "subcategory": "men", "price": 50 },
            { "title": "Pepsi", "location": "Manchester", "image": "./dress/dress1.png", "subcategory": "men", "price": 50 }
        ];
        return (
            <div>
                <Container>
                    <h3 className="text-center my-4">Women</h3>
                    <Row>
                        {product && product.map((item, index) =>
                            <Col lg={4} md={4} sm={6} xs={12} className="my-3">
                                <Card>
                                    <img alt="product image" src={images(product[index].image, true)} className="img-responsive p-3" />
                                    <span>
                                        <h5 className="pull-left">{product[index].title}</h5>
                                        <h5 className="pull-left">{product[index].location}</h5>
                                        <h5 className="pull-left">{product[index].price}</h5>
                                    </span>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        );
    }
}