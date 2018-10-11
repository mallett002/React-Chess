import { makeCoords } from './constants';

// board is the board
// selectedPiece is the piece that is currently selected
export const kingRoutes = (selectedPiece, board, stateSelected, playerOneDanger,
    playerTwoDanger, playerOneCastle, playerTwoCastle) => {
    let validIndices = [];
    let pieceIndices = [];
    let castleIndices = [];

    board.forEach((box, i) => {
        // x, y of selectedPiece
        let fromCoords = makeCoords(selectedPiece.index);
        // x, y of current index
        let toCoords = makeCoords(i);
        // The danger indices are going to be dangerous for the opposite team's king
        let dangerIndices = selectedPiece.piece.team === "player1" ? playerTwoDanger : playerOneDanger;

        // If able to castle, put that index in validIndices also
        // Maybe pass an arg canCastle boolean, and only do this if true
        if (selectedPiece.piece.team === "player1" && toCoords[1] === 7 && board[i].name !== "empty") {
            castleIndices.push(i);

        } else if (selectedPiece.piece.team === "player2" && toCoords[1] === 0 && board[i].name !== "empty") {
            castleIndices.push(i);
        }

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

    let indicesRight = [];
    let indicesLeft = [];

    if (castleIndices.length > 0) {
        // loop over castleIndices
        castleIndices.forEach(index => {
            // look right
            if (index > selectedPiece.index) {
                indicesRight.push(index);
                // look left
            } else if (index < selectedPiece.index) {
                indicesLeft.push(index);
            }
        });

    }
    // Add castle index if can castle
    // Looking Right. If only a rook there
    if (indicesRight.length === 1 && board[indicesRight[0]].name === "rook") {
        // If it's player1 and can castle right, update that index in validIndices
        if (selectedPiece.piece.team === "player1" && playerOneCastle !== null) {
            if (playerOneCastle.castleRight) {
                validIndices = [...validIndices, selectedPiece.index + 2];
            }
        // If it's player2 and can castle right, update that index in validIndices
        } else if (selectedPiece.piece.team === "player2" && playerTwoCastle !== null) {
            if (playerTwoCastle.castleRight) {
                validIndices = [...validIndices, selectedPiece.index + 2];
            }
        }
    }
    // Looking Left. If only a rook there
    if (indicesLeft.length === 1 && board[indicesLeft[0]].name === "rook") {
        // If it's player1 and can castle left, update that index in validIndices
        if (selectedPiece.piece.team === "player1" && playerOneCastle !== null) {
            if (playerOneCastle.castleLeft) {
                validIndices = [...validIndices, selectedPiece.index - 3];
            }
        } else if (selectedPiece.piece.team === "player2" && playerTwoCastle !== null) {
            if (playerTwoCastle.castleLeft) {
                validIndices = [...validIndices, selectedPiece.index - 3];
            }
        }
    }

    return validIndices;
}

/* Casteling Notes 

Criteria to be met:
    -King and rook haven't moved yet. 
    -King isn't in check.
    -No pieces between king and rook
    -Doesn't cross over or end up on an index in check

Need to do:
    -[CHECK]keep track if the king and rook haven't moved (playerOneReducer). Once one has moved, put true
    -[CHECK]update validIndices of king to show castle space (one more square to right or left)
    -[CHECK]highlight the castle squares only if can castle
    - if king moves to that castling square, move the 2 pieces at same time
*/