import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer.js';

const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  ));/*,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
*/
