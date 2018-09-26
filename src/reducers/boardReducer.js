import { PIECE_MOVED, PIECE_SELECTED, DESELECT, SHOW_MOVE } from '../actions/actions';

let initialState = {
  layout: [
    {name:"rook", team:"player2", id:0}, {name:"knight", team:"player2", id:1}, {name:"bishop", team:"player2", id:2}, 
    {name:"queen", team:"player2", id:3}, {name:"king", team:"player2", id:4}, {name:"bishop", team:"player2", id:5}, 
    {name: "knight", team: "player2", id:6}, {name:"rook", team:"player2" , id:7}, {name:"pawn", team:"player2", id:8}, 
    {name:"pawn", team:"player2", id:9}, {name:"pawn", team:"player2", id:10}, {name:"pawn", team:"player2", id:11}, 
    {name:"pawn", team:"player2", id:12}, {name:"pawn", team:"player2", id:13}, {name:"pawn", team:"player2", id:14}, 
    {name:"pawn", team:"player2", id:15},{name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"pawn", team:"player1", id:48}, {name:"pawn", team:"player1", id:49}, 
    {name:"pawn", team:"player1", id:50}, {name:"pawn", team:"player1", id:51}, {name:"pawn", team:"player1", id:52}, 
    {name:"pawn", team:"player1", id:53}, {name:"pawn", team:"player1", id:54}, {name:"pawn", team:"player1", id:55}, 
    {name:"rook", team:"player1", id:56}, {name:"knight", team:"player1", id:57}, {name:"bishop", team:"player1", id:58}, 
    {name:"queen", team:"player1", id:59},{name:"king", team:"player1", id:60}, {name:"bishop", team:"player1", id:61}, 
    {name:"knight", team:"player1", id:62}, {name:"rook", team:"player1", id:63}
  ],
  selected: null, // or something like: {piece: {name:"bishop", team:"player1", id:58}, index: 55}
  validMoves: [],
};

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case PIECE_SELECTED:
            return {
                ...state,
                selected: action.payload
            }
        case DESELECT:
            return {
                ...state,
                selected: null,
                validMoves: []
            }
        case SHOW_MOVE:
            return {
                ...state,
                validMoves: state.validMoves.concat(action.payload)
            }
        case PIECE_MOVED:
            return {
                ...state,
                // layout at index "to" is the selected piece
                ...state.layout[action.payload.to] = state.selected.piece,
                // set index of "from" to be an "empty" one
                ...state.layout[action.payload.from] = {name:"empty"},
                selected: null,
                validMoves: []
            }
        default:
            return state
    }
};

export default boardReducer;