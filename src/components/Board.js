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
    upDateOutOfCheck
} from '../actions/actions';
import { isLight, makeCoords, getValidMoves, onlyOneOfEach, getPath } from '../constants/constants';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
        this.canCastle = this.canCastle.bind(this);
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
            let pathOfDanger;
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
                            pathOfDanger = getPath(kingIndex, index, dangerIndices, sourceName);
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
                    // get only validIndices that are in pathOfDanger or the source
                    for (let i of validIndices) {
                        if (pathOfDanger.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                } else {
                    // Otherwise it's a king. Get only validIndices out of pathOfDanger, or into the source
                    for (let i of validIndices) {
                        if (!pathOfDanger.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
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
                            pathOfDanger = getPath(kingIndex, index, dangerIndices, sourceName);
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
                    // get only validIndices that are in pathOfDanger or the source
                    for (let i of validIndices) {
                        if (pathOfDanger.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                } else {
                    // Otherwise it's a king. Get only validIndices out of pathOfDanger, or into the source
                    for (let i of validIndices) {
                        if (!pathOfDanger.includes(i) || i === sourceIndex) validOutOfCheck.push(i);
                    }
                }

                // Update state.validMoves with validOutOfCheck indices
                if (board.validMoves.length === 0 && validOutOfCheck.length !== 0) showMove(validOutOfCheck);


                // Otherwise, not in check, just show normal moves-------------------------------------------------------
            } else {
                // get the indices of the valid moves
                let validIndices = getValidMoves(
                    board.selected, board.layout, board.selected,
                    playerOneDanger, playerTwoDanger, playerOneCastle, playerTwoCastle
                );
                // Update the state.validMoves with the indices. 
                // Only do it if it's empty, and there are valid moves to make
                if (board.validMoves.length === 0 && validIndices.length !== 0) {
                    showMove(validIndices);
                }
            }
        }
        console.log("store's piecesOutOfCheck", board.piecesOutOfCheck)
    }

    canCastle(selectedPiece, index) {
        this.props.canCastle(selectedPiece, index);
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
                        castlePackage={castlePackage}
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
    upDateOutOfCheck
}
)(Board);