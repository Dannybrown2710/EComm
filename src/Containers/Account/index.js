import React, { Component } from "react";
import './acc.css';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
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
class Account extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            recommended: ""
        };
    }

    componentDidMount() {
        
    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    navigate(link){
        this.props.history.push(link);
      }
    render() {
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
                                    <img src={this.props.userDetails.User_ProfilePic} className="img-fluid profileimg" alt="Profile" />
                                    <span className="star-rating__checkbox"><Rating rating={this.props.userDetails.User_Rating} disabled={true}/></span>
                                </div>
                                <div className="cen mt-4">
                                    <h4 >{this.props.userDetails.User_FirstName?this.props.userDetails.User_FirstName+'  '+this.props.userDetails.User_LastName:'User'}</h4>
                                </div>
                            </div>
                        </Row>
                        <Row className="my-5">
                            <Card className="cardacc">
                                <div className="list" onClick={()=>{this.navigate("profile")}}>
                                    <i class="fa fa-2x fa-address-card mr-5"></i>
                                    <span>My details</span>
                                </div>
                                {/*<div className="list">
                                    <i class="fa fa-2x fa-archive mr-5"></i>
                                    <span>Purchase history</span>
                                    
                                </div>*/}
                                <div className="list"  onClick={()=>{this.navigate("items")}}>
                                    <i class="fa fa-2x fa-list mr-5"></i>
                                    <span>My items</span>
                                 
                                </div>
                                
                                <div className="list" onClick={()=>{this.navigate("favourite-events")}}>
                                    <i class="fa fa-2x fa-heart mr-5"></i>
                                    <span>My events</span>
                                 
                                </div>
                                <div className="list"  onClick={()=>{this.navigate("homesale")}}>
                                    <i class="fa fa-2x fa-clipboard mr-5"></i>
                                    <span>My home sales</span>
                                    
                                </div>
                            </Card>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
   userDetails:state.user.userDetails
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
   
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)