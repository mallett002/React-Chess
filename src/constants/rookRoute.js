// ROOK GENERAL ROUTES
// Takes in the board, current coordinates, and next coordinates
//Should return true or false
const rookRoute = (board, currentCoords, nextCoords) => {
    // if y is same number, return true
    if (getXAndY(currentCoords)[1] === getXAndY(nextCoords)[1]) {
        // check if piece is in the way of destination

        return true;
    // if x is the same, return true also
    } else if (getXAndY(currentCoords)[0] === getXAndY(nextCoords)[0]){
        return true;
    } else {
        return false;
    }
};
