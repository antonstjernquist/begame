import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import StarIcon from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 280,
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    float: 'right',
  },
});

function FolderList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <Avatar>
            <StarIcon />
          </Avatar>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" style={{ color: '#a7d129', fontSize: '1.1rem', fontWeight: 'bold' }}>sabrinawolfpalm</Typography>}
            secondary={<Typography type="body2" style={{ color: '#777', fontWeight: '400' }}>poäng: 20</Typography>} />
        </ListItem>
        <ListItem>
          <Avatar>
            <StarBorder />
          </Avatar>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" style={{ color: '#333', fontSize: '1rem', fontWeight: '400' }}>antonstjernqvist</Typography>}
            secondary={<Typography type="body2" style={{ color: '#777', fontWeight: '400' }}>poäng: 19</Typography>} />
        </ListItem>
        <ListItem>
          <Avatar>
            <StarBorder />
          </Avatar>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" style={{ color: '#333', fontSize: '1rem', fontWeight: '400' }}>gustavkarlstrom</Typography>}
            secondary={<Typography type="body2" style={{ color: '#777', fontWeight: '400' }}>poäng: 18</Typography>} />
        </ListItem>
        <ListItem>
          <Avatar>
            <StarBorder />
          </Avatar>
          <ListItemText
            disableTypography
            primary={<Typography type="body2" style={{ color: '#333', fontSize: '1rem', fontWeight: '400' }}>johanaugustsson</Typography>}
            secondary={<Typography type="body2" style={{ color: '#777', fontWeight: '400' }}>poäng: 17</Typography>} />
        </ListItem>
      </List>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);
