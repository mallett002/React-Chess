import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Components:
import Board from '../components/Board';
import FallenSoldiers from '../components/FallenSoldiers';

// Renders the board, the fallen soldiers lists, and a link back to exit the game
class Game extends Component {
    render() {
        const { player1, player2, board } = this.props;
        
        return (
            <div>
                <Board player1={player1} player2={player2} board={board} />
                <FallenSoldiers user={player1} />
                <FallenSoldiers user={player2} />
                <Link exact='true' to='/'>Back</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    player1: state.player1,
    player2: state.player2,
    board: state.board
});

Game.propTypes = {
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Game);