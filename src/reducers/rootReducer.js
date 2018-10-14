/* Import combineReducers */
import { combineReducers } from 'redux';

/* Import our reducers */
import quizReducer from './quizReducer.js';
import errorHandlingReducers from './errorHandlingReducers.js'
import activeUsersReducer from './activeUsersReducer.js'
import authReducer from './authReducer.js'
import collectionsReducer from './collectionsReducer.js'
import roomReducer from './roomReducer.js'
import userReducer from './userReducer.js'

let rootReducer = combineReducers ({
  editQuiz: quizReducer,
  errorHandling: errorHandlingReducers,
  users: activeUsersReducer,
  auth: authReducer,
  questionCollections: collectionsReducer,
  activeRoom: roomReducer,
  user: userReducer,
});

export default rootReducer;
