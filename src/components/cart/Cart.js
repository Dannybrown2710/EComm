import React, { Component } from "react";
import './Cart.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Button, Carousel, UncontrolledCarousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import Card from "../card/Card";

const images = require.context('../../images', true);

export default class Cart extends Component {

    constructor(props) {
        super(props);
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
                    <h3 className="text-center mb-4">My Purchases</h3>
                    <Container>
                        {product && product.map((item, index) =>
                            <Col className="mb-3">
                                <Card min_height='8'>
                                    <div class="item">
                                        <div class="image">
                                            <img alt="product image" src={images(product[index].image, true)} width="100px" className="cartimg p-3" />
                                        </div>

                                        <div class="description">
                                            <span>{product[index].title}</span><br/>
                                            <span>{product[index].subcategory}</span><br/>
                                            <span>{product[index].price}</span>
                                        </div>

                                        <div class="quantity">
                                            <i class="far fa-trash-alt"></i>
                                        </div>

                                        <div class="total-price">
                                            <i class="fas fa-angle-right"></i>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )}
                        <div class="d-flex justify-content-center mt-5 pb-5">
                            <SuccessOutlineButton className="text-uppercase"><a href={'/'}>VIEW ALL</a></SuccessOutlineButton>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}