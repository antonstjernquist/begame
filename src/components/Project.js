import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Import CSS */
import './css/project.css';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import RadioButtonsGroup from './RadioButtonsGroup';

/* Components */
import Menu from './Menu';
import ActiveUsers from './ActiveUsers';

const backgroundImage = require('../resources/background_quiz.jpg');

/* Denna komponent visar vilka olika quiz man kan starta samt "Skapa ny quiz" */
const styles = theme => ({
  main: {
    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, .4), rgba(255, 255, 255, .2)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    minHeight: 'calc(100vh)',
  },
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
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 450,
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


    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id,
        activeStep: 0,
      }
    }


    /* Handle steps */
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

    const { classes, theme, history } = this.props;
    return (
          <div className={classes.main}>
              <Menu roomId={this.state.id} history={history}/>
              <div className="projectPanel">
                  <div className="questionAndActiveUsersWrapper">
                      <div className="questionComponent">
                          <Paper className={classes.root} elevation={1}>
                          <Typography variant="headline" component="h3">
                            Vad returnerar strängen '12' * 9?
                          </Typography>
                          <RadioButtonsGroup />
                        </Paper>
                      </div>
                      <ActiveUsers />
                  </div>
                  <MobileStepper
                      variant="dots"
                      steps={10}
                      position="static"
                      activeStep={this.state.activeStep}
                      className={classes.stepper}
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
          </div>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Project));
