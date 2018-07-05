import React,{Component} from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SuccessOutlineButton from '../button/Button';
import { Container, Row, Col, Button } from "reactstrap";
import Card from "../card/Card";
import Slider from 'react-slick';
import { NetworkApi } from '../../NetworkApi';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from '../../store';
import {
  loadProducts,
  setCurrentProduct,
  loadLastViewed
} from '../../modules/products'
import {
    loadEvents
  } from '../../modules/events'
import { getFavourites } from '../../modules/user';
const images = require.context('../../images',true);
var products =  [
       {
           "Item_ID": 1,
           "Item_Name": "sample string 2",
           "Item_Price": 3,
           "Item_Size": "sample string 4",
           "Item_Category": 5,
           "Item_Subcategory": 6,
           "Item_Location": "sample string 7",
           "Item_Condition": "sample string 8",
           "Item_Image": "./dress/dress1.png",
           "Item_Description": "sample string 10"
       },
       {
           "Item_ID": 1,
           "Item_Name": "sample string 2",
           "Item_Price": 3,
           "Item_Size": "sample string 4",
           "Item_Category": 5,
           "Item_Subcategory": 6,
           "Item_Location": "sample string 7",
           "Item_Condition": "sample string 8",
           "Item_Image": "./dress/dress1.png",
           "Item_Description": "sample string 10"
       }
   ]



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


let settings = {
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{ breakpoint: 1320, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 767, settings: { slidesToShow: 1, arrows: false,dots: true, } }],
};
class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      product:{}
    }
    this.redirectToTarget=this.redirectToTarget.bind(this);
    this.addToFav=this.addToFav.bind(this);
    this.checkFav=this.checkFav.bind(this);
  }

  addToFav(e,type){
      e.stopPropagation();
      let itemId = e.target.getAttribute('data-id');
      store.dispatch({
        type:"global/START_LOADING"
    });
      NetworkApi.addToFav("item",this.props.userDetails.User_ID,itemId).then(function(resp){
          store.dispatch(getFavourites())
          store.dispatch({
            type:"global/STOP_LOADING"
        });
      });
  }
  componentDidMount(){
    /*store.dispatch({
      type:"product/LOAD_PRODUCTS",
      payload:products
    })*/
    store.dispatch(loadProducts());
    store.dispatch(loadEvents());
    if(this.props.loggedIn){
        console.log("User logged in")
        store.dispatch(loadLastViewed(this.props.userId));
    }else{
        store.dispatch(loadLastViewed())
    }
  }

  redirectToTarget(type,id){
    store.dispatch(setCurrentProduct(id));
    this.props.history.push('/'+type+'/'+id)
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.favourites.length!=this.props.favourites.length){
          this.setState({favourites:nextProps.favourites})
      }
      if(nextProps.loggedIn!=this.props.loggedIn){
        store.dispatch(loadLastViewed(this.props.userId));
    }
  }
  checkFav(itemId){
    var flag = false;
    flag = this.props.favourites.find(function(item){
        if(item.Item_ID==itemId)
            return 1;
    })
    return flag;

    //return this.props.favourites.find(function(ele){ele.Item_ID==itemId})
  }
  modifyFav(e,type){
    e.stopPropagation();
      if(type=="item"){
          if(e.target.getAttribute('data-fav')){
            store.dispatch({
                type:"global/START_LOADING"
            });
            NetworkApi.deleteItemFromFav(this.props.userDetails.User_ID,e.target.getAttribute('data-id')).then(
             function(resp){
                store.dispatch(getFavourites());
                store.dispatch({
                    type:"global/STOP_LOADING"
                });
             }   
            );
          }
          else{
              this.addToFav(e,"item")
          }
      }
  }
  render(){
    return(
            <div className="bg-light container-padding">
            <Container>
                <div className="pt-5 font-white ">
                    <h3 className="text-uppercase pl-8-5">Recommended for you</h3>
                    <p className="py-2 pl-8-5">we think you will love these picks</p>
                    <Container fluid={true}>
                            <Slider {...settings}>
                                {this.props.products && this.props.products.length>0 && this.props.products.map((item, index) =>
                                    <Col key={"p"+item["Item_ID"]} onClick={()=>this.redirectToTarget('item-desc',item['Item_ID'])}>
                                        <Card data-index={item['Item_ID']} key={"p"+index}>
                                            <img alt="product image" src={item['Item_Image']} className=" img-responsive c-i p-3" />
                                            <span>
                                                <h5 className="pull-left">{item.Item_Subcategory}</h5>
                                                <i data-fav={this.checkFav(item['Item_ID'])} data-id={item['Item_ID']} onClick={(e)=>this.modifyFav(e,"item")} className={this.props.favourites.length>0 && this.checkFav(item['Item_ID'])?"fa fa-heart fa-2x pull-right":"fa fa-heart-o fa-2x pull-right"}></i>
                                            </span>
                                            <hr className="w-75" />
                                            <p>₪{item.Item_Price}</p>
                                        </Card>
                                    </Col>
                                )}
                            </Slider>
                        <div className="d-flex justify-content-center mt-5 pb-5">
                            <Link className="button btn btn-secondary" to={'/products'}>VIEW ALL</Link>
                        </div>
                    </Container>
                </div>

                <div className="pt-5 font-white ">
                    <h3 className="text-uppercase pl-8-5">Home Sale around you</h3>
                    <p className="py-2 pl-8-5">Discover </p>
                    <Container fluid={true}>
                            <Slider {...settings}>
                                {this.props.events && this.props.events.length>0 && this.props.events.map((item, index) =>
                                    <Col key={"hs"+item['Event_ID']} data-id={item['Event_ID']} onClick={()=>this.redirectToTarget('event-desc',item['Event_ID'])}>
                                        <Card data-index={index} key={"ev"+index}>
                                            <img alt="product image" src={this.props.events[index]['Event_Image']} className="img-responsive c-i p-3" />
                                            <span>
                                                <h5 className="pull-left">{this.props.events[index].Event_Name}</h5>
                                                <i data-id={item['Event_ID']} onClick={(e)=>this.addToFav(e,"event")} className="fa fa-heart-o fa-2x pull-right"></i>
                                            </span>
                                            <hr className="w-75" />
                                            <p>{this.props.events[index].Event_Country}</p>
                                        </Card>
                                    </Col>
                                )}
                            </Slider>
                        <div className="d-flex justify-content-center mt-5 pb-5">
                            <Link className="button btn btn-secondary" to={'/sales'}>VIEW ALL</Link>
                        </div>
                    </Container>
                </div>



                <div className="pt-5 font-white">
                    <h3 className="text-uppercase pl-8-5">Last Viewed</h3>
                    <p className="py-2 pl-8-5">Buy from your viewlist</p>
                    <Container>
                            <Slider {...settings}>
                                {this.props.lastViewedProducts && this.props.lastViewedProducts.map((item, index) =>
                                     <Col key={"lv"+item["Item_ID"]} onClick={()=>this.redirectToTarget('item-desc',item['Item_ID'])}>
                                     <Card data-index={item['Item_ID']} key={"p"+index}>
                                         <img alt="product image" src={item['Item_Image']} className=" img-responsive c-i p-3" />
                                         <span>
                                             <h5 className="pull-left">{item.Item_Subcategory}</h5>
                                             <i data-fav={this.checkFav(item['Item_ID'])} data-id={item['Item_ID']} onClick={(e)=>this.modifyFav(e,"item")} className={this.props.favourites.length>0 && this.checkFav(item['Item_ID'])?"fa fa-heart fa-2x pull-right":"fa fa-heart-o fa-2x pull-right"}></i>
                                         </span>
                                         <hr className="w-75" />
                                         <p>₪{item.Item_Price}</p>
                                     </Card>
                                 </Col>
                                )}
                            </Slider>
                        
                </Container>
                </div>
                </Container>
            </div>
        );
      }
    }


const mapStateToProps = state => ({
  products:state.product.products,
  lastViewedProducts:state.product.lastViewedProducts,
  events:state.event.events,
  loggedIn:state.user.loggedIn,
  userId:state.user.userId,
  favourites:state.user.favourites,
  userDetails:state.user.userDetails
})
const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
