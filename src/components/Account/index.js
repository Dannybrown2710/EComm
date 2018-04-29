import React, { Component } from "react";
import './acc.css';
import SuccessOutlineButton from '../button/Button';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col } from 'reactstrap';

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
            console.log(this)
            this.state.rating = this.state.temp_rating;

            this.setState({ rating: this.state.rating });
        }
    }
    render() {
        var stars = [];
        let _this = this;
        console.log(_this)
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
export default class Account extends Component {
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
                <div className="pt-5 font-white bg-light ">
                    <h3 className="text-center mb-4">My Profile</h3>
                    <Container>
                        <Row>
                            <div>
                                <img src={require('../../images/others/banner.jpg')} className="img-fluid" alt="Responsive image" />
                            </div>
                            <div className="rel">
                                <div>
                                    <img src={require('../../images/others/news.png')} className="img-fluid profileimg" alt="Responsive image" />
                                    <span className="star-rating__checkbox"><Rating rating={2} /></span>
                                </div>
                                <div className="cen mt-4">
                                    <h4 >Liel Beshari</h4>
                                </div>
                            </div>
                        </Row>
                        <Row className="my-5">
                            <Card className="cardacc">
                                <div className="list">
                                    <i class="fas fa-2x fa-address-card mr-5"></i>
                                    <span>My details</span>
                                    <hr className="bottomLine" />
                                </div>
                                <div className="list">
                                    <i class="fas fa-2x fa-archive mr-5"></i>
                                    <span>Purchase history</span>
                                    <hr className="bottomLine" />
                                </div>
                                <div className="list">
                                    <i class="fas fa-2x fa-list mr-5"></i>
                                    <span>My items</span>
                                    <hr className="bottomLine" />
                                </div>
                                <div className="list">
                                    <i class="fas fa-2x fa-clipboard mr-5"></i>
                                    <span>My home sales</span>
                                    <hr className="bottomLine" />
                                </div>
                                <div className="list">
                                    <i class="fas fa-2x fa-heart mr-5"></i>
                                    <span>My eventss</span>
                                    <hr className="bottomLine" />
                                </div>
                            </Card>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

