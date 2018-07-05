import React, { Component } from "react";
import './item.css';
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input,Button } from 'reactstrap';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
import {getCategories, postItem} from '../../modules/products';
import S3FileUpload from '../../react-s3';
import { uploadFile } from '../../react-s3';
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

class Item extends Component {
    constructor(props){
        super(props);
        this.state={
            condition:"New"
        }
        this.handleChange=this.handleChange.bind(this);
        this.submit=this.submit.bind(this);
        this.getBase64=this.getBase64.bind(this);
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
        });
        
        this.props.getCategories();
        console.log(this.props)
        this.setState({User_ID : this.props.userDetails.User_ID},()=>{
            console.log(this.state)
        });
        
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.userDetails.User_ID!=this.props.userDetails.User_ID){
            this.setState({User_ID : nextProps.userDetails.User_ID},()=>{
                console.log(this.state)
            })
        }
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
                value= data.key
                this.setState({
                    [name]: value
                  },()=>{
                    store.dispatch({
                        type:"global/STOP_LOADING"
                      })
                  });
            } )
            .catch(err => {
                console.error(err)
                store.dispatch({
                    type:"global/STOP_LOADING"
                  })
            })
 
            /*value = this.getBase64(file).then((resp)=>{
                setTimeout(
                this.setState({
                    [name]: resp
                  }),100);
            });*/

        }
        else
            value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
          [name]: value
        });

      }
      submit(e){
        e.preventDefault();
        this.props.postItem(this.state);
      }
    render() {
        console.log(this.state)
        return (
            <div>
                <div className="pt-5 font-white bg-light">
                    <h3 className="text-center mb-4">Add Item</h3>
                    <Container>
                        <Row>
                            <Col className="mb-3">
                                <Card>
                                    <CardBody>
                                        <Form onSubmit={this.submit}>
                                        <FormGroup>
                                                <Label for="name">Name</Label>
                                                <Input required type="text" name="name" id="name" placeholder="Enter name" onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label  for="category">Category</Label>
                                                <Input required type="select" name="category" id="category" onChange={this.handleChange}>
                                                <option value="">Choose</option>
                                                    {Object.keys(this.props.categories).map(cat=><option key={cat} value={cat}>{cat}</option>)}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="subCategory">Sub Category</Label>
                                                <Input required type="select" name="subCategory" id="subCategory" onChange={this.handleChange} disabled={!this.state.category}>
                                                    <option value="">Choose</option>
                                                    {this.state.category && this.props.categories[this.state.category].map(sub=><option key={sub} value={sub}>{sub}</option>)}
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="description">Description</Label>
                                                <Input required type="text" name="description" id="description" placeholder="Enter Description" onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="condition">Condition</Label>
                                                <Input required type="select" name="condition" id="condition" onChange={this.handleChange}>
                                                    <option value="">Choose</option>
                                                    <option value="new">New</option>
                                                    <option value="mid">Sparingly Used</option>
                                                    <option value="used">Used</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="size">Size</Label>
                                                <Input required type="select" name="size" id="size" onChange={this.handleChange}>
                                                    <option value="">Choose</option>
                                                    <option value="s">Small</option>
                                                    <option value="m">Medium</option>
                                                    <option value="l">Large</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="price">Price</Label>
                                                <Input required type="number" step="1"  name="price" id="price"  placeholder="Price" onChange={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="country">Country</Label>
                                                <Input required type="text" name="country" id="country" placeholder="Enter the country name" onChange={this.handleChange} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="city">City</Label>
                                                <Input required type="text" name="city" id="city" placeholder="Enter the city name" onChange={this.handleChange} onBlur={this.handleChange}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="street">Street</Label>
                                                <Input required type="text" name="street" id="street" placeholder="Enter the street number" onChange={this.handleChange}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="image">Image</Label>
                                                <Input type="file" name="image" id="image" placeholder="Upload item image" onChange={this.handleChange}/>
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
    categories: state.product.categories,
    userDetails:state.user.userDetails
})
const mapDispatchToProps = dispatch => bindActionCreators({
  postItem, getCategories
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)