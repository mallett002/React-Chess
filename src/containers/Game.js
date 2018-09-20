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
        const { player, computer, board } = this.props;

        return (
            <div>
                <Board computer={computer} player={player} board={board} />
                <p>The player is in check? {String(player.inCheck)}</p>
                <FallenSoldiers user={player} />
                <FallenSoldiers user={computer} />
                <Link exact='true' to='/'>Back</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    computer: state.computer,
    player: state.player,
    board: state.board
});

Game.propTypes = {
    computer: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired,
    board: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Game);