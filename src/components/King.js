import React, { Component } from 'react';

class King extends Component {

    render() {
        const { user } = this.props;
        return (
            user === "black" 
                ? <p className="king black">{String.fromCharCode(9818)}</p>
                : <p className="king white">{String.fromCharCode(9812)}</p>
        )
    }
}

export default King;
