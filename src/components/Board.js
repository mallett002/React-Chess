import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import King from './King';

// Board will have width and height of 8 X 8
// Will be a set of divs with x, y coordinates
class Board extends Component {

    render() {
        const { board } = this.props;
        
        return (
            <div id='board'>{
                board.map((p, i) => {
                    return <Box key={i} piece={p} place={i} />
                })
            }</div>
        )
    }
}

Board.propTypes = {
    board: PropTypes.array.isRequired
};

export default Board;