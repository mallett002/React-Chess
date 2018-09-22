import React, { Component } from 'react';

class Queen extends Component {
    render() {
        const { user, fallen } = this.props;
        return (
            <p className={['piece', this.props.fallen && 'fallen-piece'].join(' ')}>
                {user.color === "black"
                    ? String.fromCharCode(9819)
                    : String.fromCharCode(9813)}
            </p>
        )
    }
}

export default Queen;

// kings:
