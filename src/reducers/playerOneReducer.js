import { PIECE_TAKEN } from '../actions/actions';

// Want to know which pieces are out to display them in a list of "fallen soldiers"
// Want to know if a king is in check
// Want to know if it's this player's turn

const initialState = {
    color: '',
    userName: '',
    piecesOut: [],
    inCheck: false,
    isTurn: false
};

const playerOneReducer = (state = initialState, action) => {
    switch (action.type) {
        case PIECE_TAKEN:
            return {
                ...state,
                piecesOut: [...state.piecesOut, action.payload]
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

export default playerOneReducer;