let board = [
    {name:"rook", team:"computer"}, {name:"knight", team:"computer"}, {name:"bishop", team:"computer"}, 
    {name:"queen", team:"computer"}, {name:"king", team:"computer"}, {name:"bishop", team:"computer"}, 
    {name: "knight", team: "computer"}, {name:"rook", team:"computer"}, {name:"pawn", team:"computer"}, 
    {name:"pawn", team:"computer"}, {name:"pawn", team:"computer"}, {name:"pawn", team:"computer"}, 
    {name:"pawn", team:"computer"}, {name:"pawn", team:"computer"}, {name:"pawn", team:"computer"}, 
    {name:"pawn", team:"computer"},{name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"},
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"},{name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"},
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, 
    {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"empty"}, {name:"pawn", team:"player"}, 
    {name:"pawn", team:"player"}, {name:"pawn", team:"player"}, {name:"pawn", team:"player"}, 
    {name:"pawn", team:"player"}, {name:"pawn", team:"player"}, {name:"pawn", team:"player"}, 
    {name:"pawn", team:"player"}, {name:"rook", team:"player"}, {name:"knight", team:"player"}, 
    {name:"bishop", team:"player"}, {name:"queen", team:"player"},{name:"king", team:"player"}, 
    {name:"bishop", team:"player"}, {name:"knight", team:"player"}, {name:"rook", team:"player"}
];

const boardReducer = (state = board, action) => {
    switch (action.type) {
        case "PIECE_MOVED":
            return {
                ...state,
                // TODO - update where piece was moved
            }
        default:
            return state
    }
};

export default boardReducer;