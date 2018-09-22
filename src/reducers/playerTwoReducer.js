import { PIECE_TAKEN, PLAYERS_ADDED  } from '../actions/actions';

// Want to know which pieces are out to display them in a list of "fallen soldiers"
// Want to know if a king is in check
// Want to know if it's this player's turn

const initialState = {
    team: "player2",
    color: '',
    userName: '',
    piecesOut: [],
    inCheck: false,
    isTurn: false
};

const playerTwoReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYERS_ADDED:
        return {
            ...state,
            color: action.payload.player2.color,
            userName: action.payload.player2.userName
        }
        case PIECE_TAKEN:
            return {
                ...state,
                // make sure piece belongs to this team before adding to piecesOut
                piecesOut: [...state.piecesOut, action.payload.team === state.team && action.payload]
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

export default playerTwoReducer;