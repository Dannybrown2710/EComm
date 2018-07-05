// import React, { Component } from "react";
// import './Home.css';
// import SuccessOutlineButton from '../button/Button';
// import { Container, Row, Col, Button, Carousel, UncontrolledCarousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
// import Card from "../card/Card";
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const images = require.context('../../images', true);

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: 'block', background: 'grey', borderRadius: '12px' }}
//             onClick={onClick}
//         ></div>
//     );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: 'block', background: 'grey', borderRadius: '12px' }}
//             onClick={onClick}
//         ></div>
//     );
// }


// export default class Home extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             recommended: ""
//         };
//     }

//     componentDidMount() {
//         this.fetchproductdata();
//     }

//     fetchproductdata() {
//         fetch('')
//             .then((result) => {
//                 return result.json();
//             }).then((jsonResult) => {
//                 this.setState({ "recommended": jsonResult });
//                 console.log(this.state.recommended);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }

//     render() {

//         let product = [
//             { "title": "Hamburger", "location": "Paris", "image": "./dress/dress1.png", "subcategory": "men", "price": "200" },
//             { "title": "Fries", "location": "Venice", "image": "./dress/dress2.png", "subcategory": "women", "price": "100" },
//             { "title": "Coke", "location": "New York", "image": "./dress/dress3.png", "subcategory": "men", "price": 50 },
//             { "title": "Pepsi", "location": "Manchester", "image": "./dress/dress1.png", "subcategory": "men", "price": 50 }
//         ];

//         let settings = {
//             arrows: true,
//             nextArrow: <SampleNextArrow />,
//             prevArrow: <SamplePrevArrow />,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 3,
//             slidesToScroll: 1,
//             responsive: [{ breakpoint: 768, settings: { slidesToShow: 3 } },
//             { breakpoint: 520, settings: { slidesToShow: 1, arrows: false } }],
//         };
//         return (
//             <div>
//                 <div className="pt-5 font-white bg-light">
//                     <h3 className="text-uppercase pl-8-5">Recommended for you</h3>
//                     <p className="py-2 pl-8-5">we think you'll love these picks</p>
//                     <Container>
//                         <Slider {...settings}>
//                             {product && product.map((item, index) =>
//                                 <Col>
//                                     <Card>
//                                         <img alt="product image" src={images(product[index].image, true)} className="img-responsive p-3" />
//                                         <span>
//                                             <h5 className="pull-left">{product[index].subcategory}</h5>
//                                             <i className="far fa-heart fa-2x pull-right"></i>
//                                         </span>
//                                         <hr className="w-75" />
//                                         <p>₪{product[index].price}</p>
//                                     </Card>
//                                 </Col>
//                             )}
//                         </Slider>
//                         <div class="d-flex justify-content-center mt-5 pb-5">
//                             <SuccessOutlineButton className="text-uppercase"><a href={'/'}>VIEW ALL</a></SuccessOutlineButton>
//                         </div>
//                     </Container>
//                 </div>

//                 <div className="pt-5 font-white">
//                     <h3 className="text-uppercase pl-8-5">Home Sale</h3>
//                     <p className="py-2 pl-8-5">we think you'll love these picks</p>
//                     <Container>
//                         <Slider {...settings}>
//                             {product && product.map((item, index) =>
//                                 <Col>
//                                     <Card>
//                                         <img alt="product image" src={images(product[index].image, true)} className="img-responsive p-3" />
//                                         <span>
//                                             <h5 className="pull-left">{product[index].title}</h5>
//                                             <i className="far fa-heart fa-2x pull-right"></i>
//                                         </span>
//                                         <hr className="w-75" />
//                                         <p>{product[index].location}</p>
//                                     </Card>
//                                 </Col>
//                             )}
//                         </Slider>
//                         <div class="d-flex justify-content-center mt-5 pb-5">
//                             <SuccessOutlineButton className="text-uppercase"><a href={'/'}>VIEW ALL</a></SuccessOutlineButton>
//                         </div>
//                     </Container>
//                 </div>
//             </div>
//         );
//     }
// }


import React, { Component } from "react";
import './Home.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Button } from "reactstrap";
import Card from "../card/Card";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const images = require.context('../../images',true);
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

export default class Home extends Component {

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
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        let product = [
            {"title":"Hamburger","location":"Paris","image":"./dress/dress1.png","subcategory":"men","price":"200"},
            {"title":"Fries","location":"Venice","image":"./dress/dress2.png","subcategory":"women","price":"100"},
            {"title":"Coke","location":"New York","image":"./dress/dress3.png","subcategory":"men","price":50},
            {"title":"Pepsi","location":"Manchester","image":"./dress/dress1.png","subcategory":"men","price":50}
        ];

        let settings = {
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{ breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 520, settings: { slidesToShow: 1, arrows: false } }],
        };
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-uppercase pl-8-5">Recommended for you</h3>
                    <p className="py-2 pl-8-5">we think you'll love these picks</p>
                    <Container>
                            <Slider {...settings}>
                                {product && product.map((item, index) =>
                                    <Col>
                                        <Card>
                                            <img alt="product image" src={images(product[index].image,true)} className="img-responsive p-3" />
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
                        <div class="d-flex justify-content-center mt-5 pb-5">
                            <SuccessOutlineButton className="text-uppercase"><a href={'/'}>VIEW ALL</a></SuccessOutlineButton>
                        </div>
                    </Container>
                </div>

                <div className="pt-5 font-white">
                    <h3 className="text-uppercase pl-8-5">Home Sale</h3>
                    <p className="py-2 pl-8-5">we think you'll love these picks</p>
                    <Container>
                            <Slider {...settings}>
                                {product && product.map((item, index) =>
                                    <Col>
                                        <Card>
                                            <img alt="product image" src={images(product[index].image,true)} className="img-responsive p-3" />
                                            <span>
                                                <h5 className="pull-left">{product[index].title}</h5>
                                                <i className="far fa-heart fa-2x pull-right"></i>
                                            </span>
                                            <hr className="w-75" />
                                            <p>{product[index].location}</p>
                                        </Card>
                                    </Col>
                                )}
                            </Slider>
                        <div class="d-flex justify-content-center mt-5 pb-5">
                            <SuccessOutlineButton className="text-uppercase"><a href={'/'}>VIEW ALL</a></SuccessOutlineButton>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
