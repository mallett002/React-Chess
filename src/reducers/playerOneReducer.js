import { PIECE_TAKEN, PLAYERS_ADDED, PLAYER_ONE_DANGER } from '../actions/actions';

// Want to know which pieces are out to display them in a list of "fallen soldiers"
// Want to know if a king is in check
// Want to know if it's this player's turn

const initialState = {
    team: 'player1',
    color: '',
    userName: '',
    piecesOut: [],
    dangerIndices: [40, 41, 42, 43, 44, 45, 46, 47],
    inCheck: false,
    isTurn: false
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
        case PLAYER_ONE_DANGER:
            return {
                ...state,
                dangerIndices: [...state.dangerIndices, ...action.payload]
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