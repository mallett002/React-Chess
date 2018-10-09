import React from 'react';

const InCheckDisplay = user => {
    return <div className='in-check-display'>
        <p>{user.user} is in check!</p>
    </div>
};

export default InCheckDisplay;