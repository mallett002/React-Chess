import React, { Component } from 'react';

class Pawn extends Component {

    render() {
        const { user, fallen } = this.props;
        return (
            <p className={['piece', this.props.fallen && 'fallen-piece'].join(' ')}>
                {user.color === "black"
                    ? String.fromCharCode(9823)
                    : String.fromCharCode(9817)}
            </p>
        )
    }
}

export default Pawn;