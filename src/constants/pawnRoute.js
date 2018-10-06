import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const pawnRoutes = (selectedPiece, board, stateSelected) => {
    // Indices with pieces in the path
    let pieceIndices = [];
    // for player1
    let piecesUp = [];
    let validUp = [];
    let validUpDiag = [];
    // for player2
    let piecesDown = [];
    let validDown = [];
    let validDownDiag = [];

    // look at each index to get valid moves for the selected pawn
    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);

        // Player1's pawns
        if (selectedPiece.piece.team === "player1") {
            // and if same column 
            if (fromCoords[0] === toCoords[0] && stateSelected !== null) {
                // if at starting point and i is 2 spaces in front
                if (fromCoords[1] === 6 && fromCoords[1] - toCoords[1] === 2) {
                    validUp.push(i);
                    // check for any pieces to filter validUp 
                    if (board[i].name !== "empty") {
                        piecesUp.push(i);
                    }
                }
                // if i is one space in front of selectedPiece
                else if (fromCoords[1] - toCoords[1] === 1) {
                    validUp.push(i);
                    // check for any pieces to filter validUp 
                    if (board[i].name !== "empty") {
                        piecesUp.push(i);
                    }
                }
            // up left or right diagonal w/ a piece from other team in it
            } else if (fromCoords[1] - toCoords[1] === 1
                && Math.abs(fromCoords[0] - toCoords[0]) === 1
                && board[i].name !== "empty"
                && board[i].team !== selectedPiece.piece.team
                && stateSelected !== null) {
                validUpDiag.push(i);
            }
            // if no piece is selected, get only the dangerIndices
            else if (fromCoords[1] - toCoords[1] === 1
                && Math.abs(fromCoords[0] - toCoords[0]) === 1
                && stateSelected === null) {
                validUpDiag.push(i);
            }

        // Otherwise, it's player2's pawn
        } else {
            // Handle all i's in same column
            if (fromCoords[0] === toCoords[0] && stateSelected !== null) {
                // if at starting point and i is 2 spaces in front
                if (fromCoords[1] === 1 && toCoords[1] - fromCoords[1] === 2) {
                    validDown.push(i);
                    // check for any pieces to filter validUp 
                    if (board[i].name !== "empty") {
                        piecesDown.push(i);
                    }
                }
                // if i is one space in front of selectedPiece
                else if (toCoords[1] - fromCoords[1] === 1) {
                    validDown.push(i);
                    // check for any pieces to filter validUp 
                    if (board[i].name !== "empty") {
                        piecesDown.push(i);
                    }
                }
                // down left or right diagonal w/ a piece from other team in it
            } else if (toCoords[1] - fromCoords[1] === 1
                && Math.abs(fromCoords[0] - toCoords[0]) === 1
                && board[i].name !== "empty"
                && board[i].team !== selectedPiece.piece.team 
                && stateSelected !== null) {
                validDownDiag.push(i);
            }
            // if no piece is selected, get only the dangerIndices
            else if (toCoords[1] - fromCoords[1] === 1
                && Math.abs(fromCoords[0] - toCoords[0]) === 1
                && stateSelected === null) {
                validDownDiag.push(i);
            }
        }

    });

    // If any piecesUp to filter the validMoves
    if (piecesUp.length > 0) {
        let firstPiece = Math.max(...piecesUp);
        // can move up until the firstPiece
        validUp = validUp.filter(i => i > firstPiece);
    }
    if (piecesDown.length > 0) {
        let firstPiece = Math.min(...piecesDown);
        // can move down until the firstPiece
        validDown = validDown.filter(i => i < firstPiece);
    }

    let validIndices = validUp.concat(validDown).concat(validUpDiag).concat(validDownDiag);

    return validIndices;
}