import React,{ Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import People from '@material-ui/icons/People';
import { connect } from 'react-redux';
import { getUserInRoom } from '../actions/userActions.js';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 250,
    height: '95vh',
    backgroundColor: '#573697',
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
      dispatch(getUserInRoom({roomId,failMsg: false}))
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {this.getNewUserData(false) }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderActiveUsers = () => {
    const { classes, users } = this.props;
    if (!users){
      return ( <div>User is missing</div>)
    }
    return users.map( user => (
      <ListItem className={classes.listitem} key={user['_id']}>
        <ListItemText
          disableTypography
          primary={<Typography type="body2" className={classes.userText}>{user.name}</Typography>}
          secondary={<Typography type="body2" className={classes.pointsText}>{user.points}</Typography>} />
      </ListItem>
    ));
  }

  getNewUserData = (failMsg) => {
    const { dispatch, roomId } = this.props;

    if (roomId){
      dispatch(getUserInRoom({roomId,failMsg}))
    }
  }

  render(){
    const { classes, users, room } = this.props;
    const gameMaster = room && room.createdBy;
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
