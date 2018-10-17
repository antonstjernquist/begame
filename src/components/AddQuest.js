import React,{ Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { showSnackbarError, showSnackbarMessage } from '../actions/errorHandlingActions';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:'95%',
  },
  textFieldWithButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:'90%',
  },
  textFieldDiv: {
    width:'95%',
  },
  textFieldButton: {
    margin: '25px 10px'
  },
  dense: {
    marginTop: 16,
  },
});

const listAlpah = ['a', 'b', 'c', 'd'];

class AddQuest extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '',
      answers: {
        a: '',
        b: '',
    },
      correctAnswer: null
    };
  };

  handleChange = (event, type, inputKey) => {
    const value = event.target.value
    if (type === 'answers'){
      const answers = this.state.answers;
      answers[inputKey] = value;
      this.setState({ answers: answers });

    } else if (type === 'question') {
      this.setState({ question: value });
    }
  }

  renderAnswer = () => {
    const { answers } = this.state;
    const { classes } = this.props;

    return Object.keys(answers).map( key => (
        <div key={key} className={classes.textFieldDiv}>
            <TextField
              id="outlined-name"
              label={key}
              className={classes.textFieldWithButton}
              value={this.state.answers[key]}
              onChange={ (event) => this.handleChange(event, 'answers', key)}
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" color={this.state.correctAnswer === key ? 'primary' : 'secondary'} className={classes.textFieldButton} onClick={ () => this.setCorrectAnswer(key) }>
              Rätt svar
            </Button>
        </div>
      )
    )
  }


  setCorrectAnswer = data => {
      this.setState({ correctAnswer: data });
      console.log('Typeof data: ', typeof data);
  }

  saveQuestion = () => {

      const { dispatch } = this.props;
      let passed = true;

      if(this.state.question.length < 4 && typeof this.state.question !== 'string'){
          passed = false;
      }

      /* Check answer lengths */
      for (let key in this.state.answers){
          if(this.state.answers[key].length === 0){
              passed = false;
          }
      }

      /* Check for correctAnswer */
      if(!this.state.correctAnswer){
            passed = false;
      }

      if(passed){
          dispatch(showSnackbarMessage('Du la till en fråga'));
          this.props.addQuestion({ ...this.state, answers: { ...this.state.answers }});
          this.setState({
            question: '',
            answers: {
              a: '',
              b: ''
            },
            correctAnswer: null
          });
      } else {
          dispatch(showSnackbarError('Frågan uppfyller inte kraven.'));
      }
  }

  // add and remove options based on listAlpah
  changeAnswersOption = (add) => {
    const { answers } = { ...this.state };
    const indexToAdd = Object.keys(answers).length;

    // check if able to add more option based on listAlpah
    if (add && indexToAdd < Object.keys(listAlpah).length){
        answers[listAlpah[indexToAdd]] = '';
        this.setState({answers: answers })

        // removes option if we got more than 2 to choose between
      } else if (!add && indexToAdd > 2 ) {
        delete answers[listAlpah[indexToAdd - 1]]
        this.setState({answers: answers })
      }
  }

  render(){
    const { classes } = this.props;
    const answersList = this.renderAnswer();
    return(
      <Paper style={{ width: 600, padding: 20, margin: '0px auto' }}>
      <Typography variant="h5" gutterBottom>Lägg till fråga</Typography>
        <TextField
          id="outlined-name"
          label="Fråga"
          value={this.state.question}
          onChange={ (event) => this.handleChange(event, 'question')}
          margin="normal"
          variant="outlined"
          multiline
          fullWidth
        />
        { answersList }
        <div>
          <Button variant="outlined" color="secondary" size="small" className={classes.button} onClick={ ()=>this.changeAnswersOption(true)}>
            Lägg till svarsalternativ
          </Button>
          <Button variant="outlined" color="secondary" size="small" className={classes.button} onClick={ ()=>this.changeAnswersOption(false)}>
            Ta bort svarsalternativ
          </Button>
          <Button variant="outlined" color="primary" size="small" className={classes.button} onClick= { this.saveQuestion }>
            Spara frågan
          </Button>
        </div>
      </Paper>
    )
  }
};

const mapStateToProps = store => ({
  snackbarOpen: store.errorHandling.snackbarOpen,
  error: store.errorHandling.error,
  message: store.errorHandling.message,
});

export default connect(mapStateToProps)(withStyles(styles)(AddQuest));
