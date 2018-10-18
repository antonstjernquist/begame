import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

/* Import CSS */
import './css/adminpanel.css';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hashids from 'hashids';

/* Actions */
import { getQuestionCollections } from '../actions/questionCollectionActions.js';
import { setUser } from '../actions/authActions.js';
import { createRoomAction } from '../actions/roomActions.js';
// import { showSnackbarMessage } from '../actions/errorHandlingActions';
/* Komponenter */
import Menu from './Menu.js';

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
  button: {
    marginBottom: 20
  }
});


class Adminpanel extends Component {
  constructor(props){
    super(props)
    this.state = {
      update: false
    }
    const { collectionFetched, dispatch, history } = props


    if ( !collectionFetched ){
      // hämta data.
      dispatch(getQuestionCollections());
    }

    let auth = JSON.parse(localStorage.getItem('auth'));
    if(auth && auth.token && auth.token.length > 10){
          dispatch(setUser(JSON.parse(localStorage.getItem('auth'))));
    } else {
        history.push('/admin');
    }
  }

  createRoom = quiz => {
    const { dispatch, history } = this.props;
    const roomId = createRoomId(this.props.auth.name, quiz._id);
    if (quiz.numberOfQuestions === 0) {
      // dispatch(showSnackbarMessage('Samlingen saknar frågor'));
      return null;
    }
    const room = {
      roomId,
      quiz,
      currentQuestion: 0,
      createdBy: this.props.auth.name,
      active: true,
      openForAnswer: false,
      name: roomId,
      created: Date.now()
    }

    dispatch(createRoomAction({history, room}));

  }

  createQuiz = () => {
      const { history } = this.props;
      history.push('/admin/collection/');
  }

  editCollection = (collectionId) => {
    const { history } = this.props;
    history.push(`/admin/collection/${collectionId}`);
  }

  renderCards = () =>{
    const { questionCollections, classes } = this.props;
    if ( Object.keys(questionCollections).length === 0 )
      return null;

    return Object.keys(questionCollections).map(xKey => {
      const x = questionCollections[xKey];
      x.numberOfQuestions = x.questions ? Object.keys(x.questions).length : 0;
      return (
        <Card key={x._id} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={x.imgUrl}
              title={x.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {x.title}
              </Typography>
              <Typography component="p">
                {x.description}
              </Typography>
              <Typography variant="caption" style={{marginTop: '5px'}}>
                Frågor {x.numberOfQuestions}st
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={ e => {
              this.createRoom(x);
              }}>
              Starta
            </Button>
            <Button size="small" color="primary" onClick={ e => this.editCollection(xKey) }>
              Redigera
            </Button>
          </CardActions>
        </Card>)
    });
  }

  render() {

    const { classes, history } = this.props;

    const cardList = this.renderCards();

    return (
      <Fragment>
        <Menu history={ history } adminPanel={true} auth={this.props.auth}/>
        <div className="adminpanel">
        <Button variant="contained" color="primary" className={classes.button} onClick={this.createQuiz}>
        Skapa quiz
        </Button>
          <div>
            <div className="listDiv">
              {cardList}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value,
    auth: state.auth,
    questionCollections: state.questionCollections.data,
    collectionFetched: state.questionCollections.fetched,
});


function createRoomId(){

  let code = Math.ceil(Date.now() - 1539264714045);
  let hashids = new Hashids('begame'),
  id = hashids.encode(code);

  return id;

}

export default connect(mapStateToProps)(withStyles(styles)(Adminpanel));
