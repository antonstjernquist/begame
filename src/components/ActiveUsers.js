import React,{ Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import People from '@material-ui/icons/People';
import { connect } from 'react-redux';
import { getUserInRoom } from '../actions/userActions.js'
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 250,
    height: '95vh',
    backgroundColor: '#a7d129',
    float: 'left',
  },
  userText: {
    color: '#FAFAFA',
    fontSize: '1rem',
    fontWeight: '400'
  },
  pointsText: {
    color: '#FAFAFA',
    fontWeight: '400'
  },
  onlineText: {
    color: '#FAFAFA',
    fontWeight: 'bolder',
    fontSize: 15
  },
  rightIcon: {
    color: '#FAFAFA',
  },
  listitem: {
    paddingTop: 0,
  }
});



class ActiveUsers extends Component {
  constructor(props){
    super(props);
    const { fetched, dispatch, roomId } = props;

    if (!fetched && roomId){
      console.log("get rooms");
      dispatch(getUserInRoom({roomId}))
    }
  }

  renderActiveUsers = () => {
    const { classes, users } = this.props;
    if (!users){
      return ( <div>User is missing</div>)
    }
    console.log(users);
    return users.map( user => (
      <ListItem className={classes.listitem} key={user['_id']}>
        <ListItemText
          disableTypography
          primary={<Typography type="body2" className={classes.userText}>{user.name}</Typography>}
          secondary={<Typography type="body2" className={classes.pointsText}>{user.points}</Typography>} />
      </ListItem>
    ));
  }

  getNewUserData = () => {
    const { dispatch, roomId } = this.props;

    if (roomId){
      console.log("get rooms");
      dispatch(getUserInRoom({roomId}))
    }
  }

  render(){
    const { classes, users, room } = this.props;
    const gameMaster = room && room.createdBy;
    console.log("PROPS ACTIVE USERS", this.props);
    const userList = this.renderActiveUsers();
    return (
      <div className={classes.root}>
        <List>
        <ListItem className={classes.listitem}>
        <People className={classes.rightIcon} />
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.onlineText}>{users.length || 0}</Typography>} />
        </ListItem>
        <ListItem className={classes.listitem}>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.userText}>{gameMaster}</Typography>}
            secondary={<Typography type="body2" className={classes.pointsText}>GAME MASTER</Typography>} />
        </ListItem>
          { userList }
        </List>
        <Button color="primary" size="small" variant="contained" style={{color: '#FFF', position: 'absolute', bottom: 24, left: 24}} onClick={this.getNewUserData}>UPPDATERA ANVÄNDARE</Button>
      </div>
    )
  }
}

let mapStateToProps = store => ({
    users: store.users.data,
    fetched: store.users.fetched,
    room: store.activeRoom.data
});


export default connect(mapStateToProps)(withStyles(styles)(ActiveUsers));
