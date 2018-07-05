import {NetworkApi} from '../NetworkApi';
export const LOAD_EVENTS = "event/LOAD_EVENTS";
export const ACTIVE_EVENT = "event/ACTIVE_EVENT";
const initialState = {
    events:[],
    activeEvent:{},
    events:[]
  }
  export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS:
          return {
            ...state,
            events:action.payload
          }
        case ACTIVE_EVENT:
      return {
        ...state,
        activeEvent:action.payload
      }
      default:
        return state
    }
  }

export const loadEvents = () =>{
    //console.log(data);
   
    return dispatch => {
      dispatch({
        type:"global/START_LOADING"
      })
      return NetworkApi.getEvents().then(function(res){
        dispatch({
          type:LOAD_EVENTS,
          payload:res.data
        });
        dispatch({
          type:"global/STOP_LOADING"
        })
        return false;
      }).catch((error)=>{
              console.error("DELETE_ERROR: "+JSON.stringify(error));
              dispatch({
                type:LOAD_EVENTS,
                payload:[]
              });
              dispatch({
                type:"global/STOP_LOADING"
              })
              //dispatch(push('/delete-fail-uri'));
          });
    };
  }
  export const setCurrentEvent = (id) => {
  return dispatch => {
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.getEventDetailsById(id).then(function(res){
      dispatch({
        type:ACTIVE_EVENT,
        payload:res.data
      });
      /*NetworkApi.getEventOwnerByEventId(res.data.Item_ID).then(
        function(resp){
          console.log(resp);
          dispatch({
            type:ACTIVE_PRODUCT_OWNER,
            payload:resp.data
          });
        }
      );*/
      dispatch({
        type:"global/STOP_LOADING"
      })
      return false;
    }).catch((error)=>{
            console.error("DELETE_ERROR: "+JSON.stringify(error));
            dispatch({
              type:ACTIVE_EVENT,
              payload:{}
            });
            dispatch({
              type:"global/STOP_LOADING"
            })
            //dispatch(push('/delete-fail-uri'));
        });
  }
}
  
export const postEvent = (data) =>{
  return (dispatch,getState) => {
  let date = new Date(data.date+" "+data.time+":00").toISOString();
  let event = {
      User_ID : data.User_ID,
      Event_ID:0,
      Event_Name:data.name,	
      Event_Image:data.image,
      Event_Date:date,
      Event_Country:data.country,
      Event_City:data.city,
      Event_StreetNumber:data.street,
      Event_Description:data.description
  }
    dispatch({
      type:"global/START_LOADING"
    })
    return NetworkApi.postEvent(event).then(function(res){
      alert("Event uploaded successfully");
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