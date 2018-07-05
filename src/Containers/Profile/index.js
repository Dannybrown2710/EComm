import React, { Component } from "react";
import './index.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
import {NetworkApi} from '../../NetworkApi';
let uik=false;
class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            userDetails:{},
            uik:false
        }
        this.handleChange=this.handleChange.bind(this);
        this.update=this.update.bind(this);
        this.cuik=this.cuik.bind(this);

        
    }
    cuik(event){
        console.log(event.target.name)
        if(event.key && uik==false){
            console.log(event)
            uik=true;
            return true;
        }
        else if(uik==true)
            return true;
    }
    componentDidMount(){
        if(!this.props.userDetails.User_FirstName)
            store.dispatch({
                type:"global/START_LOADING"
            })
            this.setState({userDetails:this.props.userDetails})
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userDetails.User_FirstName)
        store.dispatch({
            type:"global/STOP_LOADING"
        })
        this.setState({userDetails:nextProps.userDetails})
    }
    update(action){
        console.log(uik)
        if(uik==false){
            console.log("No user interaction")
            return false;
        }
        else{
            store.dispatch({
                type:"global/START_LOADING"
            })
        switch(action){
            
            case "fName" :{
                NetworkApi.updateName(this.state.userDetails).then(function(resp){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                }).catch(function(err){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                });;
                return
            }
            case "lName" :{
                NetworkApi.updateName(this.state.userDetails).then(function(resp){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                }).catch(function(err){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                });;
                return
            }

            case "password" :{
                NetworkApi.updatePassword(this.state.userDetails).then(function(resp){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                }).catch(function(err){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                });
                return
            }

            case "phone" :{
                NetworkApi.updatePhone(this.state.userDetails).then(function(resp){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                }).catch(function(err){
                    store.dispatch({
                        "type":"global/STOP_LOADING"
                    })
                });;
                return
            }
            case "email" :{
                alert("You cannot alter email id")
                return;
            }
            default:{
                console.log("none")
                store.dispatch({
                    "type":"global/STOP_LOADING"
                })
            }
        }
        
    }
       // NetworkApi.changePhone(this.state.userDetails);
    }
    handleChange(event) {
        const target = event.target;
        let value = null;
        const name = target.name;
        if(target.type === 'file'){
            let file = target.files[0];
            value = this.getBase64(file).then((resp)=>{
                setTimeout(()=>{
                    let userDetails = {...this.state.userDetails}
                    userDetails[name]=resp;
                this.setState({
                    userDetails
                  })},100);
            });

        }
        else
            value = target.type === 'checkbox' ? target.checked : target.value;
        let userDetails = {...this.state.userDetails}
        userDetails[name]=value;
        this.setState({
          userDetails
        });

      }
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">My Profile</h3>
                    <Container>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <CardBody>
                                        <Form>
                                            <FormGroup onBlur={()=>this.update("fName")}>
                                                <Label for="fn">First Name</Label>
                                                <input className="form-control" type="text" value={this.state.userDetails.User_FirstName}  name="User_FirstName" id="fn" onChange={this.handleChange} onKeyPress={this.cuik} placeholder="First name" />
                                            </FormGroup>
                                            <FormGroup onBlur={()=>this.update("lName")} >
                                                <Label for="ln">Last Name</Label>
                                                <input className="form-control" type="text"  value={this.state.userDetails.User_LastName} name="User_LastName" id="ln" onChange={this.handleChange}  onKeyPress={this.cuik} placeholder="Last name" />
                                            </FormGroup>
                                            <FormGroup onBlur={()=>{this.update("email")}}>
                                                <Label for="pe">Email</Label>
                                                <input className="form-control" type="email" name="User_Email" id="pe"  value={this.state.userDetails.User_Email?this.state.userDetails.User_Email:"type a mail id please"}  onChange={this.handleChange} onKeyPress={this.cuik} placeholder="Email" />
                                            </FormGroup>
                                            <FormGroup onBlur={()=>this.update("phone")} >
                                                <Label >Phone Number</Label>
                                                <input  className="form-control" type="number" name="User_PhoneNumber" onChange={this.handleChange} onKeyPress={this.cuik} value={Number(this.state.userDetails.User_PhoneNumber)}  placeholder="Phone number" />
                                            </FormGroup>
                                            
                                            <FormGroup onBlur={()=>this.update("password")} >
                                                <Label for="pw">Password</Label>
                                                <input className="form-control" type="password" name="User_Password" id="pw" value={this.state.userDetails.User_Password} onChange={this.handleChange} onKeyPress={this.cuik} placeholder="Password" />
                                            </FormGroup>
                                            
                                           
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <div class="d-flex justify-content-center mt-5 pb-5">
                            <SuccessOutlineButton><a href={'/'} className="text-uppercase px-5">Save Changes</a></SuccessOutlineButton>
                        </div>
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
   )(Profile)