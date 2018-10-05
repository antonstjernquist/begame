import React, { Component, Fragment } from 'react';
import { addValueAction } from '../actions/valueActions.js';
import { connect } from 'react-redux';

const backroundImage = require('../resources/begame.png')

/* Import actions */

class Home extends Component {

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
        <img src={backroundImage} alt="Begame"/>
      </Fragment>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(Home);
