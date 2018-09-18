import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Constants
import { isLight } from '../constants/constants';
import { selectPiece } from '../actions/actions';

// Components
import King from './King';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';


 class Box extends Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.moveTo = this.moveTo.bind(this);
  }

  handleSelect() {
    // if the square has a piece in it
    const { piece, selectPiece } = this.props;
    if (piece.name !== "empty") {
      // dispatch an action with the piece
      selectPiece(piece);
    }
  };

  moveTo() {
    // if a piece is selected
    // click another square to replace its contents with the selected one
  };

  render() {

    const { piece, place } = this.props;

    return (
      <div className="box"
        onClick={this.handleSelect}
        style={isLight(place)
            ? {background: '#eaeaea'} 
            : {background: '#6b906b'}}
      >
        {piece.name === "king" && piece.team === "computer" && <King user={"black"} />}
        {piece.name === "king" && piece.team === "player" && <King user={"white"} />} 
        {piece.name === "queen" && piece.team === "computer" && <Queen user={"black"} />} 
        {piece.name === "queen" && piece.team === "player" && <Queen user={"white"} />} 
        {piece.name === "rook" && piece.team === "computer" && <Rook user={"black"} />} 
        {piece.name === "rook" && piece.team === "player" && <Rook user={"white"} />} 
        {piece.name === "bishop" && piece.team === "computer" && <Bishop user={"black"} />} 
        {piece.name === "bishop" && piece.team === "player" && <Bishop user={"white"} />} 
        {piece.name === "knight" && piece.team === "computer" && <Knight user={"black"} />} 
        {piece.name === "knight" && piece.team === "player" && <Knight user={"white"} />} 
        {piece.name === "pawn" && piece.team === "computer" && <Pawn user={"black"} />} 
        {piece.name === "pawn" && piece.team === "player" && <Pawn user={"white"} />} 
      </div>
    )
  }
}

Box.propTypes = {
    piece: PropTypes.object.isRequired,
    place: PropTypes.number.isRequired
};

export default connect(null, { selectPiece })(Box);