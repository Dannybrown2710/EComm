import React, { Component } from "react";
import './acc.css';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import SuccessOutlineButton from '../button/Button';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Container, Row, Col,
    Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { NetworkApi } from "../../NetworkApi";

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
            this.props.callbackAPI(this.state.rating);
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
class OtherAccount extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleRating = this.toggleRating.bind(this);
        this.rate=this.rate.bind(this);
        this.state = {
            activeTab: '1',
            recommended: "",
            ratingModal:false,
            userDetails:{}
        };
    }

    componentDidMount() {
        let _this=this;
        if(this.props.match.params && this.props.match.params.id){
            NetworkApi.getUserDetails(this.props.match.params.id).then(function(resp){
                _this.setState({userDetails:resp.data})
            }).catch(function(err){
                _this.props.history.push('/');
            })
        }
    }
    rate(ratings){
        NetworkApi.rateUser(this.props.userDetails.User_ID,this.state.userDetails.User_ID,ratings).then(function(resp){
        })
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleRating(){
        this.setState({ratingModal:!this.state.ratingModal})
    }
    navigate(link){
        this.props.history.push(link);
      }
    componentWillReceiveProps(nextProps){
    }
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light ">
                    <h3 className="text-center mb-4">My Profile</h3>
                    <Container>
                    <Modal isOpen={this.state.ratingModal} toggle={this.toggleRating} className={this.props.className}>
                        <ModalHeader  toggle={this.toggleRating}>Rate this user</ModalHeader>
                        <ModalBody>
                            <Rating callbackAPI={this.rate}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Close</Button>
                        </ModalFooter>
                        </Modal>
                        <Row>
                            <div>
                                <img src={require('../../images/others/banner.jpg')} className="img-fluid" alt="Responsive image" />
                            </div>
                            <div className="rel">
                                <div>
                                    <img src={this.state.userDetails.User_ProfilePic} className="img-fluid profileimg" alt="Profile" />
        {this.props.userDetails.User_ID!=this.state.userDetails.User_ID && this.props.loggedIn &&
            (<span className="pull-right cursor-pointer" onClick={this.toggleRating}>Rate this user</span>    )}
                                    <span className="star-rating__checkbox"><Rating disabled={true} rating={this.state.userDetails.User_Rating} /></span>
                                    
                                </div>
                                
                                <div className="cen mt-4">
                                    <h4 >{this.state.userDetails.User_FirstName?this.state.userDetails.User_FirstName+'  '+this.state.userDetails.User_LastName:'User'}</h4>
                                </div>
                            </div>
                        </Row>
                        <Row className="my-5">
                            <Card className="cardacc">
                                <p>{this.state.userDetails.User_Country}</p>
                                <p>{this.state.userDetails.User_City}</p>
                                <p>{this.state.userDetails.User_Email}</p>
                                <p>{this.state.userDetails.User_PhoneNumber}</p>
                            </Card>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
   userDetails:state.user.userDetails,
   loggedIn:state.user.loggedIn
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
   
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(OtherAccount)