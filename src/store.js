import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

const initialState = {
    value: 4,
    users: [],
};

export default createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
