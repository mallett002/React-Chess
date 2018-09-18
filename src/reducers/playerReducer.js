// Whole state of game saved in the Redux store.
// Want to know which pieces are in the game still, and where they're located on the board.
// Want to know which pieces are out in order to display them in a list of "fallen soldiers"
// Want to know if a king is in check 
import { 
    PIECE_SELECTED 
} from '../actions/actions';

const initialState = {
    piecesIn: [], 
    piecesOut: [],
    inCheck: false,
    isTurn: false, 
    selected: null
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PIECE_SELECTED:
            return {
                ...state,
                selected: action.payload
            }
        case "PIECE_LOST":
            return {
                ...state,
                // piecesIn without the one that was taken
                piecesIn: piecesIn.filter(p => p !== action.payload.piece),
                // add piece to piecesOut list
                piecesOut: piecesOut.push(action.payload.piece)
            }
        case "PUT_IN_CHECK":
            return {
                ...state,
                inCheck: true
            }
        default:
            return state
    }
};

export default playerReducer;