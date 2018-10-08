import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { showSnackbarMessage } from '../actions/errorHandlingActions';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Menu from './Menu';
import ErrorHandling from './ErrorHandling.js';
import RadioButtonsGroup from './RadioButtonsGroup';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 450,
    margin: '50px auto'
  },
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      checkedA: false,
      checkedB: false,
      checkedF: false,
      checkedG: false,
    }
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(showSnackbarMessage(`Välkommen till rum #${this.state.id}`));
  }

  render() {
    const { history, classes } = this.props;
    return (
      <Fragment>
        <Menu roomId={this.state.id} history={history}/>
        <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">
          Vad returnerar strängen '12' * 9?
        </Typography>
        <RadioButtonsGroup />
      </Paper>
      <ErrorHandling />
      </Fragment>
    )
  }
}


let mapStateToProps = store => ({
    value: store.value,
    snackbarOpen: store.errorHandling.snackbarOpen,
    error: store.errorHandling.error,
    message: store.errorHandling.message,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Room);
