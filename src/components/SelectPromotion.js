import React, { Component } from 'react';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';

class SelectPromotion extends Component {
    promotePiece(piece, user) {
        console.log(`Promote pawn to ${piece} for ${user.color}`);
    }

    render() {
        const { promoteAt, canPromotePawn, user } = this.props;
        return (
            <div className='select-promotion'>
                <div className='piece-selection'>
                    <h2 className="promotion-title">Select A Piece</h2>
                    <div className="select-container">
                        <div className="promotion-piece" onClick={() => this.promotePiece("queen", user)}><Queen user={user} /></div>
                        <div className="promotion-piece" onClick={() => this.promotePiece("rook", user)}><Rook user={user} /></div>
                        <div className="promotion-piece" onClick={() => this.promotePiece("bishop", user)}><Bishop user={user} /></div>
                        <div className="promotion-piece" onClick={() => this.promotePiece("knight", user)}><Knight user={user} /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectPromotion;
