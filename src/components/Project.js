import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Material UI */
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

/* Components */
import Menu from './Menu';
import ActiveUsers from './ActiveUsers';
import TimerBar from './TimerBar';

/* Denna komponent visar vilka olika quiz man kan starta samt "Skapa ny quiz" */
const styles = theme => ({
  main: {
    minHeight: 'calc(100vh)',
  },
  input: {
    display: 'none',
  },
  card: {
    maxWidth: 380,
    marginBottom: 30
  },
  media: {
    height: 140,
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 450,
    margin: 'auto'
  },
  stepper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: 725,
    margin: 'auto'
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: '#a7d129',
    margin: '0px auto',
    marginBottom: 10,
  },
});


class Project extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id,
        correctAnswer: 'selectedB'
      }
    }

  render() {

    const { classes, history } = this.props;
    return (
          <div className={classes.main}>
              <Menu roomId={this.state.id} history={history}/>
              <ActiveUsers />
              <div style={{width: 800, height: 300, float: 'left', margin: '100px auto', textAlign: 'center', marginLeft: 400, marginTop: 50 }}>
                <h1 style={{fontSize: '3.5em', color: '#a7d129', fontWeight: 'bold', marginBottom: 100}}>What is a Lizard?</h1>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 50, flexWrap: 'wrap'}}>
                  <Card className={classes.card} raised={this.state.selectedA}>
                    <CardContent>
                    <Avatar className={classes.orangeAvatar}>A</Avatar>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card} raised={this.state.selectedB}>
                    <CardContent>
                      <Avatar className={classes.orangeAvatar}>B</Avatar>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card} raised={this.state.selectedC}>
                    <CardContent>
                      <Avatar className={classes.orangeAvatar}>C</Avatar>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.card} raised={this.state.selectedD}>
                    <CardContent>
                      <Avatar className={classes.orangeAvatar}>D</Avatar>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                </Card>
                </div>
                <TimerBar />
              </div>
          </div>
    )
  }
}


let mapStateToProps = state => ({
    value: state.value
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Project));
