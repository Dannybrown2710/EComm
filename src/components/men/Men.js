import React, { Component } from "react";
import './men.css';
import { Card, Button, Container, Row, Col } from 'reactstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const images = require.context('../../images', true);

function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'grey', borderRadius: '12px' }}
            onClick={onClick}
        ></div>
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: 'grey', borderRadius: '12px' }}
            onClick={onClick}
        ></div>
    );
}

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
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
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
        let settings = {
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{ breakpoint: 1440, settings: { slidesToShow: 3, dots: true } },
            { breakpoint: 520, settings: { slidesToShow: 1, arrows: false, dots: true } }],
        };
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div>
                                <span><i class="fas fa-user mr-2"></i>Liel Beshari</span>
                                <span className="mt-2 star-rating__checkboxi"><Rating rating={2} /></span>
                            </div>
                            <Card className="w-75 mx-auto">
                                <Slider {...settings}>
                                    {product && product.map((item, index) =>
                                        <Col>
                                            <Card>
                                                <img alt="product image" src={images(product[index].image, true)} className="img-responsive p-3" />
                                                <span>
                                                    <h5 className="pull-left">{product[index].subcategory}</h5>
                                                    <i className="far fa-heart fa-2x pull-right"></i>
                                                </span>
                                                <hr className="w-75" />
                                                <p>₪{product[index].price}</p>
                                            </Card>
                                        </Col>
                                    )}
                                </Slider>
                            </Card>
                            <Row className="w-75 mx-auto">
                                <Col lg={6} md={6} sm={6} xs={6} className="pull-left">
                                    <p>{product[0].title}</p>
                                    <p>{product[0].subcategory}</p>
                                    <p>{product[0].price}</p>
                                    <p>{product[0].location}</p>
                                    <p>{product[0].title}</p>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <div className="pull-right"><i class="fas fa-plus-circle"></i><span>Contact</span></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}