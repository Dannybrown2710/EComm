import React,{Component} from 'react';
import { push } from 'react-router-redux'
import {Redirect} from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import store from '../../store';
class EnsureLoggedInContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn:false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn!=this.props.loggedIn) {
      this.setState({loggedIn:nextProps.loggedIn})
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      //store.dispatch(push('/login'));
    }
  }
  componentDidMount() {
    if(this.props.loggedIn){
      this.setState({loggedIn:true})
    }
  }
  error(){
    //alert("Kindly login");
    return "";
  }


  render() {
    
      return (
        <div>
        {this.state.loggedIn ?(<div>{this.props.children}</div>):(<div className="jumbotron text-center "><h3>Log in to explore more</h3></div>)}
        </div>
      )
   
  }
}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (url) => push(url)
}, dispatch)

export default connect(mapStateToProps,mapDispatchToProps)(EnsureLoggedInContainer)
