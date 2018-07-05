import React, { Component } from "react";
import './index.css';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, Button, Container, Row, Col,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import { NetworkApi } from '../../NetworkApi';
import "slick-carousel/slick/slick-theme.css";
import store from '../../store';
import {
    setCurrentProduct
  } from '../../modules/products'
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
    componentWillReceiveProps(nextProps){
        if(nextProps.rating!=this.props.rating){
            this.setState({rating:nextProps.rating})
        }
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
class ItemDesc extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.redirectToAcc=this.redirectToAcc.bind(this)
        this.state = {
          contactModal:false,
          recommended: "",
          user:{}
        };
    }

    componentDidMount() {
        if(Object.keys(this.props.activeProduct).length==0 && this.props.match.params && this.props.match.params.id){
            store.dispatch(setCurrentProduct(this.props.match.params.id));
        }
        let _this=this;
        if(this.props.owner!=0){
            NetworkApi.getUserDetails(this.props.owner).then(function(resp){
                _this.setState({user:resp.data});
            })
            
        }
        else{
            this.setState({
                user:{}
            })
        }
    }
    componentWillReceiveProps(nextProps){
      let _this=this;
      if(Object.keys(nextProps.activeProduct).length==0 && nextProps.userId==null && nextProps.users.length==0 )
          this.props.history.push('/');
      if(nextProps.owner!=0 && nextProps.owner!=this.props.owner){
        NetworkApi.getUserDetails(nextProps.owner).then(function(resp){
            _this.setState({user:resp.data});
            });
      }
      else{
          this.setState({
              user:{}
          })
      }
    }
  
    
    fetchproductdata() {
        /*fetch('')
            .then((result) => {
                return result.json();
            }).then((jsonResult) => {
                this.setState({ "recommended": jsonResult });
                console.log(this.state.recommended);
            })
            .catch((error) => {
                console.log(error);
            });*/
    }

    toggle() {
      NetworkApi.getItemOwnerPhoneByItemId(this.props.activeProduct.Item_ID)
            .then((result) => {
              this.setState({
                contactInfo:result.data,
                contactModal: !this.state.contactModal
            });
            })
            .catch((error) => {
                console.error(error);
            });
            
    }
    redirectToAcc(){
        this.props.history.push('/account/'+this.state.user.User_ID)
    }
    render() {
        let settings = {
            arrows: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [{ breakpoint: 1440, settings: { slidesToShow: 1, dots: true } },
            { breakpoint: 520, settings: { slidesToShow: 1, arrows: false, dots: true } }],
        };
        return (
            <div>
                <Container>
                <Modal isOpen={this.state.contactModal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}>Contact Information</ModalHeader>
                  <ModalBody>
                    {this.state.contactInfo}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>Close</Button>
                  </ModalFooter>
                </Modal>
                    <Row>
                        <Col>
                            <div onClick={this.redirectToAcc} className="cursor-pointer">
                                <span><i class="fa fa-user mr-2"></i>{this.state.user.User_FirstName}</span>
                                <span className="mt-2 star-rating__checkboxi"><Rating disabled={true} rating={Number(this.state.user.User_Rating)} /></span>
                            </div>
                            <Card className="w-75 mx-auto p-5">
                                <Slider {...settings}>
                                <Col>
                                            <Card>
                                                <img alt="product image" src={this.props.activeProduct.Item_Image} className="c-i img-responsive p-3" />
                                                
                                            </Card>
                                        </Col>
                                    
                                </Slider>
                            </Card>
                            <Row className="mt-5 mx-auto">
                                <Col lg={6} md={6} sm={6} xs={6} className="pull-left">
                                <ul className="list-group">
                                <li className="list-group-item"><p>Item name : {this.props.activeProduct.Item_Name}</p></li>
                                <li className="list-group-item"><p>Item category : {this.props.activeProduct.Item_Category}</p></li>
                                <li className="list-group-item"><p>Item price : {this.props.activeProduct.Item_Price}</p></li>
                                <li className="list-group-item"><p>Item country : {this.props.activeProduct.Item_Country}</p></li>
                                <li className="list-group-item"><p>Item address : {this.props.activeProduct.Item_StreetNumber} , {this.props.activeProduct.Item_City}</p></li>
                                </ul>
                                    
                                    
                                    
                                    
                                    
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <div onClick={this.toggle} className="pull-right cursor-pointer"><i class="fa fa-plus-circle"></i><span>Contact</span></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  activeProduct:state.product.activeProduct,
  users:state.user.users,
  userId:state.user.userDetails.User_ID,
  loggedIn:state.user.loggedIn,
  owner:state.product.activeProductOwner
})
const mapDispatchToProps = dispatch => bindActionCreators({
  //changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDesc)
