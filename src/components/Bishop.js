import React, { Component } from 'react';

class Bishop extends Component {

    render() {
        const { user, fallen } = this.props;
        return (
            <p className={['piece', this.props.fallen && 'fallen-piece'].join(' ')}>
                {user.color === "black"
                    ? String.fromCharCode(9821)
                    : String.fromCharCode(9815)}
            </p>
        )
    }
}

export default Bishop;

