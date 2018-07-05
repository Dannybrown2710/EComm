import React, { Component } from "react";
import './info.css';
import SuccessOutlineButton from '../button/Button';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NetworkApi } from '../../NetworkApi';
import store from '../../store';
const images = require.context('../../images', true);
class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: this.props.rating || null,
            temp_rating: null,
            disabled: this.props.disabled
        };
    }
    rate(rating) {
        if (!this.state.disabled) {
            this.setState({
                rating: rating,
                temp_rating: rating,

            });
        }
    }
    star_over(rating) {
        if (!this.state.disabled) {
            this.state.temp_rating = this.state.rating;
            this.state.rating = rating;

            this.setState({
                rating: this.state.rating,
                temp_rating: this.state.temp_rating
            });
        }
    }
    star_out() {
        if (!this.state.disabled) {
            this.state.rating = this.state.temp_rating;

            this.setState({ rating: this.state.rating });
        }
    }
    render() {
        var stars = [];
        let _this = this;
        for (var i = 1; i <= 5; i++) {
            var klass = 'star-rating__star';

            if (_this.state.rating >= i && _this.state.rating != null) {
                klass += ' is-selected';
            }

            stars.push(
                <label
                    className={klass}
                    onClick={this.rate.bind(this, i)}
                    onMouseOver={this.star_over.bind(this, i)}
                    onMouseOut={this.star_out.bind(this)}>
                    ★
          </label>
            );
        }

        return (
            <div className="star-rating">
                {stars}
            </div>
        );
    }
};
class Profile extends Component {
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
                    <Container>
                        <Row>
                            <div>
                                <img src={require('../../images/others/banner.jpg')} className="img-fluid" alt="Responsive image" />
                            </div>
                            <div className="reli">
                                <div>
                                    <img src={require('../../images/others/news.png')} className="img-fluid profileimg" alt="Responsive image" />
                                </div>
                                <div className="ceni">
                                    <div className="mt-2 star-rating__checkboxi"><Rating rating={2} /></div>
                                    <h4>Liel Beshari</h4>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Card className="cardTop">
                                <Nav tabs justified>
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
                                                                <i class="fa fa-angle-right"></i>
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
                                                                <i class="fa fa-angle-right"></i>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            )}
                                        </Col>
                                    </TabPane>
                                </TabContent>
                            </Card>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userDetails: state.user
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
  }, dispatch)

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
