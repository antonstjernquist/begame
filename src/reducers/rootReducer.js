/* Import combineReducers */
import { combineReducers } from 'redux';

/* Import our reducers */
import valueReducer from './valueReducer.js';
import errorHandlingReducers from './errorHandlingReducers.js'
import activeUsersReducer from './activeUsersReducer.js'

let rootReducer = combineReducers ({
  value: valueReducer,
  errorHandling: errorHandlingReducers,
  users: activeUsersReducer,
});

export default rootReducer;
