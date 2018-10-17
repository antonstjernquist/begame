import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddQuest from './AddQuest.js';
import Menu from './Menu.js';
import ErrorHandling from './ErrorHandling.js';
import { createCollectionAction, updateCollectionAction, removeCollectionAction } from '../actions/questionCollectionActions.js';
import { showSnackbarError } from '../actions/errorHandlingActions';

const styles = theme => ({
  root: {
  },
  expand: {
    width: 'calc(100% - 68px)',
    marginLeft: 10,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
      margin: 10
  },
  removeButtonDiv: {
      border: '1px solid #e67575',
      borderRadius: 5,
      display: 'inline-block'
  },
  paper: {
    width: 600,
    padding: 20,
    marginBottom: 20,
    marginTop: 20,
    margin: '0px auto'
  },

});

const min_title_length  = 4;
const min_desc_length   = 4;
const min_img_length    = 4;

class HandleQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
        _id: null,
        isLoaded: false,
        questions: {},
        imgUrl: '',
        description: '',
        new_quiz: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { questionCollections } = props;
    const { isLoaded } = state;
    const collectionId = props.match && props.match.params && props.match.params.id;

    if ( collectionId && Object.keys(questionCollections).length > 0 && !isLoaded ) {
      const { questions, imgUrl, title, description, _id } = questionCollections[collectionId];
      return ({questions, imgUrl, title, description, _id, isLoaded: true, new_quiz: false })
    }

    return null;
  }

  handleChangeQuestions = (event, questKey, changeKey) => {
    if(event.target.value !== undefined){
      const questions = this.state.questions

      if(changeKey === 'correctAnswer'){
        questions[questKey][changeKey] = event.target.value;
      } else {
          questions[questKey].answers[changeKey] = event.target.value;
      }

      this.setState({ questions: questions });
    }
  }

  handleChange = (event, changeKey) => {
    if(event.target.value !== undefined){
      this.setState({ [changeKey]: event.target.value });
    }
  }

  addQuestion = data => {

      const { dispatch } = this.props;

      if ( this.state.new_quiz ){
          this.setState({ questions: { ...this.state.questions, [data.question]: data }});
      } else {

          /* Define the collection we shall edit */
          const collectionId = this.props.match && this.props.match.params && this.props.match.params.id;
          let collection = this.props.questionCollections[collectionId];

          /* Add question to the collection */
          collection.questions[data.question] = data;

          /* Then update in store */
          dispatch(updateCollectionAction(collection));

      }
  }

  saveQuiz = () => {
      const { dispatch } = this.props;

      const quiz = {
          ...this.state,
          title: this.state.title,
          description: this.state.description,
          imgUrl: this.state.imgUrl,
          questions: this.state.questions,
          category: 'Temporary',
      }

      /* Add order to questions */
      let index = 1;
      for(let q in quiz.questions){
          quiz.questions[q].order = index;
          index++;
      }

      if(checkQuizData(quiz)){
          console.log('Passed checks, posting quiz to database.');

          /* Update / Create */
          if(this.state.new_quiz){
              console.log('Creating new quiz!');
              dispatch(createCollectionAction(quiz));
          } else {
              console.log('Updating old quiz!');
              dispatch(updateCollectionAction(quiz));
          }
      } else {
          dispatch(showSnackbarError('Frågesamlingen uppfyller inte alla krav!'));
          console.log('Failed to pass checks.');
      }
  }

  removeQuiz = () => {
      const { dispatch } = this.props;
      dispatch(removeCollectionAction(this.state._id));
  }

  removeQuestion = question => {
      const { dispatch } = this.props;

      if ( this.state.new_quiz ){
          console.log('Removing question.');
          let questions = { ...this.state.questions };
          delete(questions[question]);
          this.setState({ questions: questions });
      } else {

          /* Define the collection we shall edit */
          const collectionId = this.props.match && this.props.match.params && this.props.match.params.id;
          let collection = this.props.questionCollections[collectionId];

          /* Add question to the collection */
          delete(collection.questions[question]);

          /* Then update in store */
          dispatch(updateCollectionAction(collection));
      }

  }

  renderTableView = () => {
    const { questionCollections } = this.props;
    const collectionId = this.props.match && this.props.match.params && this.props.match.params.id;
    let new_quiz = false;
    if(Object.keys(this.state.questions).length){
        new_quiz = true;
    } else if (Object.keys(questionCollections).length === 0 || !collectionId ) {
        return null;
    }

    /* If we're creating a quiz, set the questions from state */
    const { questions } = new_quiz ? this.state : questionCollections[collectionId];

    return Object.keys(questions).map( (key ,index) => {
        const item = questions[key];
        return (
          <ExpansionPanel key={index} style={{ width: 640, marginLeft: -20 }}>
            <ExpansionPanelSummary style={ {justifyContent: 'space-between'} }>
              <Typography>{item.question}</Typography>
              <Button onClick={e => this.removeQuestion(key)}>Remove</Button>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>

              {/*  Show all options */}
              <div>
                {Object.keys(questions[key].answers).map( optionKey => (
                    <TextField
                        key={optionKey}
                        id="standard-full-width"
                        label={optionKey}
                        value={questions[key].answers[optionKey]}
                        style={{ margin: 8 }}
                        placeholder="Placeholder"
                        fullWidth
                        margin="normal"
                        onChange={(event)=> this.handleChangeQuestions(event, key, optionKey)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                  ))}

                  {/* Shows correct answer.. not completed yet */}
                  <TextField
                    id="standard-full-width"
                    label='correctAnswer'
                    value={questions[key]['correctAnswer']}
                    style={{ margin: 8 }}
                    placeholder="Rätt svar"
                    fullWidth
                    margin="normal"
                    onChange={(event)=> this.handleChangeQuestions(event, key, 'correctAnswer')}
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
    const { title, imgUrl, description } = this.state;
    const { classes, history } = this.props;
    const table = this.renderTableView();


    return (
      <Fragment>
        <Menu history={ history } createQuiz={ true }/>
        <div style={{float: 'right', marginTop: 10}}>
        <Button variant="contained" color="primary" className={classes.button} onClick= { this.saveQuiz }>
          Spara frågesamling
        </Button>
        {!this.state.new_quiz &&
            <Button variant="contained" color="secondary" className={classes.button} onClick= { this.removeQuiz }>
              Radera frågesamling
            </Button>
        }
        </div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
          <Typography variant="h5" gutterBottom>Skapa quiz</Typography>
            <TextField
              id="outlined-name"
              label='Title'
              className={classes.textField}
              value={title}
              onChange={(event)=> this.handleChange(event, 'title')}
              margin="normal"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  fontSize: 13,
                  height: 45,
                },
              }}
            />
            <br/>
            <TextField
              id="outlined-name"
              label='Beskrivning'
              value={description}
              className={classes.textField}
              onChange={(event)=> this.handleChange(event, 'description')}
              margin="normal"
              variant="outlined"
              multiline
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  fontSize: 13,
                  height: 45,
                },
              }}
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
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  fontSize: 13,
                  height: 45,
                },
              }}
            />
            <div style={{ display:'flex', justifyContent: 'center'}}>
              <img src={imgUrl} alt="Bild Saknas" height="300" width='auto' style={{ margin: 50 }} />
            </div>
            </Paper>
          </div>
          <AddQuest dispatch={this.props.dispatch} addQuestion={this.addQuestion} />
        <ErrorHandling />
      <Paper style={{width: 600, margin: '20px auto', padding: 20}}>
        <Typography variant="h5" gutterBottom>Frågor</Typography>
        { table }
      </Paper>
      </Fragment>
    );
  }
}


function checkQuizData(data){

    const { title, description, imgUrl } = data;

    if(!title || !description || !imgUrl)
        return false;

    if(title.length < min_title_length || description.length < min_desc_length || imgUrl.length < min_img_length)
        return false;

    return true;
}

HandleQuestions.propTypes = {
  classes: PropTypes.object.isRequired,
};

let mapStateToProps = store => ({
    fetched: store.users.fetched,
    users: store.users.data,
    questionCollections: store.questionCollections.data,
});

export default connect(mapStateToProps)(withStyles(styles)(HandleQuestions));
