import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import King from './King';
import { connect } from 'react-redux';
import { moveTo, showMove } from '../actions/actions';
import { isLight, makeCoords, getValidMoves } from '../constants/constants';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
    }

    componentDidUpdate() {
        const { board, showMove } = this.props;

        // If there is a selected piece
        if (board.selected !== null) {
            // get the indices of the valid moves
            let validIndices = getValidMoves(board.selected, board.layout);
            // Update the state.validMoves with the indices. Only do it once, if it's empty
            if (board.validMoves.length === 0) {
                showMove(validIndices);
            }
        }
    }

    // Dispatches an action to move the piece
    handleMove(from, to) {
        const { moveTo } = this.props;
        moveTo(from, to);
    }

    render() {
        const { board, player1, player2 } = this.props;
        console.log("state.validMoves:", board.validMoves);
        return (
            <div id='board'>{
                board.layout.map((p, i) => {
                    return <Box coords={makeCoords(i)}
                        key={i} piece={p} index={i}
                        board={board} handleMove={this.handleMove}
                        player1={player1} player2={player2}
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

export default connect(null, { moveTo, showMove })(Board);