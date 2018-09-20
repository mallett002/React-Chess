import { combineReducers } from 'redux';
import playerOneReducer from './playerOneReducer';
import playerTwoReducer from './playerTwoReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    player1: playerOneReducer,
    player2: playerTwoReducer,
    board: boardReducer
});