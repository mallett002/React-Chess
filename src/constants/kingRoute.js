import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const kingRoutes = (selectedPiece, board) => {
    let validIndices = [];
    let pieceIndices = [];
    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);

        // The general routes
        // TODO- Can't move to an index that a piece can kill on next move
        //      TODO- Create state.inCheckIndices

        // if same x "same column"
        if (fromCoords[0] === toCoords[0] && Math.abs(fromCoords[1] - toCoords[1]) === 1 ||
            // if same row
            fromCoords[1] === toCoords[1] && Math.abs(fromCoords[0] - toCoords[0]) === 1 ||
            // diagonals one away
            Math.abs(fromCoords[1] - toCoords[1]) === 1 && Math.abs(fromCoords[0] - toCoords[0]) === 1
        ) {
            // if is empty place or an enemy piece put it in validIndics
            if (board[i].name !== "empty") {
                if (board[i].team !== selectedPiece.piece.team) {
                    validIndices.push(i);
                }
            } else if (board[i].name === "empty") {
                validIndices.push(i);
            }
        }

    });
    return validIndices;
}