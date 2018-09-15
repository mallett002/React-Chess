import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SetUpGame extends Component {
    render() {
        return (
            <div>
                <Link to="/game">Enter Game</Link>
            </div>
        )
    }
}

export default SetUpGame;