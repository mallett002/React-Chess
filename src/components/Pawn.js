import React, { Component } from 'react';

class Pawn extends Component {

    render() {
        const { user } = this.props;
        return (
            user === "black" 
                ? <p className="piece black">{String.fromCharCode(9823)}</p>
                : <p className="piece white">{String.fromCharCode(9817)}</p>
        )
    }
}

export default Pawn;