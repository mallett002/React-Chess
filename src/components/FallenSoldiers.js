import React from 'react';
import PropTypes from 'prop-types';
// Piece components
import King from './King';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';


// Displays a list of lost pieces for the user.
// User is the Redux store for the given user.
const FallenSoldiers = ({ user }) => {
    const { piecesOut } = user;
    return (
        <div className='fallen-list'>
            <p className='player'>{user.userName}</p>
            <ul>
                {piecesOut.map((piece, i) => {
                    return <li key={i}>
                        {piece.name === "king" && piece.team === "player2" && <King user={user} fallen='true' />}
                        {piece.name === "king" && piece.team === "player1" && <King user={user} fallen='true' />}
                        {piece.name === "queen" && piece.team === "player2" && <Queen user={user} fallen='true'/>}
                        {piece.name === "queen" && piece.team === "player1" && <Queen user={user} fallen='true' />}
                        {piece.name === "rook" && piece.team === "player2" && <Rook user={user} fallen='true' />}
                        {piece.name === "rook" && piece.team === "player1" && <Rook user={user}fallen='true'/>}
                        {piece.name === "bishop" && piece.team === "player2" && <Bishop user={user} fallen='true'/>}
                        {piece.name === "bishop" && piece.team === "player1" && <Bishop user={user} fallen='true'/>}
                        {piece.name === "knight" && piece.team === "player2" && <Knight user={user} fallen='true'/>}
                        {piece.name === "knight" && piece.team === "player1" && <Knight user={user} fallen='true'/>}
                        {piece.name === "pawn" && piece.team === "player2" && <Pawn user={user} fallen='true'/>}
                        {piece.name === "pawn" && piece.team === "player1" && <Pawn user={user} fallen='true'/>}
                    </li>
                })}
            </ul>
        </div>
    )
};

FallenSoldiers.propTypes = {
    user: PropTypes.object.isRequired
};

export default FallenSoldiers;
