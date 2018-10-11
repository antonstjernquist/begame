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

const cards = [
    {
        // eslint-disable-next-line
        name: 'Javascript: Datatyper',
        id: 122,
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
        // eslint-disable-next-line
        name: 'Javascript: Listor',
        id: 133,
        image: 'https://images.pexels.com/photos/239898/pexels-photo-239898.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    },
    {
        // eslint-disable-next-line
        name: 'Javascript: Listor',
        id: 144,
        image: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
        // eslint-disable-next-line
        name: 'Javascript: Loopar',
        id: 155,
        image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
        // eslint-disable-next-line
        name: 'CSS: Float',
        id: 166,
        image: 'https://images.pexels.com/photos/248515/pexels-photo-248515.png?auto=compress&cs=tinysrgb&h=350'
    },
]

class Adminpanel extends Component {


  createRoom = quiz => {

    const room_id = createRoomId(this.props.user.name, quiz.id);

    const room = {
      quiz_id: quiz.id,
      room_id: room_id,
    }
    console.log('User: ',this.props.user);
    console.log('creating room: ', room);

  }

  render() {

    const { classes, history } = this.props;

    let cardList = cards.map(x => (
            <Card key={x.id} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={x.image}
                    title="Contemplative Reptile"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {x.name}
                    </Typography>
                    <Typography component="p">
                        Programming languages all have built-in data structures, but these often differ from one language to another. This quiz attempts to list the built-in data structures available in JavaScript and what properties they have; these can be used to build other data structures.
                    </Typography>
                  </CardContent>

                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={ e => {
                    this.createRoom(x);
                  }}>
                    Starta
                  </Button>
                  <Button size="small" color="primary">
                    Redigera
                  </Button>
                </CardActions>
              </Card>
    ));

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
    user: state.auth.data
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
