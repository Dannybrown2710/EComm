export const START_LOADING = "global/START_LOADING";
export const STOP_LOADING = "global/STOP_LOADING";

const initialState = {
  isLoading:false
}
export default (state = initialState, action) => {
  //console.log(state)
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}


export const load = (flag) => {
  return dispatch => {
    flag==true? dispatch({
      type: START_LOADING,
    }):dispatch({
      type: STOP_LOADING
    })
  }
}
