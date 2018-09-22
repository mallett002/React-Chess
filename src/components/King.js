import React, { Component } from 'react';

class King extends Component {

    render() {
        const { user, fallen } = this.props;
        return (
            <p className={['piece', this.props.fallen && 'fallen-piece'].join(' ')}>
                {user.color === "black"
                    ? String.fromCharCode(9818)
                    : String.fromCharCode(9812)}
            </p>
        )
    }
}

export default King;
