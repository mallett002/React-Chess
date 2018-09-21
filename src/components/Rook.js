import React, { Component } from 'react';

class Rook extends Component {

    render() {
        const { user } = this.props;
        return (
            user.color === "black" 
                ? <p className="piece black">{String.fromCharCode(9820)}</p>
                : <p className="piece white">{String.fromCharCode(9814)}</p>
        )
    }
}

export default Rook;