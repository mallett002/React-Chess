import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const queenRoutes = (selectedPiece, board, stateSelected) => {
    // validIndices will be combined validIndices in all directions, and returned at end
    let validIndices = [];
    // pieceIndices are the indices with pieces in them, that are in the path
    let pieceIndices = [];
    // valid indices in each direction. Will combine them to create validIndices, which will be returned
    let validUp = [];
    let validDown = [];
    let validRight = [];
    let validLeft = [];
    let validUpLeft = [];
    let validDownLeft = [];
    let validUpRight = [];
    let validDownRight = [];
    // indices with pieces in each direction
    let piecesAbove = [];
    let piecesBelow = [];
    let piecesToRight = [];
    let piecesToLeft = [];
    let piecesUpLeft = [];
    let piecesUpRight = [];
    let piecesDownLeft = [];
    let piecesDownRight = [];

    // First, look at each place in the board and build up the general paths.
    // Also, get the indices of pieces that are in the path
    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);

        // All coordinates with same x "moving up and down"
        if (fromCoords[0] === toCoords[0]) {

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
        else if (fromCoords[1] === toCoords[1]) {

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
            if (fromCoords[0] > makeCoords(i)[0]) {
                validLeft.push(i);
            }
        }

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
    let pieceAbove;
    let pieceBelow;
    let pieceRight;
    let pieceLeft;
    let pieceUpLeft;
    let pieceDownLeft;
    let pieceUpRight;
    let pieceDownRight;

    // if there are any pieces above
    if (piecesAbove.length >= 1) {
        pieceAbove = Math.max(...piecesAbove); // first piece you run into
        // if same team, move up until before it (get all i's > pieceAbove)
        if (board[pieceAbove].team === selectedPiece.piece.team && stateSelected !== null) {
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
        if (board[pieceBelow].team === selectedPiece.piece.team && stateSelected !== null) {
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
        if (board[pieceRight].team === selectedPiece.piece.team && stateSelected !== null) {
            validRight = validRight.filter(i => i < pieceRight);
        } else {
            // enemy: get all i's <= pieceRight
            validRight = validRight.filter(i => i <= pieceRight);
        }
    }

    // if there are any pieces to the left
    if (piecesToLeft.length > 0) {
        pieceLeft = Math.max(...piecesToLeft);
        // if on same team
        if (board[pieceLeft].team === selectedPiece.piece.team && stateSelected !== null) {
            validLeft = validLeft.filter(i => i > pieceLeft);
        } else { // otherwise it's an enemy
            validLeft = validLeft.filter(i => i >= pieceLeft);
        }
    }

    // If any pieces up to the left
    if (piecesUpLeft.length > 0) {
        // Get the first one you would run into from the selected piece
        pieceUpLeft = Math.max(...piecesUpLeft);
        // if it's on same team as selected piece
        if (selectedPiece.piece.team === board[pieceUpLeft].team && stateSelected !== null) {
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
        if (selectedPiece.piece.team === board[pieceUpRight].team && stateSelected !== null) {
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
        if (selectedPiece.piece.team === board[pieceDownLeft].team && stateSelected !== null) {
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
        if (selectedPiece.piece.team === board[pieceDownRight].team && stateSelected !== null) {
            // change validDownRight to be all i's less than pieceDownLeft
            validDownRight = validDownRight.filter(i => i < pieceDownRight);
        } else {
            // Otherwise it's an enemy piece, so include it in the valid move
            validDownRight = validDownRight.filter(i => i <= pieceDownRight);
        }
    }

    // Combine all valid arrays to make validIndices
    validIndices = validUp.concat(validDown).concat(validRight).concat(validLeft)
        .concat(validUpLeft).concat(validUpRight).concat(validDownLeft).concat(validDownRight);

    // Then remove the index of the selected piece
    validIndices = validIndices.filter(i => i !== selectedPiece.index);
    return validIndices;
}