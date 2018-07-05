import React, { Component } from 'react';
import { Container, Row, Col, Card,Jumbotron, } from "reactstrap";
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
import {
  loadProducts,
  setCurrentProduct,
  setFilteredProducts
} from '../../modules/products'
const images = require.context('../../images', true);
class SearchResults extends Component {
    constructor(props){
        super(props);
        this.state={
            text:"Searching"
        }
        this.redirectToTarget=this.redirectToTarget.bind(this);
    }
    componentDidMount(){
        store.dispatch(loadProducts());
    }
     componentDidMount() {
        if(this.props.products.length==0 && this.props.match.params && this.props.match.params.qParam){
            store.dispatch(setFilteredProducts(this.props.match.params.qParam));
        }
    }
    componentWillReceiveProps(nextProps){

      if(!nextProps.products)
          this.props.history.push('/');
    else if(nextProps.products.length==0)
        this.setState({
            text:"No Items Found 🙁"
        })
    if(nextProps.match.params.qParam!=this.props.match.params.qParam)
         store.dispatch(setFilteredProducts(nextProps.match.params.qParam));
    }
     redirectToTarget(e){
        let id = e.currentTarget.attributes["data-id"].value;
        store.dispatch(setCurrentProduct(id));
        this.props.history.push('/item-desc/'+id)
    }
    render() {
        return (
            <div>
                <Container>
                    <h3 className="text-center my-4">Search Results</h3>
                    <Row>
                        {this.props.products && this.props.products.length>0  && this.props.products.map((item, index) =>
                            <Col data-id={item.Item_ID} onClick={this.redirectToTarget} lg={4} md={4} sm={6} xs={12} className="my-3">
                                <Card>
                                    <img alt="product image" style={{maxHeight:"300px"}} src={item.Item_Image} className="img-responsive p-3" />
                                    <span>
                                        <h5 className="pull-left">{item.title}</h5>
                                        <h5 className="pull-left">{item.location}</h5>
                                        <h5 className="pull-left">{item.price}</h5>
                                    </span>
                                </Card>
                            </Col>
                        )}
                    </Row>
                    { this.props.products &&  this.props.products.length==0 && (
                         <Jumbotron className="text-center">
                            <h1 className="text-center display-3">{this.state.text}</h1>
                        </Jumbotron>
                    )

                    }
                </Container>
            </div>
        );
    }
}
const mapStateToProps = state => ({
   products:state.product.filterProducts
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
   
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchResults)