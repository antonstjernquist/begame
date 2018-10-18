import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import CSS */
import './css/project.css';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ErrorHandling from './ErrorHandling';
import { showSnackbarError } from '../actions/errorHandlingActions.js';

/* Denna komponent visar vilka olika quiz man kan starta samt "Skapa ny quiz" */
const styles = theme => ({
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 245,
    marginRight: 15,
    marginBottom: 15,
    minWidth: 245
  },
  media: {
    height: 140,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 250,
    margin: 'auto'
  },
  stepper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 725,
    margin: 'auto'
  },
});


class Project extends Component {

  state = {
    open: false,
    inputname: '',
    pw1: '',
    pw2: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRegister = () => {
    if(!this.state.pw1.length || !this.state.pw2.length || !this.state.inputname.length){
      this.props.dispatch(showSnackbarError('Tomma fält, vänligen försök igen'));
    } else if(this.state.pw1.length < 6){
      this.props.dispatch(showSnackbarError('Lösenordet är för kort'));
    } else if(this.state.pw1 !== this.state.pw2){
      this.props.dispatch(showSnackbarError('Lösenorden matchar inte'));
    } else {
      this.setState({ open: false });

      fetch('https://stark-ocean-61611.herokuapp.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: this.state.pw1,
          name: this.state.inputname,
        })
      })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(err => console.log(err));

    }
  };

  handleChange = (event, type) => {
    this.setState({ [type]: event.target.value });
  }

  render() {
    return (
            <div>
              <ErrorHandling />
              <Button onClick={this.handleClickOpen} size='small' style={{fontSize: 12, color: '#999'}}>Skapa konto</Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Skapa konto</DialogTitle>
                <DialogContent style={{width: 400, paddingBottom: 10}}>
                  <DialogContentText style={{fontSize: 13, marginBottom: 20}}>
                    För att kunna skapa ett quiz behöver du skapa ett konto.
                  </DialogContentText>
                  <TextField
                    onChange={e => { this.handleChange(e, 'inputname') } }
                    variant='outlined'
                    margin="dense"
                    id="name"
                    label="Användarnamn"
                    type="email"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    onChange={e => { this.handleChange(e, 'pw1') } }
                    variant='outlined'
                    margin="dense"
                    id="pw1"
                    label="Lösenord"
                    type="password"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    onChange={e => { this.handleChange(e, 'pw2') } }
                    variant='outlined'
                    margin="dense"
                    id="pw2"
                    label="Upprepa lösenord"
                    type="password"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="secondary">
                    Avbryt
                  </Button>
                  <Button onClick={this.handleRegister} color="secondary">
                    Registrera
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value,
    snackbarOpen: state.errorHandling.snackbarOpen,
    error: state.errorHandling.error,
    message: state.errorHandling.message
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Project));
