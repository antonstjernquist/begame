import React, { Component } from 'react';
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
        id: 12,
        image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
        // eslint-disable-next-line
        name: 'Javascript: Listor',
        id: 13,
        image: 'https://images.pexels.com/photos/239898/pexels-photo-239898.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    },
    {
        // eslint-disable-next-line
        name: 'Javascript: Listor',
        id: 14,
        image: 'https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
        // eslint-disable-next-line
        name: 'Javascript: Loopar',
        id: 15,
        image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?auto=compress&cs=tinysrgb&h=350'
    },
    {
        // eslint-disable-next-line
        name: 'CSS: Float',
        id: 16,
        image: 'https://images.pexels.com/photos/248515/pexels-photo-248515.png?auto=compress&cs=tinysrgb&h=350'
    },
]

class Adminpanel extends Component {

  render() {

    const { classes } = this.props;

    let cardList = cards.map(x => (
            <Card key={x.id} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={x.image}
                    title="Contemplative Reptile"
                  />

                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      {x.name}
                    </Typography>
                    <Typography component="p">
                        Programming languages all have built-in data structures, but these often differ from one language to another. This quiz attempts to list the built-in data structures available in JavaScript and what properties they have; these can be used to build other data structures.
                    </Typography>
                  </CardContent>

                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Starta
                  </Button>
                  <Button size="small" color="primary">
                    Redigera
                  </Button>
                </CardActions>
              </Card>
    ));

    return (
      <div className="adminpanel">

        <div className="loggedInDiv">
          <span> Inloggad som: </span>
          <span id="loggedInSpan">berra45</span>
        </div>

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
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(withStyles(styles)(Adminpanel));
