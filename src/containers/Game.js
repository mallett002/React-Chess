import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Board from '../components/Board';

class Game extends Component {
    render() {
        const { player, computer, board } = this.props;
        console.log(player.selected);
        return (
            <div>
                <Board computer={computer} player={player} board={board} />
                <p>The player is in check? {String(player.inCheck)}</p>
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
    board: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Game);