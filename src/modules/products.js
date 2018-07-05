import {NetworkApi} from '../NetworkApi';
import groupBy from 'lodash.groupby';
import mapValues from 'lodash.mapvalues';

export const LOAD_PRODUCTS = "product/LOAD_PRODUCTS";
export const ACTIVE_PRODUCT = "product/ACTIVE_PRODUCT";
export const FILTERED_PRODUCT = "product/FILTERED_PRODUCT";
export const LAST_VIEWED = "product/LAST_VIEWED";
export const NO_LAST_VIEWED = "product/NO_LAST_VIEWED";
export const ACTIVE_PRODUCT_OWNER = "product/ACTIVE_PRODUCT_OWNER"
export const CATEGORIES = "product/CATEGORIES"
const initialState = {
  products:[],
  activeProduct:{},
  userId:null,
  newProduct:{
    "Item_Name": "",
    "Item_Price": 0,
    "Item_Size": "",
    "Item_Category": "",
    "Item_Subcategory": "",
    "Item_Country": "",
    "Item_City": "",
    "Item_Street_Number": "",
    "Item_Condition": "",
    "Item_Image": "",
    "Item_Description": "",
    "Item_Availability": 1
  },
  filterProducts:[],
  lastViewedProducts:[],
    categories: {},
  activeProductOwner:0
}
export default (state = initialState, action) => {
  switch (action.type) {
      case CATEGORIES:
        return {
          ...state,
          categories:action.payload
        }
        case LOAD_PRODUCTS:
        return {
          ...state,
          products:action.payload
        }
      case ACTIVE_PRODUCT:
      return {
        ...state,
        activeProduct:action.payload
      }
      case ACTIVE_PRODUCT_OWNER:
      return {
        ...state,
        activeProductOwner:action.payload
      }
      case FILTERED_PRODUCT:
      return {
        ...state,
        filterProducts:action.payload
      }
      case LAST_VIEWED:
      return {
        ...state,
        lastViewedProducts:action.payload
      }
      case NO_LAST_VIEWED:
      return {
        ...state,
        lastViewedProducts:[]
      }
    default:
      return state
  }
}

export const setCurrentProduct = (id) => {
  return (dispatch,getState) => {
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.getItemDetailsById(id).then(function(res){
      if(getState().user.loggedIn && getState().user.userDetails.User_ID)
      NetworkApi.addToHistory(getState().user.userDetails.User_ID,res.data.Item_ID);
      dispatch({
        type:ACTIVE_PRODUCT,
        payload:res.data
      });
      
      NetworkApi.getItemOwnerByItemId(res.data.Item_ID).then(
        function(resp){
          dispatch({
            type:ACTIVE_PRODUCT_OWNER,
            payload:resp.data
          });
        }
      );
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch((error)=>{
            console.error("DELETE_ERROR: "+JSON.stringify(error));
            dispatch({
              type:LOAD_PRODUCTS,
              payload:[]
            });
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
  }
}

export const loadProducts = (data) =>{
  return dispatch => {
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.getItems().then(function(res){
      dispatch({
        type:LOAD_PRODUCTS,
        payload:res.data
      });
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch((error)=>{
            console.error("DELETE_ERROR: "+JSON.stringify(error));
            dispatch({
              type:LOAD_PRODUCTS,
              payload:[]
            });
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
  };
}
export const loadLastViewed = (userId) =>{
  return (dispatch,getState) => {
    let userId = getState().user.userDetails.User_ID
    dispatch({
      type:"global/START_LOADING"
    })
    if(userId){
    return NetworkApi.getHistory(userId).then(function(res){
      dispatch({
        type:LAST_VIEWED,
        payload:res.data
      });
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch((error)=>{
            console.error("DELETE_ERROR: "+JSON.stringify(error));
            dispatch({
              type:LAST_VIEWED,
              payload:[]
            });
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
      }
      else{
        dispatch({
          type:NO_LAST_VIEWED
        });
        dispatch({
          type:"global/STOP_LOADING"
        })
      }
  };
}

export const setFilteredProducts = (qParam) =>{
  //console.log(data);
 
  return dispatch => {
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.searchItem(qParam).then(function(res){
      dispatch({
        type:FILTERED_PRODUCT,
        payload:res.data
      });
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch((error)=>{
            console.error("DELETE_ERROR: "+JSON.stringify(error));
            dispatch({
              type:FILTERED_PRODUCT,
              payload:[]
            });
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
  };
}


export const postItem = (data) =>{
  return (dispatch,getState) => {
  let date = new Date(data.date+" "+data.time+":00").toISOString();
  let item = {
      User_ID : data.User_ID,
    Item_Name:data.name,	
    Item_Price	:data.price,	
    Item_Size:data.size,		
    Item_Category	:data.category,	
    Item_Subcategory	:data.subCategory,
    Item_Country:data.country,
    Item_City:data.city,
    Item_StreetNumber:data.street,
    Item_Description:data.description,
    Item_Image: data.image,
    Item_Condition:data.condition,	

  }
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.postItem(item).then(function(res){
      alert("Item uploaded successfully");
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch((error)=>{
           alert("There was an error in uploading the event. Kindly try again in sometime");
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
  }
}

export const getCategories = () =>{
  return (dispatch,getState) => {
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.getCategories().then(function(res){
        const categories = mapValues(groupBy(res.data, 'Category'), itemArray=>itemArray.map(item=>item.Subcategory));
        dispatch({
            type:CATEGORIES,
            payload:categories
        });
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch(()=>{
            dispatch({
              type:"global/STOP_LOADING"
            })
        });
  }
}