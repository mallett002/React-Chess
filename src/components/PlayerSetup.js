import React from 'react';
import PropTypes from 'prop-types';

const PlayerSetup = ({ user, id, color, updateUserName, handleColor }) => {
    return (
        <div>
            <label> {user}
                <input id={id} type="text" name="username" onChange={updateUserName} />
            </label>

            {user === "Player One" &&
                <label>Color
                    <select onChange={handleColor}>
                        <option value={null}>Select Color</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>    
                    </select>
                </label>
            }
        </div>
    )
}

export default PlayerSetup;