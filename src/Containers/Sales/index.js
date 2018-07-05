import React, { Component } from 'react';
import { Container, Row, Col, Card } from "reactstrap";
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
import {
  loadEvents,
  setCurrentEvent
} from '../../modules/events'
const images = require.context('../../images', true);
class Sales extends Component {
    constructor(props){
        super(props);
        this.state={
        
        }
        this.redirectToTarget=this.redirectToTarget.bind(this);
        this.formatDate=this.formatDate.bind(this);
    }
    componentDidMount(){
        store.dispatch(loadEvents());
    }
     redirectToTarget(e){
        let id = e.currentTarget.attributes["data-id"].value;
        store.dispatch(setCurrentEvent(id));
        this.props.history.push('/event-desc/'+id)
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
    render() {
        return (
            <div>
                <Container>
                    <h3 className="text-center my-4">Sale around me</h3>
                    <Row>
                        {this.props.events && this.props.events.map((item, index) =>
                            <Col data-id={item.Event_ID} onClick={this.redirectToTarget} lg={4} md={4} sm={6} xs={12} className="my-3">
                                <Card>
                                    <img alt="product image" style={{maxHeight:"300px"}} src={item.Event_Image} className="img-responsive p-3" />
                                    <span>
                                        <h5 className="">{item.Event_Name}</h5>
                                        <h5 className="">{item.Event_Country}</h5>
                                        <h5 className="">{this.formatDate(item.Event_Date)}</h5>
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
   events:state.event.events
  })
  const mapDispatchToProps = dispatch => bindActionCreators({
   
  }, dispatch)
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sales)