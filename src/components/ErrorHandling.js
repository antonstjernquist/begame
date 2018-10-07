import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core';
import { closeFeedback } from '../actions/errorHandlingActions';

const mapStateToProps = store => ({
  snackbarOpen: store.errorHandling.snackbarOpen,
  error: store.errorHandling.error,
  message: store.errorHandling.message,
});

const styles = {
  error: {
    background: red[500],
  },
  success: {
    background: green[500],
  },
};

class ErrorHandling extends React.Component {
  handleClose = () => {
    this.props.dispatch(closeFeedback());
  }

  renderSnackbar = () => (
    <Snackbar
      open={this.props.snackbarOpen}
      message={this.props.message}
      autoHideDuration={3000}
      onClose={this.handleClose}
      ContentProps={{
        classes: {
            root: this.props.error ? this.props.classes.error : this.props.classes.success,
        },
    }}
    />
  )

  render() {
    return (
      <div>
        {this.renderSnackbar()}
      </div>
    );
  }
}

ErrorHandling.propTypes = {
  snackbarOpen: PropTypes.any.isRequired,
  error: PropTypes.any.isRequired,
  message: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  classes: PropTypes.any.isRequired,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(ErrorHandling);
