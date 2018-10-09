import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  }
});


class HandleQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
        questions: {
          0: {
            correctAnswer: 'a',
            question: 'Hur många båtar finns det i sjön?',
            answer: {
              a: 123,
              b: 12,
              c: 32,
              d: 23,
            }
          },
        1:{
          correctAnswer: 'b',
          question: 'Hur månag ben finns det i en abbore?',
          answer: {
            a: 2,
            b: 0,
            c: 1,
            d: 4,
          }
        },
      }
    }
  }

  handleChange = (event, questKey, changeKey) => {
    if(event.target.value !== undefined){
      const {questions} = { ...this.state };

      if(changeKey === 'correctAnswer'){
        questions[questKey][changeKey] = event.target.value;
      } else {
        questions[questKey].answer[changeKey] = event.target.value;
        this.setState({ questions: questions});
      }
    }

  }

  renderTableView = () => {
    const { questions } = this.state;
    console.log('table View körs');
    const { classes } = this.props;

    return Object.keys(questions).map( (itemKey ,index) => {
        const item = questions[itemKey];
        console.log(item);
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary >
              <Typography className={classes.heading}>{item.question}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              {/*  Show all options */}
              <div className={classes.contentWrapper}>
                {Object.keys(questions[itemKey].answer).map( optionKey =>(
                    <TextField
                      key={optionKey}
                      id="standard-full-width"
                      label={optionKey}
                      value={questions[itemKey].answer[optionKey]}
                      style={{ margin: 8 }}
                      placeholder="Placeholder"
                      fullWidth
                      margin="normal"
                      onChange={(event)=> this.handleChange(event,itemKey, optionKey)}
                      InputLabelProps={{
                      shrink: true,
                      }}
                    />
                  ))}

                  {/* Shows correct answer.. not completed yet */}
                  <TextField
                    id="standard-full-width"
                    label='correctAnswer'
                    value={questions[itemKey]['correctAnswer']}
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                    onChange={(event)=> this.handleChange(event,itemKey, 'correctAnswer')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                  />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
      )
    })
  };

  render(){
    const table = this.renderTableView();

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        { table }
      </div>
    );
  }
}

HandleQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HandleQuestions);
