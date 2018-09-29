import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const rookMoves = (selectedPiece, board) => {
    // validIndices will be combined validIndices in all directions, and returned at end
    let validIndices = [];
    // pieceIndices are the indices with pieces in them, that are in the path of the rook
    let pieceIndices = [];
    // valid indices in each direction. Will combine them to create validIndices, which will be returned
    let validUp = [];
    let validDown = [];
    let validRight = [];
    let validLeft = [];
    // indices with pieces in each direction
    let piecesAbove = [];
    let piecesBelow = [];
    let piecesToRight = [];
    let piecesToLeft = [];

    // First, look at each place in the board and build up the general paths of the rook.
    // Also, get the indices of pieces that are in the path
    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);

        // All coordinates with same x "moving up and down"
        if (fromCoords[0] === toCoords[0]) {
            validIndices.push(i);
            // Remove the index of the selectedPiece
            validIndices = validIndices.filter(index => index !== selectedPiece.index);

            // Get indices with pieces going up and down
            if (board[i].name !== "empty" && board[i].id !== selectedPiece.piece.id) {
                pieceIndices.push(i);
            }

            // Looking up at the pieces
            if (fromCoords[1] > makeCoords(i)[1] && pieceIndices.includes(i)) {
                piecesAbove.push(i);
            } // Get the indices looking up
            if (fromCoords[1] > makeCoords(i)[1]) {
                validUp.push(i);
            }

            // Looking below at the pieces 
            if (fromCoords[1] < makeCoords(i)[1] && pieceIndices.includes(i)) {
                piecesBelow.push(i);
            } // Get the indices looking down
            if (fromCoords[1] < makeCoords(i)[1]) {
                validDown.push(i);
            }
        }

        // All coordinates with same y "moving side to side"
        else if (fromCoords[1] === toCoords[1] && !validIndices.includes(i)) {
            validIndices.push(i);

            // Get indices with pieces in same row
            if (board[i].name !== "empty" && board[i].id !== selectedPiece.piece.id) {
                pieceIndices.push(i);
            }

            // Looking to the right for pieces
            if (fromCoords[0] < makeCoords(i)[0] && pieceIndices.includes(i)) {
                piecesToRight.push(i);
            } // Get the indices looking right
            if (fromCoords[0] < makeCoords(i)[0]) {
                validRight.push(i);
            }

            // Looking to the left for pieces
            if (fromCoords[0] > makeCoords(i)[0] && pieceIndices.includes(i)) {
                piecesToLeft.push(i);
            } // Get the indices looking left
            if (fromCoords[0] > makeCoords(1)[0]) {
                validLeft.push(i);
            }
        }
    });

    // Alter all of the validIndices based on pieces in the paths
    // Start variables for the first piece you might run into
    let pieceAbove;
    let pieceBelow;
    let pieceRight;
    let pieceLeft;
    // if there are any pieces above
    if (piecesAbove.length >= 1) {
        pieceAbove = Math.max(...piecesAbove); // first piece you run into
        // if same team, move up until before it (get all i's > pieceAbove)
        if (board[pieceAbove].team === selectedPiece.piece.team) {
            validUp = validUp.filter(i => i > pieceAbove);
        } else {
            // if it's an enemy, move up until that piece (keep all indices greater than or = to it)
            validUp = validUp.filter(i => i >= pieceAbove);
        }
    }

    // if there are any pieces below
    if (piecesBelow.length > 0) {
        pieceBelow = Math.min(...piecesBelow);
        // if same team, able to move down until before it (get all i's < pieceBelow)
        if (board[pieceBelow].team === selectedPiece.piece.team) {
            validDown = validDown.filter(i => i < pieceBelow);
        } else {
            // otherwise it's an enemy. Keep all i's <= pieceBelow
            validDown = validDown.filter(i => i <= pieceBelow);
        }
    }

    // if there are any pieces to the right
    if (piecesToRight.length > 0) {
        pieceRight = Math.min(...piecesToRight); // first one we run into is the smallest
        // if same team, move right until index just before that one (get i < pieceRight)
        if (board[pieceRight].team === selectedPiece.piece.team) {
            validRight = validRight.filter(i => i < pieceRight);
        } else {
            // enemy: get all i's <= pieceRight
            validRight = validRight.filter(i => i <= pieceRight);
        }
    }

    // if there are any pieces to the left
    if (piecesToLeft.length > 0) {
        pieceLeft = Math.max(...piecesToLeft);
        if (board[pieceLeft].team === selectedPiece.piece.team) {
            validLeft = validLeft.filter(i => i > pieceLeft);
        } else {
            validLeft = validLeft.filter(i => i >= pieceLeft);
        }
    }

    // Combine all valid arrays to make validIndices
    validIndices = validUp.concat(validDown).concat(validRight).concat(validLeft);
    // Then remove the index of the selected piece
    validIndices = validIndices.filter(i => i !== selectedPiece.index);
    return validIndices;
}