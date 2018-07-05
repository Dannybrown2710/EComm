import React,{Component} from 'react';
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
class PageRender extends Component {

  componentDidUpdate(prevProps) {
    const { dispatch, redirectUrl } = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      //dispatch(navigateTo(redirectUrl))
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

  render() {
    return (
    <div>
    {this.props.children}
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.loggedIn,
    redirectUrl: state.user.redirectUrl
  }
}

export default connect(mapStateToProps)(PageRender)
