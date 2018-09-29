import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const bishopRoute = (selectedPiece, board) => {
    // validIndices will be combined validIndices in all directions, and returned at end
    let validIndices = [];
    // pieceIndices are the indices with pieces in them, that are in the path of the rook
    let pieceIndices = [];
    // valid indices in each direction. Will combine them to create validIndices, which will be returned
    let validUpLeft = [];
    let validDownLeft = [];
    let validUpRight = [];
    let validDownRight = [];
    // indices with pieces in each direction
    let piecesUpLeft = [];
    let piecesUpRight = [];
    let piecesDownLeft = [];
    let piecesDownRight = [];

    // First, look at each place in the board and build up the general paths of the bishop.
    // Also, get the indices of pieces that are in the path
    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);

        // All coordinates diagonal up towards right, down towards left
        // all i's with distance of any factor of 7 away from the selectedPiece.index
        if (i === selectedPiece.index - 7 * (Math.abs(fromCoords[1] - toCoords[1])) ||
            i === selectedPiece.index + 7 * (Math.abs(fromCoords[1] - toCoords[1]))) {

            // Get all indices in this path that have pieces
            if (board[i].name !== "empty" && board[i].id !== selectedPiece.piece.id) {
                pieceIndices.push(i);
            }

            // Looking up towards the right
            // get the pieces in this direction
            if (fromCoords[1] > toCoords[1] && pieceIndices.includes(i)) {
                piecesUpRight.push(i);
            }
            // get the validUpRight indices
            if (fromCoords[1] > toCoords[1]) {
                validUpRight.push(i);
            }

            // Looking down towards the left
            // get the pieces in this direction
            if (fromCoords[1] < toCoords[1] && pieceIndices.includes(i)) {
                piecesDownLeft.push(i);
            }
            // get the validDownLeft indices
            if (fromCoords[1] < toCoords[1]) {
                validDownLeft.push(i);
            }
        }

        // All coordinates diagonal up towards left, down towards right
        // all i's with distance of any factor of 9 away from the selectedPiece.index
        else if (i === selectedPiece.index - 9 * (Math.abs(fromCoords[1] - toCoords[1])) ||
            i === selectedPiece.index + 9 * (Math.abs(fromCoords[1] - toCoords[1]))) {

            // Get all indices in this path that have pieces
            if (board[i].name !== "empty" && board[i].id !== selectedPiece.piece.id) {
                pieceIndices.push(i);
            }

            // Looking up towards the left
            // Get the pieces in this direction
            if (fromCoords[1] > toCoords[1] && pieceIndices.includes(i)) {
                piecesUpLeft.push(i);
            }
            // Get the validUpLeft indices
            if (fromCoords[1] > toCoords[1]) {
                validUpLeft.push(i);
            }

            // Looking down towards the right
            // Get the pieces in this direction
            if (fromCoords[1] < toCoords[1] && pieceIndices.includes(i)) {
                piecesDownRight.push(i);
            }
            // Get the validDownRight indices
            if (fromCoords[1] < toCoords[1]) {
                validDownRight.push(i);
            }
        }
    });

    // Alter all of the validIndices based on pieces in the paths
    // Start variables for the first piece you might run into
    let pieceUpLeft;
    let pieceDownLeft;
    let pieceUpRight;
    let pieceDownRight;

    // If any pieces up to the left
    if (piecesUpLeft.length > 0) {
        // Get the first one you would run into from the selected piece
        pieceUpLeft = Math.max(...piecesUpLeft);
        // if it's on same team as selected piece
        if (selectedPiece.piece.team === board[pieceUpLeft].team) {
            // change validUpLeft to be all i's greater than pieceUpLeft
            validUpLeft = validUpLeft.filter(i => i > pieceUpLeft);
        } else {
            // Otherwise it's an enemy piece
            validUpLeft = validUpLeft.filter(i => i >= pieceUpLeft);
        }
    }

    // If any pieces up to the right
    if (piecesUpRight.length > 0) {
        // Get the first one you would run into from the selected piece
        pieceUpRight = Math.max(...piecesUpRight);
        // if it's on same team as selected piece
        if (selectedPiece.piece.team === board[pieceUpRight].team) {
            // change validUpRight to be all i's greater than pieceUpRight
            validUpRight = validUpRight.filter(i => i > pieceUpRight);
        } else {
            // Otherwise it's an enemy piece, so include it in the valid move
            validUpRight = validUpRight.filter(i => i >= pieceUpRight);
        }
    }

    // If any pieces down to the left
    if (piecesDownLeft.length > 0) {
        // Get the first one you would run into from the selected piece
        pieceDownLeft = Math.min(...piecesDownLeft);
        // if it's on same team as selected piece
        if (selectedPiece.piece.team === board[pieceDownLeft].team) {
            validDownLeft = validDownLeft.filter(i => i < pieceDownLeft);
        } else {
            // Otherwise it's an enemy piece, so include it in the valid move
            validDownLeft = validDownLeft.filter(i => i <= pieceDownLeft);
        }
    }

    // If any pieces down to the right
    if (piecesDownRight.length > 0) {
        // Get the first one you would run into from the selected piece
        pieceDownRight = Math.min(...piecesDownRight);
        // if it's on same team as selected piece
        if (selectedPiece.piece.team === board[pieceDownRight].team) {
            // change validDownRight to be all i's less than pieceDownLeft
            validDownRight = validDownRight.filter(i => i < pieceDownRight);
        } else {
            // Otherwise it's an enemy piece, so include it in the valid move
            validDownRight = validDownRight.filter(i => i <= pieceDownRight);
        }
    }
    // Glue all directions together to create validIndices
    validIndices = validUpLeft.concat(validUpRight).concat(validDownLeft).concat(validDownRight);
    // Remove selected piece's index from validIndices
    validIndices = validIndices.filter(i => i !== selectedPiece.index);

    return validIndices;
}