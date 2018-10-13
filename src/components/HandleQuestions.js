import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddQuest from './AddQuest.js';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  }
});


class HandleQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoaded: false,
        questions: {},
        imgUrl: {},
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { questionCollections } = props;
    const { isLoaded } = state;
    const collectionId = props.match && props.match.params && props.match.params.id;

    if ( collectionId && Object.keys(questionCollections).length > 0 && !isLoaded ) {
      const { questions, imgUrl, title } = questionCollections[collectionId];
      return ({questions, imgUrl, title, isLoaded: true })
    }
    return null;
  }

  handleChangeQuestions = (event, questKey, changeKey) => {
    if(event.target.value !== undefined){
      const {questions} = { ...this.state };

      if(changeKey === 'correctAnswer'){
        questions[questKey][changeKey] = event.target.value;
      } else {
        questions[questKey].answers[changeKey] = event.target.value;
      }

      this.setState({ questions: questions});
    }
  }

  handleChange = (event, changeKey) => {
    if(event.target.value !== undefined){
      this.setState({ [changeKey]: event.target.value });
    }
  }




  renderTableView = () => {
    const { classes, questionCollections } = this.props;
    const collectionId = this.props.match && this.props.match.params && this.props.match.params.id;
    console.log('id:', collectionId);
    console.log('questionCollections:', questionCollections);
    if (Object.keys(questionCollections).length === 0 || !collectionId )
      return null;

    const { questions } = questionCollections[collectionId]
    console.log('questions: ', questions);
    return Object.keys(questions).map( (itemKey ,index) => {
        const item = questions[itemKey];
        return (
          <ExpansionPanel key={index}>
            <ExpansionPanelSummary >
              <Typography className={classes.heading}>{item.question}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              {/*  Show all options */}
              <div className={classes.contentWrapper}>
                {Object.keys(questions[itemKey].answers).map( optionKey =>(
                    <TextField
                      key={optionKey}
                      id="standard-full-width"
                      label={optionKey}
                      value={questions[itemKey].answers[optionKey]}
                      style={{ margin: 8 }}
                      placeholder="Placeholder"
                      fullWidth
                      margin="normal"
                      onChange={(event)=> this.handleChangeQuestions(event,itemKey, optionKey)}
                      InputLabelProps={{
                      shrink: true,
                      }}
                    />
                  ))}

                  {/* Shows correct answer.. not completed yet */}
                  <TextField
                    id="standard-full-width"
                    label='correctAnswer'
                    value={questions[itemKey]['correctAnswer']}
                    style={{ margin: 8 }}
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                    onChange={(event)=> this.handleChangeQuestions(event,itemKey, 'correctAnswer')}
                    InputLabelProps={{
                    shrink: true,
                    }}
                  />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
      )
    })
  };

  render(){
    const table = this.renderTableView();
    const { title, imgUrl } = this.state;

    const { classes } = this.props;


    return (
      <div className={classes.root}>
        <TextField
          id="outlined-name"
          label='Title'
          className={classes.textField}
          value={title}
          onChange={(event)=> this.handleChange(event, 'title')}
          margin="normal"
          variant="outlined"
        />
        <br/>
        <TextField
          id="outlined-name"
          label='Bild url'
          value={imgUrl}
          className={classes.textField}
          onChange={(event)=> this.handleChange(event, 'imgUrl')}
          margin="normal"
          variant="outlined"
          style={{ width: '95%' }}
        />


        <div style={{ display:'flex', justifyContent: 'center'}}>
          <img src={imgUrl} alt="Bild Saknas" height="300" width='auto' style={{ margin: 50 }} />
        </div>

        { table }
        <AddQuest />
      </div>
    );
  }
}

HandleQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = store => ({
    questionCollections: store.questionCollections.data,
    fetched: store.questionCollections.fetched,
});


export default connect(mapStateToProps)(withStyles(styles)(HandleQuestions));
