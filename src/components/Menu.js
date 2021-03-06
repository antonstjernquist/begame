import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
    zIndex: 100,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appHeight: {
    minHeight: 50,
  },
  roomStyleText: {
    fontWeight: 500,
  }
};

function Menu(props) {
  const { classes, history, roomId, isAdmin, adminPanel, auth, createQuiz } = props;
  let setColor = 'primary'
  if( isAdmin ){
    setColor = 'secondary'
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color={setColor} >
        <Toolbar className={classes.appHeight}>
          <div className={classes.grow} color="inherit">
          {roomId &&
            <p className={classes.roomStyleText}>{`ROOMID #${roomId}`}</p>
          }
          {adminPanel && auth &&
            <p className={classes.roomStyleText}>GM {auth.name}</p>
          }
          </div>
          {!roomId && isAdmin &&
            <Button color="inherit" onClick={() => { history.push('/'); }}>Student</Button>
          }
          {!roomId && !isAdmin && !adminPanel && !createQuiz &&
            <Button color="inherit" onClick={() => { history.push('/admin'); }}>Admin</Button>
          }
          {roomId &&
            <Button color="inherit" onClick={() => { history.push('/logout'); }}>LOGGA UT</Button>
          }
          {createQuiz &&
            <Button color="inherit" onClick={() => { history.goBack(); }}>Go back</Button>
          }
          {adminPanel && auth &&
            <div>
              <Button color="inherit" onClick={() => { history.push('/logout'); }}>Logga ut</Button>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Menu);
