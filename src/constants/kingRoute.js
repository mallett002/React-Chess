import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const kingRoutes = (selectedPiece, board, stateSelected, playerOneDanger, playerTwoDanger) => {
    let validIndices = [];
    let pieceIndices = [];

    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);
        // The danger indices are going to be dangerous for the opposite team's king
        let dangerIndices = selectedPiece.piece.team === "player1" ? playerTwoDanger : playerOneDanger;

        // TODO- Be able to castle

        // if same x "same column"
        if (fromCoords[0] === toCoords[0] && Math.abs(fromCoords[1] - toCoords[1]) === 1 ||
            // if same row
            fromCoords[1] === toCoords[1] && Math.abs(fromCoords[0] - toCoords[0]) === 1 ||
            // diagonals one away
            Math.abs(fromCoords[1] - toCoords[1]) === 1 && Math.abs(fromCoords[0] - toCoords[0]) === 1
        ) {
            // if is empty place or an enemy piece, and i isn't a dangerIndex: put it in validIndics
            if (board[i].name !== "empty" && stateSelected !== null && !dangerIndices.includes(i)) {
                if (board[i].team !== selectedPiece.piece.team) {
                    validIndices.push(i);
                }
            } else if (board[i].name === "empty" && stateSelected !== null && !dangerIndices.includes(i)) {
                validIndices.push(i);
            // Get this king's dangerIndices 
            } else if (stateSelected === null) {
                validIndices.push(i);
            }
        }

    });

    return validIndices;
}