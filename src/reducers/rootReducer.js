/* Import combineReducers */
import { combineReducers } from 'redux';

/* Import our reducers */
import valueReducer from './valueReducer.js';

let rootReducer = combineReducers ({

  value: valueReducer,

});

export default rootReducer;
