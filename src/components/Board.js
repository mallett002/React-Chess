import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import King from './King';
import { connect } from 'react-redux';
import { moveTo } from '../actions/actions';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {
    constructor(props) {
        super(props);
        this.handleMove = this.handleMove.bind(this);
    }

    // Dispatches an action to move the piece
    handleMove(from, to) {
        console.log("handling move");
        const { moveTo } = this.props;
        moveTo(from, to);
    }

    render() {
        const { board, player1, player2 } = this.props;
        
        return (
            <div id='board'>{
                board.layout.map((p, i) => {
                    return <Box 
                        key={i} piece={p} place={i} board={board} 
                        handleMove={this.handleMove} user1={player1} user2={player2}
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

export default connect(null, { moveTo })(Board);