import React, { Component } from 'react';

class Queen extends Component {

    render() {
        const { user } = this.props;
        return (
            user.color === "black" 
                ? <p className="piece black">{String.fromCharCode(9819)}</p>
                : <p className="piece white">{String.fromCharCode(9813)}</p>
        )
    }
}

export default Queen;