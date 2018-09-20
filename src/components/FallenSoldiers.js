import React from 'react';
import PropTypes from 'prop-types';
// Piece components
import King from './King';


// Displays a list of lost pieces for the user.
// User is the Redux store for the given user.
const FallenSoldiers = ({ user }) => {
    const { piecesOut } = user;
    console.log(piecesOut);
    return (
        <div className='fallen'>
            <ul>
                {piecesOut.map((piece, i) => {
                    return <li key={i}>
                        {piece.name === "king" && piece.team === "computer" && <King user={"black"} />}
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
