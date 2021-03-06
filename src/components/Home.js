import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { showSnackbarError } from '../actions/errorHandlingActions';
import { loginAsStudent } from '../actions/authActions';

import Menu from './Menu.js';
import ErrorHandling from './ErrorHandling.js';

const backgroundImage = require('../resources/background_pleb.jpg');
const logo = require('../resources/logo.png');

const styles = () => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 50px)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, .9), rgba(0, 0, 0, .9)), url(${backgroundImage})`,
    backgroundColor: '#fafafa',
    backgroundSize: 'cover',
  },
  container: {
    padding: 40,
    marginTop: -70,
    paddingTop: 30,
  },
  margin: {
    width: 350,
  },
  welcome: {
    textAlign: 'center',
  },
  login: {
    textAlign: 'center',
    marginBottom: 20,
  },
  copyright: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: -70,
    color: '#fff',
  },
  logo: {
    marginTop: -100,
    marginBottom: 30,
    zIndex: 1
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      roomId: '',
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validation = () => {
    const { username, roomId } = this.state;
    const { dispatch } = this.props;
    if (!username || !roomId) {
      dispatch(showSnackbarError('Användarnamn eller ID är felaktigt.'));
    } else {
      this.login(username, roomId);
    }
  }

  login = (username, roomId) => {
    const { history, dispatch } = this.props;
    const data = {
      history,
      username,
      roomId
    }
    dispatch(loginAsStudent(data));
  }

  render() {
    const { loading, username } = this.state;
    const { classes, history } = this.props;

    return (
      <div>
      <Menu history={history} username={username} />
        {loading && <LinearProgress thickness={2} color='primary' />}
        <div className={classes.main}>
        <img src={logo} alt='Begame' className={classes.logo} width="250px"/>
          <Paper className={classes.container}>
          <Typography variant='h6' className={classes.welcome}>Välkommen!</Typography>
         <Typography variant="subtitle1" className={classes.login}>Logga in med användarnamn och #ID</Typography>
            <div className={classes.margin}>
              <TextField
                type="text"
                onChange={this.handleChange('username')}
                id='input-with-icon-grid'
                label='Användarnamn'
                margin='dense'
                variant='outlined'
                fullWidth
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: {
                    fontSize: 13,
                    height: 45,
                  },
                }}
              />
            </div>
            <div className={classes.margin}>
              <TextField
                type="text"
                onChange={this.handleChange('roomId')}
                id='input-with-icon-grid2'
                label='#ID'
                margin='dense'
                variant='outlined'
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: {
                    fontSize: 13,
                    height: 45,
                  },
                }}
              />
            </div>
            <div className={classes.margin}>
              <Button
                style={{ marginBottom: 20, marginTop: 10 }}
                variant='contained'
                color='primary'
                fullWidth
                onClick={this.validation}
                disabled={loading}
                size='large'
              >
              Logga in
              </Button>
            </div>
          </Paper>
        </div>
        <Typography className={classes.copyright}>© Copyright 2018 | All Rights Reserved | Begame</Typography>
        <ErrorHandling />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  snackbarOpen: store.errorHandling.snackbarOpen,
  error: store.errorHandling.error,
  message: store.errorHandling.message,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Home);
