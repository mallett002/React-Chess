import React, { Component } from 'react';

class Bishop extends Component {

    render() {
        const { user } = this.props;
        return (
            user === "black" 
                ? <p className="piece black">{String.fromCharCode(9821)}</p>
                : <p className="piece white">{String.fromCharCode(9815)}</p>
        )
    }
}

export default Bishop;