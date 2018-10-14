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

//Imported components
import Menu from './Menu';
import { showSnackbarMessage } from '../actions/errorHandlingActions';
import ErrorHandling from './ErrorHandling.js';
import { getRoomFromDb } from '../actions/roomActions'

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
    backgroundColor: '#a7d129',
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
      id: props.match.params.id
    }

    const roomId = (props.match && props.match.params && props.match.params.id) || false;
    if (roomId)
    console.log('roomId är: ', roomId);
    props.dispatch(getRoomFromDb(roomId))

  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(showSnackbarMessage(`Välkommen till rum #${this.state.id}`));
  }


  selectedAnswer = (selected, correctAnswer) => {
    console.log('vald svar',selected);
    console.log('korrekt answer', correctAnswer);
    const isRight = selected === correctAnswer;
    console.log(isRight);
    // här ska vi slänga in en koll mot prop och kontroller om användaren svarade rätt eller ej
    // ska inte visas så tyldigt att grannen kan kolla :)
    // oom användaren svarat rätt så uppdaterar vi användaren med ny poäng..
    //
  }


  createAnswerButtons = (answers, correctAnswer) => {
    const { classes } = this.props;
    const listAlpah = ['a', 'b', 'c', 'd'];

    console.log("ROOMPROPS", this.props);
    return Object.values(answers).map( (item, index ) => (
      <Fragment key={index}>
        <Card className={classes.card} onClick={() => this.selectedAnswer(listAlpah[index], correctAnswer)}>
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
      return (<div>Ej startad ännu</div>)

    if (currentQuestion === -1)
      return (<div>SLUT</div>)

    const selectedQuestion = Object.values(questions).filter(question => question.order === currentQuestion)[0];
    const answer = this.createAnswerButtons(selectedQuestion.answers, selectedQuestion.correctAnswer)

    return (
      <Fragment>
        <h1 style={{fontSize: '3.5em', color: '#a7d129', fontWeight: 'bold', marginBottom: 100}}>{selectedQuestion.question}</h1>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap'}}>
          {answer}
        </div>
      </Fragment>)
  }

  updateQuiz = () =>{
    this.props.dispatch(getRoomFromDb(this.state.id));
  }


  render() {
    const { history, classes } = this.props;

    const viewQuest = this.renderQuestion();

    return (
      <Fragment>
        <Menu roomId={this.state.id} history={history}/>

        <div style={{width: 800, height: 300, margin: '100px auto', textAlign: 'center' }}>
          {viewQuest}
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.updateQuiz}
            color="primary"
          >
            Uppdatera quiz gå till nästa fråga
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
});

export default compose(withStyles(styles), connect(mapStateToProps))(Room);
