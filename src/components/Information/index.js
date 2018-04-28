import React, { Component } from "react";
import './index.css';
import SuccessOutlineButton from '../button/Button';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const images = require.context('../../images', true);
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            recommended: ""
        };
    }

    componentDidMount() {
        this.fetchproductdata();
    }

    fetchproductdata() {
        fetch('')
            .then((result) => {
                return result.json();
            }).then((jsonResult) => {
                this.setState({ "recommended": jsonResult });
                console.log(this.state.recommended);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        let product = [
            { "title": "Hamburger", "location": "Paris", "image": "./dress/dress1.png", "subcategory": "men", "price": "200" },
            { "title": "Fries", "location": "Venice", "image": "./dress/dress2.png", "subcategory": "women", "price": "100" },
            { "title": "Coke", "location": "New York", "image": "./dress/dress3.png", "subcategory": "men", "price": 50 },
            { "title": "Pepsi", "location": "Manchester", "image": "./dress/dress1.png", "subcategory": "men", "price": 50 }
        ];
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">My Profile</h3>
                    <Container>
                        <img src={require('../../images/others/banner.jpg')} className="img-fluid bgImage" alt="Responsive image"/>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <Nav tabs>
                                        <NavItem className="tabHeading">
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}
                                            >
                                                Events
                                        </NavLink>
                                        </NavItem>
                                        <NavItem className="tabHeading">
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}
                                            >
                                                Items
                                        </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <Col className="mt-4">
                                                {product && product.map((item, index) =>
                                                    <Col className="mb-3">
                                                        <Card>
                                                            <div class="item">
                                                                <div class="image">
                                                                    <img alt="product image" src={images(product[index].image, true)} width="100px" className="cartimg p-3" />
                                                                </div>
                                                                <div class="description">
                                                                    <span>{product[index].title}</span><br />
                                                                    <span>{product[index].subcategory}</span><br />
                                                                    <span>{product[index].price}</span>
                                                                </div>
                                                                <div class="total-price">
                                                                    <i class="fas fa-angle-right"></i>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                )}
                                            </Col>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Col className="mt-4">
                                                {product && product.map((item, index) =>
                                                    <Col className="mb-3">
                                                        <Card>
                                                            <div class="item">
                                                                <div class="image">
                                                                    <img alt="product image" src={images(product[index].image, true)} width="100px" className="cartimg p-3" />
                                                                </div>
                                                                <div class="description">
                                                                    <span>{product[index].title}</span><br />
                                                                    <span>{product[index].subcategory}</span><br />
                                                                    <span>{product[index].price}</span>
                                                                </div>
                                                                <div class="total-price">
                                                                    <i class="fas fa-angle-right"></i>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    </Col>
                                                )}
                                            </Col>
                                        </TabPane>
                                    </TabContent>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}