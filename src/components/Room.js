import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { showSnackbarMessage } from '../actions/errorHandlingActions';

//Material UI
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { getRoomFromDb } from '../actions/roomActions'

//Imported components
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
  orangeAvatar: {
    color: '#fff',
    backgroundColor: '#a7d129',
    margin: '0px auto',
    marginBottom: 10,
  },
});

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      question: 'What is a Lizard?',
      selectedA: false,
      selectedB: false,
      selectedC: false,
      selectedD: false,
      correctAnswer: 'selectedB'
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


  selectedAnswer = (selected) => {
    if (selected === 'selectedA') {
      this.setState({ selectedA: true, selectedB: false, selectedC: false, selectedD: false, answered: true })
    } else if (selected === 'selectedB') {
      this.setState({ selectedA: false, selectedB: true, selectedC: false, selectedD: false, answered: true })
    } else if (selected === 'selectedC') {
      this.setState({ selectedA: false, selectedB: false, selectedC: true, selectedD: false, answered: true })
    } else if (selected === 'selectedD') {
      this.setState({ selectedA: false, selectedB: false, selectedC: false, selectedD: true, answered: true })
    }
  }

  render() {
    const { history, classes } = this.props;
    return (
      <Fragment>
        <Menu roomId={this.state.id} history={history}/>
        <div style={{width: 800, height: 300, margin: '100px auto', textAlign: 'center' }}>
          <h1 style={{fontSize: '3.5em', color: '#a7d129', fontWeight: 'bold', marginBottom: 100}}>What is a Lizard?</h1>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap'}}>
            <Card className={classes.card} onClick={() => this.selectedAnswer('selectedA')} raised={this.state.selectedA}>
            <CardActionArea>
              <CardContent>
              <Avatar className={classes.orangeAvatar}>A</Avatar>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card} onClick={() => this.selectedAnswer('selectedB')} raised={this.state.selectedB}>
            <CardActionArea>
              <CardContent>
                <Avatar className={classes.orangeAvatar}>B</Avatar>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card} onClick={() => this.selectedAnswer('selectedC')} raised={this.state.selectedC}>
            <CardActionArea>
              <CardContent>
                <Avatar className={classes.orangeAvatar}>C</Avatar>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card} onClick={() => this.selectedAnswer('selectedD')} raised={this.state.selectedD}>
            <CardActionArea>
              <CardContent>
                <Avatar className={classes.orangeAvatar}>D</Avatar>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </div>
        </div>
      <ErrorHandling />
      </Fragment>
    )
  }
}


let mapStateToProps = store => ({
    value: store.value,
    snackbarOpen: store.errorHandling.snackbarOpen,
    error: store.errorHandling.error,
    message: store.errorHandling.message,
});

export default compose(withStyles(styles), connect(mapStateToProps))(Room);
