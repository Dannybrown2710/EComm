import React, { Component } from 'react';
import { TabContent, TabPane, Button, Collapse, Nav, NavItem, NavLink, Navbar, NavbarToggler, NavbarBrand,
    Row, Col, Modal, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap'
import './index.css';
import classnames from 'classnames';
import SuccessOutlineButton from '../button/Button';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NetworkApi } from '../../NetworkApi';
import store from '../../store';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
import { uploadFile } from '../../react-s3';
import {
  login,
  loginWithAPI,
  signUp
} from '../../modules/user'
var GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyAOxdWinI6hcYtuqgXU3hvwNlEaoX0gNac';
GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
var autocomplete,googleLocal;
const config = {
    bucketName: 'lfdbucket',
    region: 'us-east-1',
    accessKeyId: 'AKIAJTO57QSBKCQAEKRA',
    secretAccessKey: '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',
}

const cookies = new Cookies(); 
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1'
        };
        this.toggleTab = this.toggleTab.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.signUp = this.signUp.bind(this);
        this.responseFacebook=this.responseFacebook.bind(this);
        this.componentClicked=this.componentClicked.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loggedIn==true)
            store.dispatch(push('/'));
    }
    componentWillMount(){
        if(cookies.get('login'))
            this.props.login(cookies.get('login'));
    }
    componentDidMount(){
        var _this=this;
        GoogleMapsLoader.load(function(google) {
            console.log(google)
            new google.maps.places.Autocomplete(document.getElementById("scountry"));
            new google.maps.places.Autocomplete(document.getElementById("city"));
            new google.maps.places.Autocomplete(document.getElementById("sstreet"));
            var c = new google.maps.places.Autocomplete(document.getElementById("scountry"));
            var ci = new google.maps.places.Autocomplete(document.getElementById("city"));
            var st = new google.maps.places.Autocomplete(document.getElementById("sstreet"));
            googleLocal = google;
            google.maps.event.addListener(c, 'place_changed', function() {
                _this.setState({country:document.getElementsByName("scountry")[0].value});
             });
             google.maps.event.addListener(ci, 'place_changed', function() {
                console.log(document.getElementsByName("country"));
                _this.setState({city:document.getElementsByName("city")[0].value});
             });
             google.maps.event.addListener(st, 'place_changed', function() {
                _this.setState({street:document.getElementsByName("sstreet")[0].value});
             });
            googleLocal = google;
        });
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    responseFacebook(response){
      console.log('fb response', response);
    }
    componentClicked(e){
      console.log('fb clicked', e);
    }
    handleInputChange(event) {
        const target = event.target;
        let value = null;
        const name = target.name;
    if(target.type === 'file'){
        let file = target.files[0];
        store.dispatch({
            type:"global/START_LOADING"
          })
        uploadFile(file, config)
        .then(data =>{
            value= data.key;
            this.setState({
                [name]: value
              },()=>{
                store.dispatch({
                    type:"global/STOP_LOADING"
                  })
              });
        } ).catch(err => {
            console.error(err)
            store.dispatch({
                type:"global/STOP_LOADING"
              })
        })

    }
    else
    value = target.type === 'checkbox' ? target.checked : target.value;
    

    this.setState({
      [name]: value
    });
  }
    signUp(e){
      /*store.dispatch({
        type:"global/START_LOADING"
      });*/
      e.preventDefault();
      if(this.state.scpassword != this.state.spassword){
          alert("Password not matching");
          return;
      }
      store.dispatch(signUp(this.state));
    }
    render() {
        return (
          <div>
                           <Nav tabs justified>
                               <NavItem className="tabHeading">
                                   <NavLink
                                       className={classnames({ active: this.state.activeTab === '1' })}
                                       onClick={() => { this.toggleTab('1'); }}
                                   >
                                       Existing User
                               </NavLink>
                               </NavItem>
                               <NavItem className="tabHeading">
                                   <NavLink
                                       className={classnames({ active: this.state.activeTab === '2' })}
                                       onClick={() => { this.toggleTab('2'); }}
                                   >
                                       Sign Up
                               </NavLink>
                               </NavItem>
                           </Nav>
                           <TabContent activeTab={this.state.activeTab}>
                           <TabPane tabId="1">
                               <Row>
                                   <Col sm="10" className="mt-4 offset-sm-1">
                                       <h6 className="text-uppercase text-center pb-2">Sign in with email</h6>
                                       <Form>
                                           <FormGroup>
                                               <Label for="lemail" className="text-uppercase">Email Address</Label>
                                               <Input required autoComplete="off" type="email" value={this.state.username} name="email" onChange={this.handleInputChange} id="lemail" placeholder="email placeholder" />
                                           </FormGroup>
                                           <FormGroup>
                                               <Label for="lPassword" className="text-uppercase">Password</Label>
                                               <Input required autoComplete="off" type="password" value={this.state.password} onChange={this.handleInputChange} name="password" id="lPassword" placeholder="password placeholder" />
                                           </FormGroup>
                                       </Form>
                                       <div className="text-center mt-4 mb-3">
                                           <Button className="button btn btn-secondary" onClick={()=>{this.props.loginWithAPI({email:this.state.email,password:this.state.password})}}>Sign In</Button>
                                       </div>
                                   </Col>
                               </Row>
                               <hr className="w-75 mx-auto" />
                               <p className="text-uppercase text-center mt-3">Sign In with...</p>
                               <div className="text-center mt-3 mb-4">
                               <FacebookLogin
                                  appId="2044210959231662"
                                  autoLoad={true}
                                  fields="name,email,picture"
                                  cssClass="button btn btn-secondary"
                                  icon="fa-facebook-square"
                                  textButton=" FACEBOOK"
                                  onClick={this.componentClicked}
                                  callback={this.responseFacebook} />
                                  </div>

                           </TabPane>
                               <TabPane tabId="2">
                                   <Row>
                                       <Col sm="10" className="mt-4 offset-sm-1">
                                           <h6 className="text-uppercase text-center pb-2">Sign up with email</h6>
                                           <Form onSubmit={this.signUp}>
                                               <FormGroup>
                                                   <Label for="sName" className="text-uppercase">First Name</Label>
                                                   <Input required type="text" name="sfName" id="sName" onChange={this.handleInputChange} placeholder="Enter name" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="lName" className="text-uppercase">Last Name</Label>
                                                   <Input required type="text" name="slName" id="lName" onChange={this.handleInputChange} placeholder="Enter name" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="sEmail" className="text-uppercase">Email Address</Label>
                                                   <Input required type="email" name="semail" id="sEmail" onChange={this.handleInputChange} placeholder="Enter email" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="sphone" className="text-uppercase">Phone</Label>
                                                   <Input required type="number" name="sphone" id="sphone" onChange={this.handleInputChange} placeholder="Enter phone" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="scountry" className="text-uppercase">Country</Label>
                                                   <Input required type="text" name="scountry" id="scountry" onChange={this.handleInputChange} placeholder="Enter country" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="city" className="text-uppercase">City</Label>
                                                   <Input required type="text" name="scity" id="city" onChange={this.handleInputChange} placeholder="Enter city" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="sstreet" className="text-uppercase">Street</Label>
                                                   <Input required type="text" name="sstreet" id="sstreet" onChange={this.handleInputChange} placeholder="Enter street" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="sPassword" className="text-uppercase">Password</Label>
                                                   <Input required  type="password" name="spassword" id="sPassword" onChange={this.handleInputChange} placeholder="Enter password" />
                                               </FormGroup>
                                               <FormGroup>
                                                   <Label for="scPassword" className="text-uppercase">Password</Label>
                                                   <Input required type="password" name="scpassword" id="scPassword" onChange={this.handleInputChange} placeholder="Confirm password" />
                                               </FormGroup>
                                               <FormGroup>
                                                <Label for="image">Image</Label>
                                                <Input required type="file" name="image" id="image" placeholder="Upload your image" onChange={this.handleInputChange}/>
                                               </FormGroup>
                                               <FormGroup class="d-flex justify-content-center mt-5 pb-5">
                                               <Button className="btn button text-center mt-4 mb-3">Sign Up</Button>
                                            </FormGroup>
                                               
                                           </Form>
                                       </Col>
                                   </Row>
                                   <hr className="w-75 mx-auto" />
                                   <p className="text-uppercase text-center mt-3">Sign Up with...</p>
                                   <div className="text-center mt-3 mb-4">
                                       <SuccessOutlineButton onClick={this.toggle}><a href={'/'} className="text-uppercase nav-link"><i className="fa fa-facebook-square mr-2"></i>Facebook</a></SuccessOutlineButton>
                                   </div>
                               </TabPane>

                           </TabContent>
                   </div >
        );
    }
  }
  const mapStateToProps = state => ({
    login: state.user.loggedIn,
    loggingIn: state.user.loggingIn,
    loggedIn: state.user.loggedIn,
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
    login,
    loginWithAPI,
  }, dispatch)

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
