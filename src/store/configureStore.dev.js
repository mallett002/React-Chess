import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const initialState = {};

const store = createStore(
    rootReducer,
    initialState, 
    compose(
        applyMiddleware(thunk, logger)
    )
);

export default store;