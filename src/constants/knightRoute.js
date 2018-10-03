import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const knightRoutes = (selectedPiece, board, stateSelected) => {
    let validIndices = [];
    let pieceIndices = [];
    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);

        // The general routes
        // 2 y's away and 1 x away Or 1 y away and 2 x's away
        if (Math.abs(fromCoords[1] - toCoords[1]) === 2 &&
            Math.abs(fromCoords[0] - toCoords[0]) === 1 ||
            Math.abs(fromCoords[0] - toCoords[0]) === 2 &&
            Math.abs(fromCoords[1] - toCoords[1]) === 1) {
            // if is empty place or an enemy piece put it in validIndics
            if (board[i].name !== "empty") {
                if (board[i].team !== selectedPiece.piece.team) {
                    validIndices.push(i);
                }
            } else if (board[i].name === "empty") {
                validIndices.push(i);
                
            // or if getting just the dangerIndices when no piece is selected:
            } else if (stateSelected === null) {
                validIndices.push(i);
            }
        }

    });
    return validIndices;
}