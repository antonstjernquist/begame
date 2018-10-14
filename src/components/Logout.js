import { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUserAction } from '../actions/authActions.js';


class Logout extends Component {
    constructor(props) {
        super(props);
        const { dispatch, history } = props;
        dispatch(logoutUserAction());
        history.push('/');
    }

  render() {
    return null;
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(Logout);
