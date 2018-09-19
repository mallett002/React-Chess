export const PIECE_SELECTED = 'PIECE_SELECTED';
export const PIECE_MOVED = 'PIECE_MOVED';
export const DESELECT = 'DESELECT';

// When a piece is selected
export const selectPiece = (piece) => ({
    type: PIECE_SELECTED,
    payload: piece
});

// Deselect a selected piece
export const deselect = () => ({
    type: DESELECT
});

// Move a piece
// TODO- Make moveTo take in (from, to)
export const moveTo = (from, to) => ({
    type: PIECE_MOVED,
    payload: { from: from, to: to }
});