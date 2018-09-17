import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Constants
import { isLight } from '../constants/constants';

// Components
import King from './King';
import Queen from './Queen';
import Rook from './Rook';
import Bishop from './Bishop';
import Knight from './Knight';
import Pawn from './Pawn';


export default class Box extends Component {

  render() {

    const { piece, place } = this.props;

    return (
      <div className="box"
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
