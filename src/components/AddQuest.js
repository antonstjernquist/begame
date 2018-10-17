import React,{ Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import { showSnackbarError } from '../actions/errorHandlingActions';

const styles = theme => ({
  menu: {
    width: 200,
  },
  button: {
    margin: 10,
  }
});

const listAlpah = ['a', 'b', 'c','d'];


class AddQuest extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: '',
      answers: {
        a: '',
        b: '',
      }
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

    return Object.keys(answers).map( key => (
        <TextField
          key={key}
          id="outlined-name"
          label={key}
          value={this.state.answers[key]}
          onChange={ (event) => this.handleChange(event, 'answers', key)}
          margin="normal"
          variant="outlined"
          fullWidth
        />
      )
    )
  }


  saveQuestion = () => {
      let passed = true;
      if(this.state.question.length > 4 && typeof this.state.question === 'string'){

          /* Check answer lengths */
          for (let key in this.state.answers){
              if(this.state.answers[key].length < 2){
                  passed = false;
              }
          }
      } else {
          passed = false;
      }

      if(passed){
          this.props.addQuestion({ ...this.state, answers: { ...this.state.answers }});
          this.setState({
            question: '',
            answers: {
              a: '',
              b: ''
            }
          });
      } else {
          console.log('Nein, mb add snackbar here?');
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


export default withStyles(styles)(AddQuest);
