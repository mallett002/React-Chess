import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import computerReducer from './computerReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    player: playerReducer,
    computer: computerReducer,
    board: boardReducer
});