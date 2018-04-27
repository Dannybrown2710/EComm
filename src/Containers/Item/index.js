import React from 'react'
import { goBack } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  login,
  loginWithAPI
} from '../../modules/user'

const Item = props => (
  <div>
    <h1>Item Description</h1>
    <p>
      <button onClick={props.login} disabled={props.loggingIn}>Login</button>
      <button onClick={props.loginWithAPI} disabled={props.loggingIn}>Login Async</button>
    </p>

    <p><button onClick={() => props.changePage()}>Go back</button></p>
  </div>
)

const mapStateToProps = state => ({
  login: state.user.loggedIn,
  loggingIn: state.user.loggingIn
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  loginWithAPI,
  changePage: () => goBack()
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)
