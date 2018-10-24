import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import King from './King';
import { connect } from 'react-redux';
import {
    moveTo,
    showMove,
    updatePlayerOneDanger,
    updatePlayerTwoDanger,
    playerOneInCheck,
    playerTwoInCheck,
    removeOneFromCheck,
    removeTwoFromCheck,
    p1MovedRookOrKing,
    p2MovedRookOrKing,
    selectPiece,
    upDateOutOfCheck,
    updatePlayerOneAlmostInCheck,
    updatePlayerTwoAlmostInCheck
} from '../actions/actions';
import { isLight, makeCoords, getValidMoves, onlyOneOfEach, getPath, getPreventCheckPath } from '../constants/constants';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.canCastle = this.canCastle.bind(this);
        this.updateDanger = this.updateDanger.bind(this);
        this.updateAlmostInCheck = this.updateAlmostInCheck.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { board, player1, player2, showMove, castlePackage, upDateOutOfCheck } = this.props;
        let items = board.layout;
        let playerOneDanger = player1.dangerIndices;
        let playerTwoDanger = player2.dangerIndices;
        let playerOneCastle = castlePackage.playerOne;
        let playerTwoCastle = castlePackage.playerTwo;

        // If there is a selected piece
        if (board.selected !== null) {
            let team = board.selected.piece.team;
            let sourceName;
            let sourceIndex;
            let pathOfCheck;
            let kingIndex;
            let validOutOfCheck = [];

            // If in check, only show moves out of check 
            // Player1 if in check--------------------------------------------------------------------------------------
            if (team === "player1" && player1.inCheck) {

                // get the king's index:
                board.layout.forEach((item, index) => {
                    if (item.name === "king" && item.team === "player1") kingIndex = index;
                });

                // Loop over board, look at dangerIndices of player2
                board.layout.forEach((item, index) => {
                    // get dangerIndices for player2
                    if (item.name !== "empty" && item.team === "player2") {
                        // Get the dangerIndices for the current piece
                        let dangerIndices = getValidMoves({
                            piece: item,
                            index: index
                        }, board.layout, null);

                        // Info about the source of check
                        if (dangerIndices.includes(kingIndex)) {
                            sourceName = board.layout[index].name;
                            sourceIndex = index;
                            pathOfCheck = getPath(kingIndex, index, dangerIndices, sourceName);
                        };
                    }
                });

                // Filter selected piece's validIndices to show only moves out of check
                let validIndices = getValidMoves(
                    board.selected, board.layout, board.selected,
                    playerOneDanger, playerTwoDanger, playerOneCastle, playerTwoCastle
                );

                // If it's not a king
                if (board.selected.piece.name !== "king") {
                    // get only validIndices that are in pathOfCheck or the source
                    for (let i of validIndices) {
                        if (pathOfCheck.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                } else {
                    // Otherwise it's a king. Get only validIndices out of pathOfCheck, or into the source
                    for (let i of validIndices) {
                        if (!pathOfCheck.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                }

                // Update state.validMoves with validOutOfCheck indices
                if (board.validMoves.length === 0 && validOutOfCheck.length !== 0) showMove(validOutOfCheck);


                // If player2 selected and in check-----------------------------------------------------------------
            } else if (team === "player2" && player2.inCheck) {
                // get the king's index:
                board.layout.forEach((item, index) => {
                    if (item.name === "king" && item.team === "player2") kingIndex = index;
                });

                // Loop over board, look at dangerIndices of player1
                board.layout.forEach((item, index) => {
                    // get dangerIndices for player1
                    if (item.name !== "empty" && item.team === "player1") {
                        // Get the dangerIndices for the current piece
                        let dangerIndices = getValidMoves({
                            piece: item,
                            index: index
                        }, board.layout, null);

                        // Info about the source of check
                        if (dangerIndices.includes(kingIndex)) {
                            sourceName = board.layout[index].name;
                            sourceIndex = index;
                            pathOfCheck = getPath(kingIndex, index, dangerIndices, sourceName);
                        };
                    }
                });

                // Filter selected pieces validIndices to show only moves out of check
                let validIndices = getValidMoves(
                    board.selected, board.layout, board.selected,
                    playerOneDanger, playerTwoDanger, playerOneCastle, playerTwoCastle
                );

                // If it's not a king
                if (board.selected.piece.name !== "king") {
                    // get only validIndices that are in pathOfCheck or the source
                    for (let i of validIndices) {
                        if (pathOfCheck.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                } else {
                    // Otherwise it's a king. Get only validIndices out of pathOfCheck, or into the source
                    for (let i of validIndices) {
                        if (!pathOfCheck.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                }

                // Update state.validMoves with validOutOfCheck indices
                if (board.validMoves.length === 0 && validOutOfCheck.length !== 0) showMove(validOutOfCheck);


                // Otherwise, not in check, ------------------------------------------------------------------------
            } else {
                // player1's piece, and not in check
                if (team === "player1" && !player1.inCheck) {
                    let selectedIndex = board.selected.index;
                    // get the indices of the valid moves
                    let validIndices = getValidMoves(
                        board.selected, board.layout, board.selected,
                        playerOneDanger, playerTwoDanger, playerOneCastle, playerTwoCastle
                    );
                    // If selectedPiece is only piece in between attacker and the king
                    // if selectedPiece's index is in player2.almostInCheckPath, only show moves still in the path
                    if (player2.almostInCheckPath.includes(selectedIndex)) {
                        // Filter validIndices to show only moves inside of player2.almostInCheckPath as to not put in check
                        validIndices = validIndices.filter(i => player2.almostInCheckPath.includes(i));
                        // Update the state.validMoves with the indices. 
                        if (board.validMoves.length === 0 && validIndices.length !== 0) {
                            showMove(validIndices);
                        }
                        // Otherwise, just show normal moves
                    } else {
                        // Update the state.validMoves with the indices. 
                        if (board.validMoves.length === 0 && validIndices.length !== 0) {
                            showMove(validIndices);
                        }
                    }
                }
                // Otherwise, player 2's piece and not in check 
                else if (team === "player2" && !player2.inCheck) {
                    let selectedIndex = board.selected.index;
                    // get the indices of the valid moves
                    let validIndices = getValidMoves(
                        board.selected, board.layout, board.selected,
                        playerOneDanger, playerTwoDanger, playerOneCastle, playerTwoCastle
                    );
                    // If selectedPiece is only piece in between attacker and the king
                    // Only show moves still in the path
                    if (player1.almostInCheckPath.includes(selectedIndex)) {
                        // Filter validIndices to show only moves still in the path
                        validIndices = validIndices.filter(i => player1.almostInCheckPath.includes(i));
                        // update store's validMoves with validIndices
                        if (board.validMoves.length === 0 && validIndices.length !== 0) {
                            showMove(validIndices);
                        }
                        // Otherwise, just show unfiltered validIndices
                    } else {
                        if (board.validMoves.length === 0 && validIndices.length !== 0) {
                            showMove(validIndices);
                        }
                    }
                }
            }
        } 
    }

    updateDanger() {
        const { board, updatePlayerOneDanger, updatePlayerTwoDanger } = this.props;
        let playerOneDanger = [];
        let playerTwoDanger = [];
        // Look at the whole board, get all valid move indices for both teams. Update redux store with them.
        // Put them in either playerOneDanger or playerTwoDanger
        board.layout.forEach((item, index) => {
            if (item.name !== "empty") {
                // call getValidMoves and push them up into playerOneDanger array.
                let dangerIndices = getValidMoves({
                    piece: item,
                    index: index
                }, board.layout, null);

                if (item.team === "player1") playerOneDanger = [...playerOneDanger, ...dangerIndices];
                else playerTwoDanger = [...playerTwoDanger, ...dangerIndices];
            }
        });
        playerOneDanger = [...onlyOneOfEach(playerOneDanger)];
        playerTwoDanger = [...onlyOneOfEach(playerTwoDanger)];

        // Then update the Redux store with the danger indices for both teams.
        updatePlayerOneDanger(playerOneDanger);
        updatePlayerTwoDanger(playerTwoDanger);
    }

    canCastle(selectedPiece, index) {
        this.props.canCastle(selectedPiece, index);
    }

    // Searches board and checks if any pieces are preventing a king from being in check
    updateAlmostInCheck() {
        const { board, player1, player2, updatePlayerOneAlmostInCheck, updatePlayerTwoAlmostInCheck } = this.props;
        let p1PreventCheckPath = [];
        let p2PreventCheckPath = [];
        // Look at p2's paths of danger. (could be check if player 1 moves out of path)
        // Get the piece's path without stopping if meets a piece of opposite team 
        // Stops at the opposing king, and counts pieces in between. If only has 1, it's a preventCheckPath.
        // Just rooks, bishops, and queens
        board.layout.forEach((item, index) => {
            if (item.name !== "empty" && item.team === "player1") {
                // Only look at the pieces with longer paths
                if (item.name === "rook" || item.name === "queen" || item.name === "bishop") {
                    // get this piece's path, if has any preventCheckPaths
                    let piecePath = getPreventCheckPath(board.layout, item, index);
                    if (piecePath.length > 0) p1PreventCheckPath = p1PreventCheckPath.concat(piecePath);
                }
            } else if (item.name !== "empty" && item.team === "player2") {
                // Only look at the pieces with longer paths
                if (item.name === "rook" || item.name === "queen" || item.name === "bishop") {
                    // get this piece's path, if has any preventCheckPaths
                    let piecePath = getPreventCheckPath(board.layout, item, index);
                    if (piecePath.length > 0) p2PreventCheckPath = p2PreventCheckPath.concat(piecePath);
                }
            }
        });
        // update store's almostInCheck only if it changes
        if (p1PreventCheckPath !== player1.almostInCheckPath) updatePlayerOneAlmostInCheck(p1PreventCheckPath);
        if (p2PreventCheckPath !== player2.almostInCheckPath) updatePlayerTwoAlmostInCheck(p2PreventCheckPath);
    }


    // Dispatches actions to handle the move
    handleMove(from, to) {
        const {
            board, player1, player2, moveTo,
            updatePlayerOneDanger, updatePlayerTwoDanger, playerOneInCheck, playerTwoInCheck,
            removeOneFromCheck, removeTwoFromCheck, p1MovedRookOrKing, p2MovedRookOrKing
        } = this.props;

        // Update player's Redux store if rook or king moves (to know if player can castle or not)
        if (board.layout[from].name === "king" || board.layout[from].name === "rook") {
            let team = board.layout[from].team;
            let id = board.layout[from].id;
            // update state with info
            if (team === "player1") p1MovedRookOrKing(id);
            else p2MovedRookOrKing(id);
        }

        // move the piece 
        moveTo(from, to);

        // Update dangerIndices for both teams every time after a piece is moved
        let playerOneDanger = [];
        let playerTwoDanger = [];
        // Look at the whole board, get all valid move indices for both teams. Update redux store with them.
        // Put them in either playerOneDanger or playerTwoDanger
        board.layout.forEach((item, index) => {
            if (item.name !== "empty") {
                // call getValidMoves and push them up into playerOneDanger array.
                let dangerIndices = getValidMoves({
                    piece: item,
                    index: index
                }, board.layout, null);

                if (item.team === "player1") playerOneDanger = [...playerOneDanger, ...dangerIndices];
                else playerTwoDanger = [...playerTwoDanger, ...dangerIndices];
            }
        });
        playerOneDanger = [...onlyOneOfEach(playerOneDanger)];
        playerTwoDanger = [...onlyOneOfEach(playerTwoDanger)];

        // Then update the Redux store with the danger indices for both teams.
        updatePlayerOneDanger(playerOneDanger);
        updatePlayerTwoDanger(playerTwoDanger);

        // Check if a king is in check
        board.layout.forEach((box, i) => {
            // get the indices of the kings
            if (board.layout[i].name === "king") {
                // Check player1
                if (board.layout[i].team === "player1") {
                    // check if the index is in the other team's dangerIndices & not currently in check
                    if (playerTwoDanger.includes(i) && !player1.inCheck) {
                        playerOneInCheck();
                        // take it out of check if not in danger anymore
                    } else if (!playerTwoDanger.includes(i) && player1.inCheck) {
                        removeOneFromCheck();
                    }
                }
                // Check player2
                else {
                    // check if the index is in the other team's dangerIndices
                    if (playerOneDanger.includes(i) && !player2.inCheck) {
                        playerTwoInCheck();
                        // if not in danger anymore, remove from check
                    } else if (!playerOneDanger.includes(i) && player2.inCheck) {
                        removeTwoFromCheck();
                    }
                }
            }
        });

        // check if any pieces are preventing a king from being in check
        this.updateAlmostInCheck();

        // check if a pawn has made it to the end of the board
        this.props.canPromotePawn();
    }

    render() {
        const { board, player1, player2, castlePackage } = this.props;

        return (
            <div id='board'>{
                board.layout.map((p, i) => {
                    return <Box coords={makeCoords(i)}
                        key={i} piece={p} index={i}
                        board={board} handleMove={this.handleMove}
                        player1={player1} player2={player2} canCastle={this.canCastle}
                        castlePackage={castlePackage} updateDanger={this.updateDanger}
                        updateAlmostInCheck={this.updateAlmostInCheck}
                    />
                })
            }</div>
        )
    }
}

Board.propTypes = {
    board: PropTypes.object.isRequired,
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired
};

export default connect(null, {
    moveTo,
    showMove,
    updatePlayerOneDanger,
    updatePlayerTwoDanger,
    playerOneInCheck,
    playerTwoInCheck,
    removeOneFromCheck,
    removeTwoFromCheck,
    p1MovedRookOrKing,
    p2MovedRookOrKing,
    upDateOutOfCheck,
    updatePlayerOneAlmostInCheck,
    updatePlayerTwoAlmostInCheck
}
)(Board);