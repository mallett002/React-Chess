import React, { Component } from 'react';

class King extends Component {

    render() {
        const { user } = this.props;
        return (
            user.color === "black" 
                ? <p className="piece black">{String.fromCharCode(9818)}</p>
                : <p className="piece white">{String.fromCharCode(9812)}</p>
        )
    }
}

export default King;
