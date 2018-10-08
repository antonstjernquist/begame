import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import CSS */
import './css/adminpanel.css';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

/* Denna komponent visar vilka olika quiz man kan starta samt "Skapa ny quiz" */
const styles = theme => ({
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 345,
    marginRight: 15,
    marginBottom: 15,
    minWidth: 295
  },
  media: {
    height: 140,
  },
});


class Project extends Component {


    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id,
        activeStep: 0,
      }
    }

    handleNext = () => {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    };

    handleBack = () => {
      this.setState(state => ({
        activeStep: state.activeStep - 1,
      }));
    };

  render() {

    const { classes, theme } = this.props;

    return (
      <div className="adminpanel">
          <span> Hello project </span>
          <span> ID specified: {this.state.id}</span>

          <MobileStepper
              variant="dots"
              steps={17}
              position="static"
              activeStep={this.state.activeStep}
              className={classes.root}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === 16}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
        />
      </div>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Project));
