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

// board.layout is the board
// fromContent is index of selected piece
// to is index of destination
const rookMoves = (selectedPiece, board) => {
    let indices = [];
    // Look at each place on the board to see if the rook can get there
    board.forEach((box, i) => {
        let fromCoords = makeCoords(selectedPiece.index); // x, y of selectedPiece
        let toCoords = makeCoords(i); // x, y of current index
        if (fromCoords[0] === toCoords[0]) indices.push(i);
        else if (fromCoords[1] === toCoords[1] && !indices.includes(i)) indices.push(i);
    });
    return indices;
}

// isValid returns array of indices that the piece can move to
// board is state.board.layout
// selectedPiece: state.board.selected
export const getValidMoves = (selectedPiece, board) => {
    // Call corresponding function based on type of piece
    if (selectedPiece.piece.name === "rook") return rookMoves(selectedPiece, board);
};




// Moving up and down (same x)
/*if (fromCoords[0] === toCoords[0]) {
    // if a piece in the way of destination: false
    board.layout.forEach((item, i) => {
        // get same x from the board
        if (makeCoords(i)[0] === fromCoords[0]) {
            // Moving up on the board
            if (makeCoords(i)[1] >= toCoords[1]) {
                // if that index has a piece in it, return false
                if (board.layout[i].name !== "empty") return false
                else return true;
                // Moving down on the board
            } else if (makeCoords(i)[1] <= toCoords[1]) {
                // if that index has a piece in it, return false
                if (board.layout[i].name !== "empty") return false
                else return true;
            }
        }
    });
    // Moving side to side (same y)
} else if (fromCoords[1] === toCoords[1]) {
    // if a piece in the way of destination: false
    board.layout.forEach((item, i) => {
        // filter out same y from the board
        if (makeCoords(i)[1] === fromCoords[1]) {
            // moving left to right: x will increase
            if (makeCoords(i)[0] > fromCoords[0] && makeCoords(i)[0] < toCoords[i]) {
                if (board.layout[i].name !== "empty") return false;
                else return true;
            }
            // moving right to left
            if (makeCoords(i)[0] < fromCoords[0] && makeCoords(i)[0] > toCoords[i]) {
                if (board.layout[i].name !== "empty") return false;
                else return true;
            }
        }
    });
}*/