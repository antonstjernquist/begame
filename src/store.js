import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

const initialState = {
    value: 4,
    users: [
        {
            name: 'Johan',
            points: 15
        },
        {
            name: 'Anton S',
            points: 17
        },
        {
            name: 'Sabrina',
            points: 15
        },
        {
            name: 'Gustav',
            points: 15
        },
        {
            name: 'Anton N',
            points: 15
        },
    ],
};

export default createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
