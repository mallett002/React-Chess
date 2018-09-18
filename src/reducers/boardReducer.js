import { PIECE_MOVED, PIECE_SELECTED, DESELECT } from '../actions/actions';

let initialState = {
  board: [
    {name:"rook", team:"computer", id:0}, {name:"knight", team:"computer", id:1}, {name:"bishop", team:"computer", id:2}, 
    {name:"queen", team:"computer", id:3}, {name:"king", team:"computer", id:4}, {name:"bishop", team:"computer", id:5}, 
    {name: "knight", team: "computer", id:6}, {name:"rook", team:"computer" , id:7}, {name:"pawn", team:"computer", id:8}, 
    {name:"pawn", team:"computer", id:9}, {name:"pawn", team:"computer", id:10}, {name:"pawn", team:"computer", id:11}, 
    {name:"pawn", team:"computer", id:12}, {name:"pawn", team:"computer", id:13}, {name:"pawn", team:"computer", id:14}, 
    {name:"pawn", team:"computer", id:15},{name:"empty", id:16}, {name:"empty", id:17}, {name:"empty", id:18}, 
    {name:"empty", id:19}, {name:"empty", id:20}, {name:"empty", id:21}, {name:"empty", id:22}, {name:"empty", id:23},
    {name:"empty", id:24}, {name:"empty", id:25}, 
    {name:"empty", id:26}, {name:"empty", id:27}, {name:"empty", id:28}, {name:"empty", id:29}, 
    {name:"empty", id:30}, {name:"empty", id:31},
    {name:"empty", id:32}, {name:"empty", id:33}, {name:"empty", id:34}, {name:"empty", id:35}, {name:"empty", id:36}, 
    {name:"empty", id:37}, 
    {name:"empty" , id:38}, {name:"empty", id:39}, {name:"empty", id:40}, {name:"empty", id:41}, {name:"empty", id:42}, 
    {name:"empty", id:43}, 
    {name:"empty", id:44}, {name:"empty", id:45}, {name:"empty", id:46}, {name:"empty", id:47}, {name:"pawn", team:"player", id:48}, 
    {name:"pawn", team:"player", id:49}, {name:"pawn", team:"player", id:50}, {name:"pawn", team:"player", id:51}, 
    {name:"pawn", team:"player", id:52}, {name:"pawn", team:"player", id:53}, {name:"pawn", team:"player", id:54}, 
    {name:"pawn", team:"player", id:55}, {name:"rook", team:"player", id:56}, {name:"knight", team:"player", id:57}, 
    {name:"bishop", team:"player", id:58}, {name:"queen", team:"player", id:59},{name:"king", team:"player", id:60}, 
    {name:"bishop", team:"player", id:61}, {name:"knight", team:"player", id:62}, {name:"rook", team:"player", id:63}
  ],
  selected: null // or {name:"bishop", team:"player", id:58} like this
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
                // board[action.payload] = board[selected]
            }
        default:
            return state
    }
};

export default boardReducer;