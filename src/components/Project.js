import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { showSnackbarMessage } from '../actions/errorHandlingActions';
import { getRoomFromDb, updateRoomInDb } from '../actions/roomActions'

//Material UI
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

//Imported components
import ActiveUsers from './ActiveUsers';
import TimerBar from './TimerBar';
import Menu from './Menu';
import ErrorHandling from './ErrorHandling.js';

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
  cardRight: {
    maxWidth: 380,
    marginBottom: 30,
    backgroundColor: '#a1c45a',
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
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      showTimer: true,
      rightAnswer: null,
    }

    const roomId = (props.match && props.match.params && props.match.params.id) || false;
    if (roomId)
    props.dispatch(getRoomFromDb(roomId))

  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(showSnackbarMessage(`Välkommen till rum ${this.state.id}`));
  }


  selectedAnswer = (selected, correctAnswer) => {
    const isRight = selected === correctAnswer;
    if ( isRight){
      console.log('Rätt svar!');
    }else {
      console.log('Fel svar!');
    }
  }


  createAnswerButtons = (answers, correctAnswer) => {
    const { classes } = this.props;
    const { rightAnswer } = this.state;
    const listAlpah = ['a', 'b', 'c','d'];

    return Object.values(answers).map( (item, index ) => (
      <Fragment key={index}>
        <Card className={rightAnswer === listAlpah[index] ? classes.cardRight : classes.card } onClick={() => this.selectedAnswer(listAlpah[index], correctAnswer)} raised={this.state.selectedA}>
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
    const { room, classes } = this.props;
    const { quiz } = room || false;
    const { questions } = quiz || false;
    const title = room && room.quiz && room.quiz.title;
    const description = room && room.quiz && room.quiz.description;

    if ( !questions )
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
          {title}
          </Typography>
          <Typography component="p">
          {description}
          </Typography>
        </Paper>
      )

    let currentQuestion  = room && room.currentQuestion;

    if (currentQuestion === 0)
      return (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
          {title}
          </Typography>
          <Typography component="p">
          {description}
          </Typography>
        </Paper>
      )

    if (currentQuestion === -1) {
      if( this.state.showTimer)
        // this.setState({showTimer: false})
      return (<div><Typography variant="h3" gutterBottom>SLUT</Typography></div>)
    } else if (!this.state.showTimer){
      // this.setState({showTimer:true})
    }

    const selectedQuestion = Object.values(questions).filter(question => question.order === currentQuestion)[0];
    const answer = this.createAnswerButtons(selectedQuestion.answers, selectedQuestion.correctAnswer)

    return (
      <Fragment>
        <h1 style={{fontSize: '3.5em', color: '#573697', fontWeight: 'bold', marginBottom: 100}}>{selectedQuestion.question}</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap'}}>
          {answer}
        </div>
      </Fragment>)
  }

  // switches to next question in timer.
  nextQuestion = () =>{
    const roomIdInDb = this.props.room['_id'];
    let { currentQuestion, quiz } = this.props.room
    currentQuestion += 1;

    // if we got to the end of questions we set it to -1 to display end
    if (Object.keys(quiz.questions).length < currentQuestion ){
      currentQuestion = -1;
    }

    const data = {
      roomIdInDb,
      update: {
        currentQuestion
      }
    }
    this.props.dispatch(updateRoomInDb(data));
  }

  // open question for answer
  questionOpenForAnswer = (isOpen) =>{
    const { dispatch } = this.props;
    const roomIdInDb = this.props.room['_id'];
      dispatch(updateRoomInDb({update: {openForAnswer: isOpen}, roomIdInDb}))
  }

  showRightAnswer = (showIt) => {
    if ( showIt ){
      const { room } = this.props;
      const { currentQuestion } = room;
      const { questions } = room.quiz
      const filtered = Object.values(questions).filter(question => question.order === currentQuestion)[0]
      const { correctAnswer } = filtered

      this.setState({rightAnswer: correctAnswer})
    } else {
      this.setState({rightAnswer: null})
    }
  }
  showTimer = () => {
    const { room } = this.props;

    let currentQuestion  = room && room.currentQuestion ? room.currentQuestion : 0;

    if (currentQuestion === 0) {
      return true
    } else if( currentQuestion === -1){
      return false
    } else {
      return true;
    }
  }

  render() {
    const { history } = this.props;


    const viewQuest = this.renderQuestion();
    const showTime = this.showTimer();
    return (
      <Fragment>
        <Menu roomId={this.state.id} history={history}/>
        <ActiveUsers roomId={this.state.id}/>
        <div style={{width: 800, height: 300, margin: '100px auto', textAlign: 'center' }}>
          {viewQuest}
          {showTime && <TimerBar nextQuest={this.nextQuestion}  questionOpenForAnswer={this.questionOpenForAnswer} showRightAnswer={this.showRightAnswer}/>}
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
});

export default compose(withStyles(styles), connect(mapStateToProps))(Room);
