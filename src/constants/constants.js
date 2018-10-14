import { rookRoutes } from './rookRoute';
import { bishopRoutes } from './bishopRoute';
import { queenRoutes } from './queenRoute';
import { knightRoutes } from './knightRoute';
import { kingRoutes } from './kingRoute';
import { pawnRoutes } from './pawnRoute';

export const isLight = (n) => {
    if (n <= 7 ||
        n > 15 && n < 24 ||
        n > 31 && n < 40 ||
        n > 47 && n < 56) {
        if (isEven(n)) return true;
    }
    else if (n > 7) {
        if (!isEven(n)) return true;
    }
};

export const isEven = (n) => {
    if (n % 2 === 0) return true;
    else return false;
};

export const findIndex = (n, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === n) return i;
    }
};

export const makeCoords = index => {
    let coords = [];
    let x = 0;
    let y = 0;
    if (index < 8) {
        y = 0;
        x = index;
    } else if (index >= 8 && index < 16) {
        y = 1;
        x = index - 8;
    } else if (index >= 16 && index < 24) {
        y = 2;
        x = index - 16;
    } else if (index >= 24 && index < 32) {
        y = 3;
        x = index - 24;
    } else if (index >= 32 && index < 40) {
        y = 4;
        x = index - 32;
    } else if (index >= 40 && index < 48) {
        y = 5;
        x = index - 40;
    } else if (index >= 48 && index < 56) {
        y = 6;
        x = index - 48;
    } else {
        y = 7;
        x = index - 56;
    }
    coords.push(x);
    coords.push(y);
    return coords;
};

// getValidMoves returns array of indices that the piece can move to
// board is state.board.layout
// selectedPiece: state.board.selected
export const getValidMoves = (selectedPiece, board, stateSelected,
    playerOneDanger = [], playerTwoDanger = [], playerOneCastle = null, playerTwoCastle = null) => {

    const piece = selectedPiece.piece.name;

    // Call corresponding function based on type of piece
    if (piece === "rook") return rookRoutes(selectedPiece, board, stateSelected);
    else if (piece === "bishop") return bishopRoutes(selectedPiece, board, stateSelected);
    else if (piece === "queen") return queenRoutes(selectedPiece, board, stateSelected);
    else if (piece === "knight") return knightRoutes(selectedPiece, board, stateSelected);
    else if (piece === "king") return kingRoutes(
        selectedPiece, board, stateSelected, playerOneDanger, playerTwoDanger, playerOneCastle, playerTwoCastle);
    else if (piece === "pawn") return pawnRoutes(selectedPiece, board, stateSelected);
};

export const onlyOneOfEach = array => {
    let oneOfEach = [];
    for (let item of array) {
        if (!oneOfEach.includes(item)) {
            oneOfEach.push(item);
        }
    }
    return oneOfEach;
};

// returns the user that is in check, or false
export const isInCheck = (player1, player2) => {
    if (player1.inCheck) return player1.userName;
    else if (player2.inCheck) return player2.userName;
    else return false;
};

// Get's the pieces path of danger to the opposing king
export const getPath = (kingIndex, attackerIndex, dangerIndices, sourceName) => {
    let path = [];
    let kingCoords = makeCoords(kingIndex);
    let attackerCoords = makeCoords(attackerIndex);
    // Knight doesn't have a path, bc it jumps
    if (sourceName === "knight") {
        return path;
        // All other pieces have a path
    } else {
        // If king is same column as attacker
        if (kingCoords[0] === attackerCoords[0]) {
            // Loop over dangerIndices
            for (let index of dangerIndices) {
                // only get dangerIndices in same column as king
                if (makeCoords(index)[0] === kingCoords[0]) {
                    // If king is below the attacker
                    if (index < kingIndex && index > attackerIndex) path.push(index);
                    // otherwise it's above
                    else if (index > kingIndex && index < attackerIndex) path.push(index);
                }
            }
            // If king is in same row as the attacker
        } else if (kingCoords[1] === attackerCoords[1]) {
            // Loop over dangerIndices
            for (let index of dangerIndices) {
                // Only get dangerIndices in same row as king
                if (makeCoords(index)[1] === kingCoords[1]) {
                    // If attacker is to the right of the king
                    if (index > kingIndex && index < attackerIndex) path.push(index);
                    // to the left of the king
                    else if (index < kingIndex && index > attackerIndex) path.push(index);
                }
            }
            // If king is in same diagonal up to the right as the attacker
        } else if (Math.abs(kingIndex - attackerIndex) % 7 === 0) {
            // Loop over dangerIndices
            for (let index of dangerIndices) {
                // Only get dangerIndices in same diagonal as the king
                if (Math.abs(index - kingIndex) % 7 === 0) {
                    // If attacker is up to the right of the king
                    if (index < kingIndex && index > attackerIndex) path.push(index);
                    // If the attacker is down to the left of the king
                    else if (index > kingIndex && index < attackerIndex) path.push(index);
                }
            }
            // If king is in same diagonal down to the right as the attacker
        } else if (Math.abs(kingIndex - attackerIndex) % 9 === 0) {
            // Loop over dangerIndices
            for (let index of dangerIndices) {
                // Get only dangerIndices in same diagonal as the king
                if (Math.abs(index - kingIndex) % 9 === 0) {
                    // If attacker up to the left of the king
                    if (index < kingIndex && index > attackerIndex) path.push(index);
                    // If attacker down to the right of the king 
                    else if (index > kingIndex && index < attackerIndex) path.push(index);
                }
            }
        }
    }
    return path;
}