import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { load } from '../../modules/global';
import './index.css';
const Loader = props => (
  (props.isLoading==true && (<div className="loading">Loading&#8230;</div>))
)
const mapStateToProps = state => ({
  isLoading:state.global.isLoading
})
const mapDispatchToProps = dispatch => bindActionCreators({
  load
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loader)
