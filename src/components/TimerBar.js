import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 20
  },
  textField: {
   marginTop: 3,
   maxHeight: 50,
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
   width: 100,
 },
 button: {
   marginTop: 2,
   maxHeight: 50,
   width: 100,
   marginLeft: theme.spacing.unit,
   marginRight: theme.spacing.unit,
 },
 wrapperButtons:{
   marginTop: 10,
   display: 'flex',
   justifyContent: 'auto',
   alignItem: 'center',
   flexDirection: 'row',
 },
 wrapperChip: {
   display: 'flex',
   alignItems: 'center',
   marginLeft: '100',
 }
});

class TimerBar extends Component {
  state = {
    completed: 0,
    time: 10,
    currentTime: 0,
    inProgress: false,
    lockStart: false,
    showEndTime: false,
    open: true,
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    let { completed, time, currentTime } = this.state;
    completed += (100/time)
    currentTime += 1;
    if (completed > 100) {
      console.log('finito');
      this.setState({ completed: 0, inProgress: false, currentTime:0, lockStart: false, showEndTime:true, open: true });
      clearInterval(this.timer);
    } else {
      this.setState({ completed,currentTime, inProgress: true });
    }
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  start = () => {
    if (!this.state.lockStart){
      this.setState({lockStart: true, showEndTime:false }, ()=>{
        this.timer = setInterval(this.progress, 1000);
      })
    }
  }

  stop = () =>{
    this.setState({lockStart: false})
    clearInterval(this.timer);
  }

  clearTimer = () => {
    clearInterval(this.timer);
    this.setState({ completed: 0, inProgress: false, currentTime:0, lockStart:false, showEndTime: false });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { inProgress, lockStart, showEndTime, open } = this.state;
    return (
      <div>
        <div className={classes.root}>
          <LinearProgress variant="determinate" value={this.state.completed} />
        </div>
        <div className={classes.wrapperButtons}>
          {!lockStart && <Button variant="contained" color="primary" className={classes.button} onClick={this.start}>
            { inProgress ? 'Fortsätt': 'Start'}
          </Button>}
          { lockStart && <Button variant="contained" color="primary" className={classes.button} onClick={this.stop}>
            Stopp
          </Button>}
          <Button color="primary" variant="outlined" className={classes.button} onClick={this.clearTimer}>
            Återställ
          </Button>

        {inProgress &&
          <TextField
            id="outlined-number"
            label="Tid i sekunder"
            value={ this.state.time - this.state.currentTime }
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
        }

        {!inProgress &&
          <TextField
            id="outlined-number"
            label="Tid i sekunder"
            value={this.state.time}
            onChange={this.handleChange('time')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
        }
        </div>
        { open && showEndTime &&
        <Dialog
          style={{ width: 600, marginLeft: 750, marginTop: -100 }}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">RÄTT SVAR ÄR B</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              STÄNG
            </Button>
          </DialogActions>
        </Dialog>
      }
      </div>
    );
  }
}

TimerBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimerBar);
