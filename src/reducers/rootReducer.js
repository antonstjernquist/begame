/* Import combineReducers */
import { combineReducers } from 'redux';

/* Import our reducers */
import valueReducer from './valueReducer.js';
import errorHandlingReducers from './errorHandlingReducers.js'

let rootReducer = combineReducers ({
  value: valueReducer,
  errorHandling: errorHandlingReducers,
});

export default rootReducer;
