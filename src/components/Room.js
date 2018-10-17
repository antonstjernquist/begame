import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

//Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

//Imported components
import Menu from './Menu';
import { showSnackbarMessage, showSnackbarError } from '../actions/errorHandlingActions';
import ErrorHandling from './ErrorHandling.js';
import { getRoomFromDb } from '../actions/roomActions'
import { updateUserInDb, updateUserStats} from '../actions/userActions'
import { setUser } from '../actions/authActions'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 450,
    margin: '50px auto'
  },
  card: {
    maxWidth: 380,
    marginBottom: 30
  },
  cardAction: {
    width: 350,
    maxWidth: 380,
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: '#573697',
    margin: '0px auto',
    marginBottom: 10,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      rightAnswer: null,
      questionClosed: false,
    }
    const userData = JSON.parse(localStorage.getItem('student'));
    if (userData) {
      props.dispatch(updateUserStats(userData))
      props.dispatch(setUser(userData))
    }

    // om ingen userData finns så skall vi skicka ut nissen.

    const roomId = (props.match && props.match.params && props.match.params.id) || false;
    props.dispatch(getRoomFromDb(roomId))

  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(showSnackbarMessage(`Välkommen till rum #${this.state.id}`));
  }


  selectedAnswer = (selected, correctAnswer, currentQuestion) => {
    const roomId = this.props.match.params.id;
    const { dispatch } = this.props;

    const isRight = selected === correctAnswer;

    let student = JSON.parse(localStorage.getItem('student'));

    if(student.lastQuestion === currentQuestion){
      dispatch(showSnackbarMessage('Du har redan svarat på frågan 🤔'))
      return null;
    }

    student.lastQuestion = currentQuestion;
    localStorage.setItem('student', JSON.stringify(student));

    if (isRight) {
      dispatch(showSnackbarMessage('Rätt svar! 😎'))
      dispatch(getRoomFromDb(roomId)).then( ()=>{
        const { openForAnswer } = this.props.room;

        // check if current question is open for answers
        if ( openForAnswer ) {
          let { points,uid } = this.props.user;
          points += 10;
          dispatch(updateUserInDb({uid,points})).then( ()=>{
            this.setState({rightAnswer: true, questionClosed: true}) // dont remove this.. need for update points also.. its to deep for react to handle
          })
        } else {
            dispatch(showSnackbarMessage('Rätt svar! 😎'))
        }
      })
    } else {
      this.setState({rightAnswer: false,  questionClosed: true }) // dont remove this.. need for update points also.. its to deep for react to handle
      dispatch(showSnackbarMessage('Fel! 😫'))
    }


  }


  createAnswerButtons = (answers, correctAnswer, currentQuestion) => {
    const { classes } = this.props;
    const listAlpah = ['a', 'b', 'c','d','e','f','g','h'];
    return Object.values(answers).map( (item, index ) => (
      <Fragment key={index}>
        <Card className={classes.card} onClick={() => this.selectedAnswer(listAlpah[index], correctAnswer, currentQuestion)}>
          <CardActionArea className={classes.cardAction}>
            <CardContent>
              <Avatar className={classes.orangeAvatar}>{listAlpah[index].toUpperCase()}</Avatar>
              <Typography component="p">
                { item }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Fragment>
    ))
  }


  renderQuestion = () => {

    const { room } = this.props;
    const { quiz } = room || false;
    const { questions } = quiz || false;

    if ( !questions )
      return (<div>Ej startad ännu</div>)

    const currentQuestion  = room && room.currentQuestion;

    if (currentQuestion === 0)
      return (<div><Typography component="h2" variant="h1" gutterBottom>Quiz ej startat</Typography></div>)

    if (currentQuestion === -1)
      return (<div><Typography component="h2" variant="h1" gutterBottom>SLUT</Typography></div>)

    const selectedQuestion = Object.values(questions).filter(question => question.order === currentQuestion)[0];
    const answer = this.createAnswerButtons(selectedQuestion.answers, selectedQuestion.correctAnswer, currentQuestion)

    return (
      <Fragment>
        <h1 style={{fontSize: '3.5em', color: '#573697', fontWeight: 'bold', marginBottom: 100}}>{selectedQuestion.question}</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap'}}>
          {answer}
        </div>
      </Fragment>)
  }

  updateQuiz = () =>{
    const { dispatch } = this.props;
    const { currentQuestion } = this.props.room;
      dispatch(getRoomFromDb(this.state.id)).then( ()=>{
      if ( currentQuestion !== this.props.room.currentQuestion ){
        this.setState({questionClosed:false})
      } else {
        dispatch(showSnackbarMessage('Frågan är pågående!'))
      }
    })
  };



  render() {
    const { history, classes, user } = this.props;
    const score = user && user.points ? user.points : 0;
    const viewQuest = this.renderQuestion();

    return (
      <Fragment>
        <Menu roomId={this.state.id} history={history}/>
        <div style={{margin: 10}}>
        <Chip
          icon={<FaceIcon />}
          label={`${user.name}: ${score} poäng`}
          clickable
          className={classes.chip}
          color="primary"
        />
        </div>
        <div style={{width: 800, height: 300, margin: '100px auto', textAlign: 'center' }}>
          {viewQuest}
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.updateQuiz}
            color="primary"
          >
            Uppdatera Quiz
          </Button>
        </div>
      <ErrorHandling />
      </Fragment>
    )
  }
}


let mapStateToProps = store => ({
    snackbarOpen: store.errorHandling.snackbarOpen,
    error: store.errorHandling.error,
    message: store.errorHandling.message,
    room: store.activeRoom.data,
    fetched: store.activeRoom.fetched,
    user: store.user.data,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Room);
