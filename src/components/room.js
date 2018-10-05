import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

/* Import actions */
import { addValueAction } from '../actions/valueActions.js';

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    }
  }

  compnentDidMount(){
    /* Retrieve room from database. Action > Reducer > */

  }

  handleClick = e => {
      this.props.dispatch(addValueAction(1));
  }

  render() {
    return (
      <Fragment>
        <span> ID specified: {this.state.id}</span>
        <span> Value from store: {this.props.value}</span>
        <button onClick={this.handleClick}> Add to value </button>
      </Fragment>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(Room);
