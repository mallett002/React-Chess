import React from 'react';
import { Link } from 'react-router-dom';

const CheckMate = ({ winner }) => (
    <div className='modal-bg'>
        <div className='modal-container'>
            <h1>CHECKMATE</h1>
            <h2>{winner} wins!</h2>
            <Link exact='true' to='/'><button>New Game</button></Link>
        </div>
    </div>
);

export default CheckMate;