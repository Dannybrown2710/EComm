import React, { Component } from "react";
import './index.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Button, Carousel, UncontrolledCarousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from "reactstrap";
import Card from "../card/Card";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../../images/optimised/banner1.jpg";
import { NetworkApi } from "../../NetworkApi";
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {getFavourites, getMyItems} from "../../modules/user";
import store from '../../store';
const images = require.context('../../images', true);

class Favs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommended: "",
            products:[]
        };
        this.redirectToDesc=this.redirectToDesc.bind(this);
    }

    redirectToDesc(id){
        this.props.history.push('/item-desc/'+id)
    }

    deleteItemFromFav(e,id){
        e.stopPropagation();
        let _this=this;
        NetworkApi.deleteItemFromFav(this.props.userDetails.User_ID,id).then(function(resp){
            store.dispatch(getFavourites())
        }).catch(function(resp){
            console.error(resp);
        })
    }
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">Favourites</h3>
                    <Container>
                        {this.props.favourites && this.props.favourites.map((item, index) =>

                            <Col className="mb-3">
                                <Card min_height='8'>
                                    <div class="item" onClick={()=>this.redirectToDesc(item.Item_ID)}>
                                        <div class="image" style={{"width":"100px"}}>
                                            <img alt=" image " src={item.Item_Image} width="100px" className="cartimg p-3" />
                                        </div>

                                        <div class="description">
                                            <span>{item.Item_name}</span><br/>
                                            <span>{item.Item_SubCategory}</span><br/>
                                            <span>{item.Item_Price}</span>
                                        </div>

                                        <div class="quantity" onClick={(e)=>{this.deleteItemFromFav(e,item.Item_ID)}}>
                                            <i class="fa fa-trash"></i>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        )}
                        
                    </Container>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userDetails:state.user.userDetails,
    loggedIn:state.user.loggedIn,
    favourites:state.user.favourites

})
   const mapDispatchToProps = dispatch => bindActionCreators({
   }, dispatch)
   
   export default connect(
     mapStateToProps,
     mapDispatchToProps
   )(Favs)