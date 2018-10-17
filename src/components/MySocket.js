import React, { Component } from 'react';

import { connect } from '../api/index.js';

class MySocket extends Component {
  constructor(props){
    super(props);
    // io socket --------------
    connect(message => {
      console.log(message);
    });
  }
  render(){
    return(
      <div>hej</div>
    )
  }
}

export default MySocket;
