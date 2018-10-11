import React,{ Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
  dense: {
    marginTop: 16,
  },
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

  handleChange = (event,type, inputKey) => {
    const data = event.target.value

    if (type === 'answers'){
      const { answers } = { ...this.state };
      answers[inputKey] = data;
      this.setState({answers: answers})

    } else if (type === 'question') {
      this.setState({question: data })
    }
  }

  renderAnswer = () => {
    const { answers } = this.state;
    const { classes } = this.props;

    return Object.keys(answers).map( answerKey => (
        <TextField
          key={answerKey}
          id="outlined-name"
          label={answerKey}
          className={classes.textField}
          value={this.state.answers[answerKey] }
          onChange={ (event) => this.handleChange(event,'answers',answerKey)}
          margin="normal"
          variant="outlined"
        />
      )
    )
  }

  // add and remove options based on listAlpah
  changeAnswersOption = (add) => {
    const { answers } = { ...this.state};
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
      <div>
        <TextField
          id="outlined-name"
          label="Fråga"
          className={classes.textField}
          value={this.state.question}
          onChange={ (event) => this.handleChange(event, 'question')}
          margin="normal"
          variant="outlined"
          multiline
        />
        <br/>
        { answersList }
        <br/>
        <div>
          <Button variant="contained" color="secondary" className={classes.button} onClick={ ()=>this.changeAnswersOption(true)}>
            Lägg till svarsalternativ
          </Button>
          <Button variant="contained" color="secondary" className={classes.button} onClick={ ()=>this.changeAnswersOption(false)}>
            Ta bort svarsalternativ
          </Button>
          <Button variant="contained" color="primary" className={classes.button} onClick= { ()=> console.log('AWESOME!!! SAVE IT :) ') }>
            Spara frågan
          </Button>
        </div>
      </div>
    )
  }
};


export default withStyles(styles)(AddQuest);
