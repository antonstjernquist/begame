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
import { loginAsAdmin } from '../actions/authActions.js'

import Menu from './Menu.js';
import ErrorHandling from './ErrorHandling.js';
import Register from './Register'

const backgroundImage = require('../resources/background_gm.jpg');
const logo = require('../resources/logo_blue.png');

const styles = () => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 50px)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, .8), rgba(255, 255, 255, .2)), url(${backgroundImage})`,
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
    textAlign: 'center',
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
  },
  inputFocused: {
    width: '40%',
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    backgroundColor: "#00FF00",
  },
});

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      password: '',
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  validation = () => {
    const { password, name } = this.state;
    const { dispatch } = this.props;
    if (!name || !password) {
      dispatch(showSnackbarError('Användarnamn eller lösenordet är felaktigt.'));
    } else {
      this.login({name, password});
    }
  }

  login = (user) => {
    const { dispatch, history } = this.props;
    dispatch({type:'AUTH_RECEIVED', payload: user});
    const data = {
      history,
      user,
    }
    dispatch(loginAsAdmin( data ));
    // history.push(`/admin/home`)
  }


  pressEnterToLogin = (e) => {
    let key = e.wich;
    if (key === 13) {
      this.validation();
    }
  }

  render() {
    const { loading, username } = this.state;
    const { classes, history } = this.props;

    return (
      <div>
      <Menu history={history} username={username} isAdmin={true} />
        {loading && <LinearProgress thickness={2} color='secondary' />}
        <div className={classes.main}>
        <img src={logo} alt='Begame' className={classes.logo} width="250px"/>
          <Paper className={classes.container}>
          <Typography variant='h6' className={classes.welcome}>Välkommen!</Typography>
         <Typography variant='subtitle1' className={classes.login}>Logga in med användarnamn och lösenord</Typography>
            <div className={classes.margin}>
              <TextField
                type="text"
                onChange={this.handleChange('name')}
                id='input-with-icon-grid2'
                label='Användarnamn'
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
              <TextField
                type="password"
                onChange={this.handleChange('password')}
                id='input-with-icon-grid2'
                label='Lösenord'
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
                color='secondary'
                fullWidth
                onClick={this.validation}
                disabled={loading}
                size='large'
              >
              Logga in
              </Button>
            </div>
            <div className={classes.margin}>
              <Register />
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
  justLoggedIn: store.auth.justLoggedIn,
});

export default compose(withStyles(styles), connect(mapStateToProps))(AdminLogin);
