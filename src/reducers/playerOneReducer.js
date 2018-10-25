import { 
    PIECE_TAKEN, 
    PLAYERS_ADDED, 
    UPDATE_PLAYER_ONE_DANGER, 
    P1_IN_CHECK, 
    REMOVE_1_FROM_CHECK,
    P1_MOVED_ROOK_OR_KING,
    P1_ALMOST_IN_CHECK,
    RESET_BOARD 
} from '../actions/actions';

// Want to know which pieces are out to display them in a list of "fallen soldiers"
// Want to know if a king is in check
// Want to know if it's this player's turn

const initialState = {
    team: 'player1',
    color: '',
    userName: '',
    piecesOut: [],
    dangerIndices: [],
    inCheck: false,
    rookOrKingMoved: [],
    almostInCheckPath: []
};

const playerOneReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYERS_ADDED:
            return {
                ...state,
                color: action.payload.player1.color,
                userName: action.payload.player1.userName
            }
        case PIECE_TAKEN:
            return {
                ...state,
                // make sure piece belongs to this team before adding to piecesOut
                piecesOut: [...state.piecesOut, action.payload.team === state.team && action.payload]
            }
        case UPDATE_PLAYER_ONE_DANGER:
            return {
                ...state,
                dangerIndices: [...action.payload]
            }
        case P1_IN_CHECK:
            return {
                ...state,
                inCheck: true
            }
        case REMOVE_1_FROM_CHECK:
            return {
                ...state,
                inCheck: false
            }
        case P1_MOVED_ROOK_OR_KING:
            return {
                ...state,
                rookOrKingMoved: !state.rookOrKingMoved.includes(action.payload) ? [...state.rookOrKingMoved, action.payload]
                    : [...state.rookOrKingMoved]
            }
        case P1_ALMOST_IN_CHECK: 
            return {
                ...state,
                almostInCheckPath: action.payload
            }
        case RESET_BOARD:
            return {
                ...initialState
            }
        default:
            return state
    }
};

export default playerOneReducer;