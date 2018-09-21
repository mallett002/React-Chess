import React, { Component } from 'react';

class Knight extends Component {

    render() {
        const { user } = this.props;
        return (
            user.color === "black" 
                ? <p className="piece black">{String.fromCharCode(9822)}</p>
                : <p className="piece white">{String.fromCharCode(9816)}</p>
        )
    }
}

export default Knight;