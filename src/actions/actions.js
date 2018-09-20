export const PIECE_SELECTED = 'PIECE_SELECTED';
export const PIECE_MOVED = 'PIECE_MOVED';
export const DESELECT = 'DESELECT';
export const PIECE_TAKEN = 'PIECE_TAKEN';

// When a piece is selected
export const selectPiece = (piece, place) => ({
    type: PIECE_SELECTED,
    payload: {piece: piece, index: place}
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