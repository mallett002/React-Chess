export const PIECE_SELECTED = 'PIECE_SELECTED';

// When a piece is selected
export const selectPiece = (piece) => ({
    type: PIECE_SELECTED,
    payload: piece
});