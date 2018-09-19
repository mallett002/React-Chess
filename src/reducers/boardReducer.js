import { PIECE_MOVED, PIECE_SELECTED, DESELECT } from '../actions/actions';

let initialState = {
  layout: [
    {name:"rook", team:"computer", id:0}, {name:"knight", team:"computer", id:1}, {name:"bishop", team:"computer", id:2}, 
    {name:"queen", team:"computer", id:3}, {name:"king", team:"computer", id:4}, {name:"bishop", team:"computer", id:5}, 
    {name: "knight", team: "computer", id:6}, {name:"rook", team:"computer" , id:7}, {name:"pawn", team:"computer", id:8}, 
    {name:"pawn", team:"computer", id:9}, {name:"pawn", team:"computer", id:10}, {name:"pawn", team:"computer", id:11}, 
    {name:"pawn", team:"computer", id:12}, {name:"pawn", team:"computer", id:13}, {name:"pawn", team:"computer", id:14}, 
    {name:"pawn", team:"computer", id:15},{name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"pawn", team:"player", id:48}, {name:"pawn", team:"player", id:49}, 
    {name:"pawn", team:"player", id:50}, {name:"pawn", team:"player", id:51}, {name:"pawn", team:"player", id:52}, 
    {name:"pawn", team:"player", id:53}, {name:"pawn", team:"player", id:54}, {name:"pawn", team:"player", id:55}, 
    {name:"rook", team:"player", id:56}, {name:"knight", team:"player", id:57}, {name:"bishop", team:"player", id:58}, 
    {name:"queen", team:"player", id:59},{name:"king", team:"player", id:60}, {name:"bishop", team:"player", id:61}, 
    {name:"knight", team:"player", id:62}, {name:"rook", team:"player", id:63}
  ],
  selected: null // or something like: {name:"bishop", team:"player", id:58} 
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
                selected: null
            }
        case PIECE_MOVED:
            return {
                ...state,
                ...state.layout[action.payload.to] = state.selected,
                // set index of "from" to be an "empty" one
                ...state.layout[action.payload.from] = {name:"empty"},
                selected: null
            }
        default:
            return state
    }
};

export default boardReducer;