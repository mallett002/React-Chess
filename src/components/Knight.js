import React, { Component } from 'react';

class Knight extends Component {

    render() {
        const { user, fallen } = this.props;
        return (
            <p className={['piece', this.props.fallen && 'fallen-piece'].join(' ')}>
                {user.color === "black"
                    ? String.fromCharCode(9822)
                    : String.fromCharCode(9816)}
            </p>
        )
    }
}

export default Knight;

