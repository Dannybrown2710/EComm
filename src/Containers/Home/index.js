
import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  login,
  loginWithAPI
} from '../../modules/user'

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>
      <button onClick={props.login} disabled={props.loggingIn}>Login</button>
      <button onClick={props.loginWithAPI} disabled={props.loggingIn}>Login Async</button>
    </p>

    <p><button onClick={() => props.changePage()}>Go to about page via redux</button></p>
  </div>
)

const mapStateToProps = state => ({
  login: state.user.loggedIn,
  loggingIn: state.user.loggingIn
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  loginWithAPI,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
