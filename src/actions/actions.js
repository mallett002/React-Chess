export const PIECE_SELECTED = 'PIECE_SELECTED';
export const PIECE_MOVED = 'PIECE_MOVED';
export const DESELECT = 'DESELECT';
export const PIECE_TAKEN = 'PIECE_TAKEN';
export const PLAYERS_ADDED = 'PLAYERS_ADDED';
export const SHOW_MOVE = 'SHOW_MOVE';
export const UPDATE_PLAYER_ONE_DANGER = 'UPDATE_PLAYER_ONE_DANGER';
export const UPDATE_PLAYER_TWO_DANGER = 'UPDATE_PLAYER_TWO_DANGER';

// When a piece is selected
export const selectPiece = (piece, place) => ({
    type: PIECE_SELECTED,
    payload: { piece: piece, index: place }
});

// Deselect a selected piece
export const deselect = () => ({
    type: DESELECT
});

// Move a piece
export const moveTo = (from, to) => ({
    type: PIECE_MOVED,
    payload: { from: from, to: to }
});

// Add to "fallen soldiers" list
export const addToFallen = (piece) => ({
    type: PIECE_TAKEN,
    payload: piece
});

// Add user names and colors
export const addUserInfo = (player1, player2) => ({
    type: PLAYERS_ADDED,
    payload: {player1, player2}
});

// add indices that a given piece can move to
export const showMove = validIndices => ({
    type: SHOW_MOVE,
    payload: validIndices
});

// add dangerIndices for player 1
export const updatePlayerOneDanger = dangerIndices => ({
    type: UPDATE_PLAYER_ONE_DANGER,
    payload: dangerIndices
});

// add dangerIndices for player 2
export const updatePlayerTwoDanger = dangerIndices => ({
    type: UPDATE_PLAYER_TWO_DANGER,
    payload: dangerIndices
});

