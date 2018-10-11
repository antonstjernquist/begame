import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People';

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

function FolderList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
      <ListItem className={classes.listitem}>
      <People className={classes.rightIcon} />
        <ListItemText
          disableTypography
          primary={<Typography type="body2" className={classes.onlineText}>6</Typography>} />
      </ListItem>
      <ListItem className={classes.listitem}>
        <ListItemText
          disableTypography
          primary={<Typography type="body2" className={classes.userText}>david</Typography>}
          secondary={<Typography type="body2" className={classes.pointsText}>Game Master</Typography>} />
      </ListItem>
        <ListItem className={classes.listitem}>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.userText}>sabrinawolfpalm</Typography>}
            secondary={<Typography type="body2" className={classes.pointsText}>poäng: 120</Typography>} />
        </ListItem>
        <ListItem className={classes.listitem}>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.userText}>antonstjernqvist</Typography>}
            secondary={<Typography type="body2" className={classes.pointsText}>poäng: 19</Typography>} />
        </ListItem>
        <ListItem className={classes.listitem}>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.userText}>gustavkarlstrom</Typography>}
            secondary={<Typography type="body2" className={classes.pointsText}>poäng: 18</Typography>} />
        </ListItem>
        <ListItem className={classes.listitem}>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.userText}>johanaugustsson</Typography>}
            secondary={<Typography type="body2" className={classes.pointsText}>poäng: 17</Typography>} />
        </ListItem>
        <ListItem className={classes.listitem}>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" className={classes.userText}>antonnordgren</Typography>}
            secondary={<Typography type="body2" className={classes.pointsText}>poäng: 17</Typography>} />
        </ListItem>
      </List>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);
