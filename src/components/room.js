import React, { Component } from 'react';
import { connect } from 'react-redux';


class Comp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id
    }
  }

  compnentDidMount(){
    /* Retrieve room from database. Action > Reducer > */

  }

  render() {
    return (
      <span> ID specified: {this.state.id}</span>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(Comp);
