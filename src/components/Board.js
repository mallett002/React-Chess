import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import King from './King';
import { connect } from 'react-redux';
import { moveTo, showMove, updatePlayerOneDanger, updatePlayerTwoDanger } from '../actions/actions';
import { isLight, makeCoords, getValidMoves, onlyOneOfEach } from '../constants/constants';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // last selected piece will be saved here
            lastSelected: { piece: {} }
        };

        this.handleMove = this.handleMove.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
    }

    updateSelected(selected) {
        this.setState({
            lastSelected: selected
        });
    }

    componentDidUpdate() {
        const { board, player1, player2, showMove } = this.props;

        if (board.selected === null) {
            console.log("player1.dangerIndices:", player1.dangerIndices);
            console.log("player2.dangerIndices:", player2.dangerIndices);
        }
        // If there is a selected piece
        if (board.selected !== null) {
            // get the indices of the valid moves
            let validIndices = getValidMoves(board.selected, board.layout, board.selected);
            // Update the state.validMoves with the indices. 
            // Only do it if it's empty, and there are valid moves to make
            if (board.validMoves.length === 0 && validIndices.length !== 0) {
                showMove(validIndices);
            }
        }
    }

    // Dispatches an action to move the piece
    handleMove(from, to) {
        const { board, player1, player2, moveTo, updatePlayerOneDanger, updatePlayerTwoDanger } = this.props;
        const { lastSelected } = this.state;

        // move the piece 
        moveTo(from, to);

        // Update the danger indices for both teams, every time after a piece is moved
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

    render() {
        const { board, player1, player2 } = this.props;


        return (
            <div id='board'>{
                board.layout.map((p, i) => {
                    return <Box coords={makeCoords(i)}
                        key={i} piece={p} index={i}
                        board={board} handleMove={this.handleMove}
                        player1={player1} player2={player2}
                        updateSelected={this.updateSelected}
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

export default connect(null, { moveTo, showMove, updatePlayerOneDanger, updatePlayerTwoDanger })(Board);