import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Board from '../components/Board';

class Game extends Component {
    render() {
        const { player } = this.props;
        console.log(player.inCheck);
        return (
            <div>
                <Board />
                <p>The player is in check? {String(player.inCheck)}</p>
                <Link exact='true' to='/'>Back</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    computer: state.computer,
    player: state.player
});

Game.propTypes = {
    computer: PropTypes.object.isRequired,
    player: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Game);