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
import { getQuestionCollections } from '../actions/questionCollectionActions'
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
});


class Adminpanel extends Component {
  constructor(props){
    super(props)
    const { collectionFetched, dispatch } = props
    console.log(collectionFetched);
    if ( !collectionFetched ){
      // hämta data.
      console.log("hämta daa");
      dispatch(getQuestionCollections())
    }
  }


  createRoom = quiz => {

    const room_id = createRoomId(this.props.user.name, quiz.id);

    const room = {
      quiz_id: quiz.id,
      room_id: room_id,
    }
    console.log('User: ',this.props.user);
    console.log('creating room: ', room);

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
      return (
        <Card key={x.id} className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={x.imgUrl}
              title="Contemplative Reptile"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {x.name}
              </Typography>
              <Typography component="p">
                {x.description}
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
        <Menu history={ history } adminPanel={true} user={this.props.user}/>
        <div className="adminpanel">


          <h1>Adminpanel</h1>
          <div>
            <Button variant="contained" color="primary" className={classes.button}>
              Skapa quiz
            </Button>
            <h2> Starta ett quiz </h2>
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
    user: state.auth.data,
    questionCollections: state.questionCollections.data,
    collectionFetched: state.questionCollections.fetched,
});



function createRoomId(){

  let code = Math.ceil(Date.now() - 1539264714045);
  console.log('Code: ', code);
  let hashids = new Hashids('begame'),
  id = hashids.encode(code);

  let decoded = hashids.decode(id);

  return id;

}

export default connect(mapStateToProps)(withStyles(styles)(Adminpanel));
