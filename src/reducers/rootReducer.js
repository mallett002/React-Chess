import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import computerReducer from './computerReducer';

export default combineReducers({
    player: playerReducer,
    computer: computerReducer
});