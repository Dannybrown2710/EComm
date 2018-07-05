import { push } from 'react-router-redux';
import store from '../store';
import { NetworkApi } from '../NetworkApi';
import Cookies from 'universal-cookie';
import {LOAD_PRODUCTS, LOAD_USER_PRODUCTS} from "./products";
export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";
export const LOGIN_REQUESTED = "user/LOGIN_REQUESTED";
export const USER_SIGNUP = "user/USER_SIGNUP";
export const USER_EDIT = "user/USER_EDIT";
export const SET_USER = "user/SET_USER";
export const REGISTER_EXTERNAL = "user/REGISTER_EXTERNAL";
export const SET_ALL_USERS = "user/SET_ALL_USERS";
export const SET_CURRENT_USER = "user/SET_CURRENT_USER";
export const SET_FAVOURITES = "user/SET_FAVOURITES";
export const SET_USER_ITEMS = "user/SET_USER_ITEMS";
export const SET_USER_EVENTS = "user/SET_USER_EVENTS";
export const SET_FAVOURITES_EVENTS = "user/SET_FAVOURITES_EVENTS";
const cookies = new Cookies();

const initialState = {
  loggedIn: false,
  users:[],
  loggingIn:false,
  userDetails:{},
  favourites:[],
  favouriteEvents:[]
}
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        loggingIn: true,
      }
    case SET_USER:
      return {
        ...state,
        user:action.payload.email,
      }
      case SET_CURRENT_USER:
      return{
        ...state,
        userDetails:action.payload
      }
      case SET_ALL_USERS:
      return {
        ...state,
        users:action.payload,
      }
    case SET_FAVOURITES:
    return {
      ...state,
      favourites:action.payload
    }
    case SET_FAVOURITES_EVENTS :
    return {
      ...state,
      favouriteEvents:action.payload
    }
    case SET_USER_ITEMS:
    return {
      ...state,
      myItems:action.payload
    }
    case SET_USER_EVENTS:
    return {
      ...state,
      attendingEvents:action.payload
    }
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        loggingIn: !state.loggingIn,
      }
      case USER_SIGNUP:
        return {
          ...state,
          loggedIn: true,
          loggingIn: !state.loggingIn,
          password:null
        }
      case LOGOUT:
        return {
          ...state,
          loggedIn: false,
          userId:null,
          userDetails:{},
          loggingIn: !state.loggingIn,
          password:null
        }
        
    default:
      return state
  }
}

export const loadAllUsers = () => {
  return (dispatch,getState) => {
  NetworkApi.getAllUsers().then(function(res){
    dispatch({
      type: SET_ALL_USERS,
      payload: res.data
    })
    
    
  })
}
}
export const login = (data) => {
  var decodedString = window.atob(data);  
  let payload ={email:decodedString};
  return (dispatch,getState) => {
    dispatch({
      type:"global/START_LOADING"
    })  
      dispatch({
        type: SET_USER,
        payload: payload
      })
      if(decodedString){
        NetworkApi.getUserDetailsFromEmail(decodedString).then(function(resp){
          dispatch({
            type: SET_CURRENT_USER,
            payload: resp.data
          })
          dispatch({
            type: LOGIN
          })
          dispatch(getFavourites())
        })
        
    }
    dispatch({
      type:"global/STOP_LOADING"
    })  
    dispatch({
      type: LOGIN_REQUESTED
    })
    
  }
}

export const loginWithAPI = (data) => {
  return dispatch => {
    dispatch({
      type:"global/START_LOADING"
    })
    dispatch({
      type: LOGIN_REQUESTED
    })
    return NetworkApi.login(data).then(function(res){
      if(res.data==true){
      dispatch({
        type:LOGIN,
        payload:res.data
      });
      let expire = new Date();
      expire.setDate(expire.getDate() + 7); 
      let email = window.btoa( data.email ); 
      cookies.set('login', email, { expires: expire });
      dispatch({
        type:"global/STOP_LOADING"
      })
      dispatch(push('/'));
    }
    else{
      alert("Please enter valid username / password");
      dispatch({
        type:"global/STOP_LOADING"
      })
    }
      return false;
    }).catch((error)=>{
            console.error("DELETE_ERROR: "+JSON.stringify(error));
            dispatch({
              type:LOGIN,
              payload:{}
            });
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
  }
}

export const logout = () => {
  console.log("logged out");
  cookies.remove('login')
  return dispatch => {
    dispatch({
      type:"global/START_LOADING"
    })
    dispatch({
      type: LOGOUT
    })
    dispatch(push('/'))
    dispatch({
      type:"global/STOP_LOADING"
    })
  }
}

export const signUp = (data) => {
  
  let user={
    User_ID	:0,
    User_Email:data.semail,
    User_FirstName:data.sfName,	
    User_LastName:data.slName,
    User_ProfilePic	:data.image,
    User_PhoneNumber:data.sphone,	
    User_Country:data.scountry,
    User_City:data.scity,
    User_StreetNumber:data.sstreet,	
    User_Password:data.spassword,
    User_Rating:5
  }
  
  return dispatch => {
    dispatch({
      type:"global/START_LOADING"
    })
    NetworkApi.register(user).then(function(resp){
      console.log(resp)
      NetworkApi.getUserDetailsFromEmail(user.User_Email).then(function(resp){
        dispatch({
          type: SET_CURRENT_USER,
          payload: resp.data
        })
        let expire = new Date();
        expire.setDate(expire.getDate() + 7); 
        let email = window.btoa( user.User_Email ); 
        cookies.set('login', email, { expires: expire });
        dispatch({
          type: LOGIN
        })
      })
      dispatch({
        type:"global/STOP_LOADING"
      })
      alert("Registered successfully");
      dispatch({
        type: USER_SIGNUP
      })
      
      let expire = new Date();
      expire.setDate(expire.getDate() + 7); 
      let email = window.btoa( user.User_Email ); 
      cookies.set('login', email, { expires: expire });
    }).catch(function(err){
      console.log(err.response);
      if(err.response.data.ExceptionMessage.indexOf("Duplicate")!=-1)
        alert("This account is already registered")
      else
        alert(err.response.data.ExceptionMessage)
      dispatch({
        type:"global/STOP_LOADING"
      })
    })
    
  }
}

export const signUpExternal = () => {
  console.log("logged out");
  return dispatch => {
    dispatch({
      type: REGISTER_EXTERNAL
    })
  }
}
export const getFavourites = () => {
  return (dispatch,getState) => {
    NetworkApi.getFavourites(getState().user.userDetails.User_ID).then(function(resp){
      dispatch({
        type: SET_FAVOURITES,
        payload:resp.data
      })
  });
  NetworkApi.getAttendingEvents(getState().user.userDetails.User_ID).then(function(res){
    dispatch({
      type: SET_FAVOURITES_EVENTS,
      payload:res.data
    })
  })
  }
}

export const getMyItems = () => {
    return (dispatch, getState) => {
        return NetworkApi.getUserItems(getState().user.userDetails.User_ID).then(function(res){
            dispatch({
                type:SET_USER_ITEMS,
                payload:res.data
            });
            return false;
        }).catch((error)=>{
            console.error(JSON.stringify(error));
            //dispatch(push('/delete-fail-uri'));
        });
    };
}

export const getMyEvents = () => {
    return (dispatch, getState) => {
        return NetworkApi.getUserEvents(getState().user.userDetails.User_ID).then(function(res){
            dispatch({
                type:SET_USER_EVENTS,
                payload:res.data
            });
            return false;
        }).catch((error)=>{
            console.error(JSON.stringify(error));
            //dispatch(push('/delete-fail-uri'));
        });
    };
}