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
    setCurrentEvent
  } from '../../modules/events'
import { getFavourites } from "../../modules/user";
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
class EventDesc extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.redirectToAcc=this.redirectToAcc.bind(this);
        this.formatDate=this.formatDate.bind(this);
        this.attendEvent=this.attendEvent.bind(this);
        this.state = {
          contactModal:false,
          recommended: "",
          user:{}
        };
    }

    componentDidMount() {
        let _this=this;
        if(Object.keys(this.props.activeEvent).length==0 && this.props.match.params && this.props.match.params.id){
            store.dispatch(setCurrentEvent(this.props.match.params.id));
        }
        if(this.props.activeEvent.Host_ID){
            NetworkApi.getUserDetails(this.props.activeEvent.Host_ID).then(function(resp){
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
      if(nextProps.activeEvent.Host_ID!=0 && nextProps.activeEvent.Host_ID!=this.props.activeEvent.Host_ID){
        NetworkApi.getUserDetails(nextProps.activeEvent.Host_ID).then(function(resp){
            _this.setState({user:resp.data})
            });
      }
      else{
          this.setState({
              user:{}
          })
      }
      if(Object.keys(nextProps.activeEvent).length==0)
          this.props.history.push('/');
    }a
  
    
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
      NetworkApi.getEventOwnerPhoneByItemId(this.props.activeEvent.Event_ID)
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
    attendEvent(){
        console.log(this.props)
        NetworkApi.attendEvent(this.props.userDetails.User_ID,this.props.activeEvent.Event_ID).then(function(resp){
            alert("Added to my events");
            store.dispatch(getFavourites());

        })
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
                                                <img alt="product image" src={this.props.activeEvent.Event_Image} className="c-i img-responsive p-3" />
                                                
                                            </Card>
                                        </Col>
                                    
                                </Slider>
                            </Card>
                            <Row className="mt-5 mx-auto">
                                <Col lg={6} md={6} sm={6} xs={6} className="pull-left">
                                <ul className="list-group">
                                <li className="list-group-item"><p>Event name : {this.props.activeEvent.Event_Name}</p></li>
                                <li className="list-group-item"><p>Event date : {this.formatDate(this.props.activeEvent.Event_Date)}</p></li>
                                <li className="list-group-item"><p>Event description :{this.props.activeEvent.Event_Description}</p></li>
                                <li className="list-group-item"><p>Event address :{this.props.activeEvent.Event_StreetNumber},{this.props.activeEvent.Event_City}</p></li>
                                <li className="list-group-item"><p>Event country :{this.props.activeEvent.Event_Country}</p></li>
                                </ul>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <div onClick={this.toggle} className="pull-right cursor-pointer mx-5"><i class="fa fa-plus-circle"></i><span>Contact</span></div>
                                    
                                    {this.props.userDetails.User_ID && (<div onClick={this.attendEvent} className="pull-right cursor-pointer mx-5"><i class="fa fa-calendar"></i><span>Attend this event</span></div>)}
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
  activeEvent:state.event.activeEvent,
  userDetails:state.user.userDetails
})
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDesc)
