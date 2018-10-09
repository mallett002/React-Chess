import {
    PIECE_TAKEN,
    PLAYERS_ADDED,
    UPDATE_PLAYER_TWO_DANGER,
    P2_IN_CHECK,
    REMOVE_2_FROM_CHECK,
    P2_MOVED_ROOK_OR_KING
} from '../actions/actions';

// Want to know which pieces are out to display them in a list of "fallen soldiers"
// Want to know if a king is in check
// Want to know if it's this player's turn

const initialState = {
    team: "player2",
    color: '',
    userName: '',
    piecesOut: [],
    dangerIndices: [],
    inCheck: false,
    isTurn: false,
    rookOrKingMoved: []
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
        case UPDATE_PLAYER_TWO_DANGER:
            return {
                ...state,
                dangerIndices: [...action.payload]
            }
        case P2_IN_CHECK:
            return {
                ...state,
                inCheck: true
            }
        case REMOVE_2_FROM_CHECK:
            return {
                ...state,
                inCheck: false
            }
        case P2_MOVED_ROOK_OR_KING:
            return {
                ...state,
                rookOrKingMoved: !state.rookOrKingMoved.includes(action.payload) ? [...state.rookOrKingMoved, action.payload]
                    : [...state.rookOrKingMoved]
            }
        default:
            return state
    }
};

export default playerTwoReducer;