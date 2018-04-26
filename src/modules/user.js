export const LOGIN = "user/LOGIN";
export const LOGOUT = "user/LOGOUT";
export const LOGIN_REQUESTED = "user/LOGIN_REQUESTED";
export const USER_SIGNUP = "user/USER_SIGNUP";
export const USER_EDIT = "user/USER_EDIT";



const initialState = {
  loggedIn: false,
  loggingIn:false
}

export default (state = initialState, action) => {
  console.log(action)
  console.log(state);
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
        loggingIn: true
      }

    case LOGIN:
      return {
        ...state,
        loggedIn: !state.loggedIn,
        loggingIn: !state.loggingIn
      }

    default:
      return state
  }
}


export const login = () => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    })

    dispatch({
      type: LOGIN
    })
  }
}

export const loginWithAPI = () => {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUESTED
    })

    return setTimeout(() => {
      dispatch({
        type: LOGIN,
        payload:"Username"
      })
    }, 3000)
  }
}
