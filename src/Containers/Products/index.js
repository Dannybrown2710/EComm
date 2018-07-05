import React, { Component } from 'react';
import { Container, Row, Col, Card } from "reactstrap";
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
import {
  loadProducts,
  setCurrentProduct
} from '../../modules/products'
const images = require.context('../../images', true);
class Products extends Component {
    constructor(props){
        super(props);
        this.state={
        
        }
        this.redirectToTarget=this.redirectToTarget.bind(this);
    }
    componentDidMount(){
        store.dispatch(loadProducts());
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
                    <h3 className="text-center my-4">All Items</h3>
                    <Row>
                        {this.props.products && this.props.products.map((item, index) =>
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
                </Container>
            </div>
        );
    }
}
const mapStateToProps = state => ({
   products:state.product.products
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
   
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Products)