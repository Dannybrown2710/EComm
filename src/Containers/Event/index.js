import React, { Component } from "react";
import './event.css';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input,Button } from 'reactstrap';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
import { postEvent } from '../../modules/events';
import S3FileUpload from '../../react-s3';
import { uploadFile } from '../../react-s3';
import { stat } from "fs";
let today = new Date().toISOString().slice(0, 10);
let time = new Date().getTime(); 
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


console.log(GoogleMapsLoader)
console.log(today)
class Event extends Component {
    constructor(props){
        super(props);
        this.state={
            date:today,
            time:"08:00"
        }
        this.handleChange=this.handleChange.bind(this);
        this.submit=this.submit.bind(this);
        this.getBase64=this.getBase64.bind(this);
        
    }
    getBase64(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                   resolve(reader.result);
                };
                reader.onerror = function (error) {
                    reject(error);
                };
          });
        
     }
    geolocate() {
        /*if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              var circle = new googleLocal.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
              });
              autocomplete.setBounds(circle.getBounds());
            });
          }*/
      }
    componentDidMount(){
        var _this=this;
        GoogleMapsLoader.load(function(google) {
            var c = new google.maps.places.Autocomplete(document.getElementById("country"));
            var ci = new google.maps.places.Autocomplete(document.getElementById("city"));
            var st = new google.maps.places.Autocomplete(document.getElementById("street"));
            googleLocal = google;
            google.maps.event.addListener(c, 'place_changed', function() {
                _this.setState({country:document.getElementsByName("country")[0].value});
             });
             google.maps.event.addListener(ci, 'place_changed', function() {
                console.log(document.getElementsByName("country"));
                _this.setState({city:document.getElementsByName("city")[0].value});
             });
             google.maps.event.addListener(st, 'place_changed', function() {
                _this.setState({street:document.getElementsByName("street")[0].value});
             });
            googleLocal = google;
        });
        console.log(this.props)
        this.setState({User_ID : this.props.userDetails.User_ID},()=>{
            console.log(this.state)
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user.userDetails.User_ID!=this.props.userDetails.User_ID){
            this.setState({User_ID : nextProps.userDetails.User_ID},()=>{
                console.log(this.state)
            })
        }
    }
    handleChange(event) {
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
      submit(e){
        e.preventDefault();
        this.props.postEvent(this.state);
      }
    render() {
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">Add Event</h3>
                    <Container>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <CardBody>
                                        <Form onSubmit={this.submit}>
                                        
                                            <FormGroup>
                                                <Label for="name">Name</Label>
                                                <Input required type="text" name="name" id="name" placeholder="Enter name"  onChange={this.handleChange} />
                                            </FormGroup>
                                            
                                            <FormGroup>
                                                <Label for="date">Date</Label>
                                                <Input required type="date" value={this.state.date} onChange={this.handleChange} name="date" id="date" />
                                                <Input required type="time" value={this.state.time} onChange={this.handleChange} name="time" id="time" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="description">Description</Label>
                                                <Input required type="text" name="description" id="description" placeholder="Enter Description"  onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="country">Country</Label>
                                                <Input required  type="text" name="country" id="country" placeholder="Enter the country name"  onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="city">City</Label>
                                                <Input required type="text" name="city" id="city" placeholder="Enter the city name"  onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="street">Street</Label>
                                                <Input required type="text" name="street" id="street" placeholder="Enter the street number"  onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="image">Image</Label>
                                                <Input required type="file" name="image" id="image" placeholder="Upload item image"  onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup class="d-flex justify-content-center mt-5 pb-5">
                                                <Button className="button btn btn-secondary text-uppercase px-5">Save</Button>
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
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
    postEvent
  }, dispatch)

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Event)