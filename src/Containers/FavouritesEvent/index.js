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

class FavEve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommended: "",
            products:[]
        };
        this.redirectToDesc=this.redirectToDesc.bind(this);
        this.formatDate=this.formatDate.bind(this);
    }
    formatDate(edate){
        if(edate){
            let date = new Date(edate);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();

            if (dt < 10) {
            dt = '0' + dt;
            }
            if (month < 10) {
            month = '0' + month;
            }
            return dt+"-"+month+"-"+year
            //console.log(year+'-' + month + '-'+dt);
        }
    }
    redirectToDesc(id){
        this.props.history.push('/event-desc/'+id)
    }

    unattendEvent(e,id){
        e.stopPropagation();
        let _this=this;
        NetworkApi.unattendEvent(this.props.userDetails.User_ID,id).then(function(resp){
            store.dispatch(getFavourites())
        }).catch(function(resp){
            console.error(resp);
        })
    }
    render() {
        let _this=this;
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">Favourites</h3>
                    <Container>
                        {this.props.favouriteEvents && this.props.favouriteEvents.map((item, index) =>

                            <Col className="mb-3">
                                <Card min_height='8'>
                                    <div class="item" onClick={()=>this.redirectToDesc(item.Event_ID)}>
                                        <div class="image" style={{"width":"100px"}}>
                                            <img alt=" image " src={item.Event_Image} width="100px" className="cartimg p-3" />
                                        </div>

                                        <div class="description">
                                            <span>{item.Event_name}</span><br/>
                                            <span>{item.Event_Country}</span><br/>
                                            <span>{_this.formatDate(item.Event_Date)}</span>
                                        </div>

                                        <div class="quantity" onClick={(e)=>{this.unattendEvent(e,item.Event_ID)}}>
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
    favouriteEvents:state.user.favouriteEvents

})
   const mapDispatchToProps = dispatch => bindActionCreators({
   }, dispatch)
   
   export default connect(
     mapStateToProps,
     mapDispatchToProps
   )(FavEve)