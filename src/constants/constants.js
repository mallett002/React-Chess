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

// Returns an array of indices where only 1 piece is preventing check
export const getPreventCheckPath = (layout, piece, pieceIndex) => {
    let preventCheckPath = [];
    let pieceCoords = makeCoords(pieceIndex);
    let kingIndex;
    let pathWithKing = [];
    let foundKing = false;
    let numberOfPieces = 0;

    // If piece is a rook, check horizontal and perpendicular
    if (piece.name === "rook") {
        let sameRow = [];
        let sameColumn = [];

        layout.forEach((item, index) => {
            let itemCoords = makeCoords(index);
            // All indices in same row as rook and opposing king is in the row
            if (pieceCoords[1] === itemCoords[1]) {
                sameRow.push(index);
            } else if (pieceCoords[0] === itemCoords[0]) {
                sameColumn.push(index);
            }
        });
        // If sameRow contains a king
        for (let i of sameRow) {
            // look at pieces in sameRow. If contains a king on opposing team of the rook, get the king's index
            if (layout[i].name === "king" && layout[i].team !== piece.team) {
                foundKing = true;
                kingIndex = i;
                // assign pathWithKing to be this path
                pathWithKing = sameRow;
            }
        }
        // If not in same row, look in sameColumn
        if (!foundKing) {
            for (let i of sameColumn) {
                if (layout[i].name === "king" && layout[i].team !== piece.team) {
                    foundKing = true;
                    kingIndex = i;
                    // assign pathWithKing to be this path
                    pathWithKing = sameColumn;
                }
            }
        }

        // else, if it's a bishop, check diagonals
    } else if (piece.name === "bishop") {
        let sameDiagPositive = []; // up to the right
        let sameDiagNegative = []; // up to the left

        layout.forEach((item, index) => {
            let itemCoords = makeCoords(index);
            // All indices in same diagonal up to the right as bishop
            if (Math.abs(pieceIndex - index) % 7 === 0) {
                sameDiagPositive.push(index);
            } else if (Math.abs(pieceIndex - index) % 9 === 0) {
                sameDiagNegative.push(index);
            }
        });
        // If sameDiagPositve contains a king
        for (let i of sameDiagPositive) {
            // look at pieces in sameDiagPositive. If contains a king on opposing team of the bishop, get the king's index
            if (layout[i].name === "king" && layout[i].team !== piece.team) {
                foundKing = true;
                kingIndex = i;
                // assign pathWithKing to be this path
                pathWithKing = sameDiagPositive;
            }
        }
        // If not in same sameDiagPositive, look in sameDiagNegative
        if (!foundKing) {
            for (let i of sameDiagNegative) {
                if (layout[i].name === "king" && layout[i].team !== piece.team) {
                    foundKing = true;
                    kingIndex = i;
                    // assign pathWithKing to be this path
                    pathWithKing = sameDiagNegative;
                }
            }
        }

        // else it's a queen, check in all directions
    } else {
        let sameRow = [];
        let sameColumn = [];
        let sameDiagPositive = []; // up to the right
        let sameDiagNegative = []; // up to the left

        layout.forEach((item, index) => {
            let itemCoords = makeCoords(index);
            // All indices in same diagonal up to the right as bishop
            if (Math.abs(pieceIndex - index) % 7 === 0) {
                sameDiagPositive.push(index);
            } else if (Math.abs(pieceIndex - index) % 9 === 0) {
                sameDiagNegative.push(index);
            } else if (pieceCoords[1] === itemCoords[1]) {
                sameRow.push(index);
            } else if (pieceCoords[0] === itemCoords[0]) {
                sameColumn.push(index);
            }
        });
        // If sameDiagPositve contains a king
        for (let i of sameDiagPositive) {
            // look at pieces in sameDiagPositive. If contains a king on opposing team of the bishop, get the king's index
            if (layout[i].name === "king" && layout[i].team !== piece.team) {
                foundKing = true;
                kingIndex = i;
                // assign pathWithKing to be this path
                pathWithKing = sameDiagPositive;
            }
        }
        // If not in same sameDiagPositive, look in sameDiagNegative
        if (!foundKing) {
            for (let i of sameDiagNegative) {
                if (layout[i].name === "king" && layout[i].team !== piece.team) {
                    foundKing = true;
                    kingIndex = i;
                    // assign pathWithKing to be this path
                    pathWithKing = sameDiagNegative;
                }
            }
        }
        // if not in sameDiagNegative, check in sameRow
        if (!foundKing) {
            for (let i of sameRow) {
                // look at pieces in sameRow. If contains a king on opposing team of the rook, get the king's index
                if (layout[i].name === "king" && layout[i].team !== piece.team) {
                    foundKing = true;
                    kingIndex = i;
                    // assign pathWithKing to be this path
                    pathWithKing = sameRow;
                }
            }
        }
        // if not in sameRow, check in sameColumn
        if (!foundKing) {
            for (let i of sameColumn) {
                if (layout[i].name === "king" && layout[i].team !== piece.team) {
                    foundKing = true;
                    kingIndex = i;
                    // assign pathWithKing to be this path
                    pathWithKing = sameColumn;
                }
            }
        }
    }

    // If a pathWithKing is found, count # of pieces between piece and king
    if (pathWithKing.length > 0) {

        // if king is to right or below attacker
        if (kingIndex > pieceIndex) {
            pathWithKing = pathWithKing.filter(i => i > pieceIndex && i < kingIndex);
            for (let i of pathWithKing) {
                // if empty or opposite team, keep going, else stop
                if (layout[i].name !== "empty" && layout[i].team !== piece.team) {
                    numberOfPieces++;
                    // Otherwise it's on same team, so stop
                } else if (layout[i].name !== "empty" && layout[i].team === piece.team) {
                    return [];
                }
            }
            // otherwise king is to the left or above attacker
        } else {
            pathWithKing = pathWithKing.filter(i => i > kingIndex && i < pieceIndex);
            for (let i of pathWithKing) {
                // if empty or opposite team, keep going, else stop
                if (layout[i].name !== "empty" && layout[i].team !== piece.team) {
                    numberOfPieces++;
                    // Otherwise it's on same team, so stop
                } else if (layout[i].name !== "empty" && layout[i].team === piece.team) {
                    return [];
                }
            }
        }
    }

    if (numberOfPieces === 1) {
        preventCheckPath = pathWithKing;
    }

    return preventCheckPath;
};