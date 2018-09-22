import React, { Component } from 'react';

class Rook extends Component {

    render() {
        const { user, fallen } = this.props;
        return (
            <p className={['piece', this.props.fallen && 'fallen-piece'].join(' ')}>
                {user.color === "black"
                    ? String.fromCharCode(9820)
                    : String.fromCharCode(9814)}
            </p>
        )
    }
}

export default Rook;

