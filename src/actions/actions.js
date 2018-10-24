export const PIECE_SELECTED = 'PIECE_SELECTED';
export const PIECE_MOVED = 'PIECE_MOVED';
export const UPDATE_TURN = 'UPDATE_TURN';
export const DESELECT = 'DESELECT';
export const PIECE_TAKEN = 'PIECE_TAKEN';
export const PLAYERS_ADDED = 'PLAYERS_ADDED';
export const SHOW_MOVE = 'SHOW_MOVE';
export const UPDATE_PLAYER_ONE_DANGER = 'UPDATE_PLAYER_ONE_DANGER';
export const UPDATE_PLAYER_TWO_DANGER = 'UPDATE_PLAYER_TWO_DANGER';
export const P1_IN_CHECK = 'P1_IN_CHECK'
export const P2_IN_CHECK = 'P2_IN_CHECK';
export const REMOVE_1_FROM_CHECK = 'REMOVE_1_FROM_CHECK';
export const REMOVE_2_FROM_CHECK = 'REMOVE_2_FROM_CHECK';
export const P1_MOVED_ROOK_OR_KING = 'P1_MOVED_ROOK_OR_KING';
export const P2_MOVED_ROOK_OR_KING = 'P2_MOVED_ROOK_OR_KING';
export const PERFORM_CASTLE = 'PERFORM_CASTLE';
export const PIECES_OUT_OF_CHECK = 'PIECES_OUT_OF_CHECK';
export const P1_ALMOST_IN_CHECK = 'P1_ALMOST_IN_CHECK';
export const P2_ALMOST_IN_CHECK = 'P2_ALMOST_IN_CHECK';
export const PROMOTE_PAWN = 'PROMOTE_PAWN';


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

// Changes player turns
export const updateTurn = () => ({
    type: UPDATE_TURN
});

// Add to "fallen soldiers" list
export const addToFallen = (piece) => ({
    type: PIECE_TAKEN,
    payload: piece
});

// Add user names and colors
export const addUserInfo = (player1, player2, firstMove) => ({
    type: PLAYERS_ADDED,
    payload: {player1, player2, firstMove}
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

// If king is in a dangerIndex, it's in check
export const playerOneInCheck = () => ({
    type: P1_IN_CHECK
});

export const playerTwoInCheck = () => ({
    type: P2_IN_CHECK
});

// If moved from check, take out of check
export const removeOneFromCheck = () => ({
    type: REMOVE_1_FROM_CHECK
});

export const removeTwoFromCheck = () => ({
    type: REMOVE_2_FROM_CHECK
});

// If moved rook or king (can't castle anymore)
// player1
export const p1MovedRookOrKing = id => ({
    type: P1_MOVED_ROOK_OR_KING,
    payload: id
});
// player2
export const p2MovedRookOrKing = id => ({
    type: P2_MOVED_ROOK_OR_KING,
    payload: id
});

// Perform a castle
export const performCastle = (oldKingIndex, newKingIndex, oldRookIndex, newRookIndex) => ({
    type: PERFORM_CASTLE,
    payload: {
        oldKingIndex: oldKingIndex,
        newKingIndex: newKingIndex,
        oldRookIndex: oldRookIndex,
        newRookIndex: newRookIndex
    }
});

// Pieces that can take out of check
export const upDateOutOfCheck = array => ({
    type: PIECES_OUT_OF_CHECK,
    payload: array
});

// Update player one's almost in check path ("only 1 piece preventing check").
// Have this so you can't move this piece and put yourself in check.
export const updatePlayerOneAlmostInCheck = array => ({
    type: P1_ALMOST_IN_CHECK,
    payload: array
});

// Update player two's almost in check path
export const updatePlayerTwoAlmostInCheck = array => ({
    type: P2_ALMOST_IN_CHECK,
    payload: array
});

// Promotes a pawn to different piece
export const promotePawn = (piece, index) => ({
    type: PROMOTE_PAWN,
    payload: { piece: piece, index: index } 
});